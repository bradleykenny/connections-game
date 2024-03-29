"use server";

import { COLLECTION_NAME } from "@/config/consts";
import prompts from "@/config/prompts";
import { createClient } from "@/utils/supabase/client";
import OpenAI from "openai";

export const getPuzzle = async () => {
  const supabase = createClient();

  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const { data } = await supabase
    .from(COLLECTION_NAME)
    .select()
    .eq("puzzle_date", today);

  if (data && data[0]?.data) {
    const puzzleData = data[0].data;
    return puzzleData;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompts.PUZZLE_GENERATION }],
    model: "gpt-3.5-turbo",
  });

  const generatedPuzzle = completion.choices[0].message.content;
  if (generatedPuzzle) {
    const parsedPuzzle = JSON.parse(generatedPuzzle);
    const { error } = await supabase.from(COLLECTION_NAME).insert({
      puzzle_date: today,
      data: parsedPuzzle,
    });

    if (!error) {
      return parsedPuzzle;
    }
  }

  return [];
};