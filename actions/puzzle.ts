"use server";

import prompts from "@/config/prompts";
import { createClient } from "@/utils/supabase/client";
import OpenAI from "openai";

export const getPuzzle = async () => {
  const supabase = createClient();

  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const { data } = await supabase
    .from("puzzles")
    .select()
    .eq("puzzle_date", today);

  //   if (data) {
  //     const puzzleData = data[0].data;
  //     return puzzleData;
  //   }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompts.PUZZLE_GENERATION }],
    model: "gpt-3.5-turbo",
  });

  console.log("com", completion.choices[0]);

  return [];
};
