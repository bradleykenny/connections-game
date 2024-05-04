"use server";

import { COLLECTION_NAME } from "@/config/consts";
import prompts from "@/config/prompts";
import { getLocaleDate, getTodayDate } from "@/utils/date";
import { createClient } from "@/utils/supabase/client";
import OpenAI from "openai";

const getAiGeneratedPuzzle = async () => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      messages: [prompts.PUZZLE_GENERATION_THREE],
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(completion.choices);

    return completion.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
};

export const getPuzzle = async (timezone?: string) => {
  if (process.env.ALWAYS_USE_GENERATED) {
    const alwaysUseGeneratedPuzzle = await getAiGeneratedPuzzle();

    if (alwaysUseGeneratedPuzzle) {
      return JSON.parse(alwaysUseGeneratedPuzzle);
    }
  }

  const today = getTodayDate(timezone);

  const supabase = createClient();
  const { data } = await supabase
    .from(COLLECTION_NAME)
    .select()
    .eq("puzzle_date", today);

  if (data && data[0]?.data) {
    const puzzleData = data[0].data;
    return puzzleData;
  }

  const generatedPuzzle = await getAiGeneratedPuzzle();

  if (generatedPuzzle) {
    const parsedPuzzle = JSON.parse(generatedPuzzle);
    const { error } = await supabase.from(COLLECTION_NAME).insert({
      puzzle_date: today,
      data: parsedPuzzle,
    });

    if (!error) {
      return parsedPuzzle;
    } else {
      console.error(error);
    }
  }

  return [];
};
