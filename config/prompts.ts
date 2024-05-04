import { ChatCompletionMessageParam } from "ai/prompts";

const PUZZLE_GENERATION: ChatCompletionMessageParam = {
  role: "system",
  content: `Create an array that outputs a sample puzzle that follows the following rules:

'Find groups of four items that share something in common.

Select four items and tap 'Submit' to check if your guess is correct.
Find the groups without making 4 mistakes!
Category Examples
- FISH: Bass, Flounder, Salmon, Trout
- FIRE ___:  Ant, Drill, Island, Opal

Categories will always be more specific than "5-LETTER-WORDS," "NAMES" or "VERBS."

Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!'

I don't need the code, just output the question set. Only return it as an object with the keys mapping to the answers. There should be 4 object keys. For example: { Months: [ "Summer", "Winter", "Spring", "Autumn" ]}. The JavaScript JSON.parse method should be able to read the output with no errors.

The answers should use Australian English and exactly one group should attempt to use things related to Australia in some way. The other groups should choose a word from that list and then make a different list based on that single item. 

None of the words should be repeated. All strings in the array should be one word. These categories may also involve wordplay, palindromes, or homophones to increase levels of difficulty.`,
};

const PUZZLE_ROLE: ChatCompletionMessageParam = {
  role: "system",
  content: `
You are a helpful assistant ready to help users create games.

You should be as helpful as possible and come up with creative solutions to games.
`,
};

const PUZZLE_GENERATION_TWO: ChatCompletionMessageParam = {
  role: "user",
  content: `
I am creating a game that requires users to correctly guess four groups of four words that are related to one another. I need your help creating the puzzles for this. 

To do this, we should create one theme and then associate four different words with it that could describe it, be related to it, or a synonym of the theme. Each of these words should use Australian English and should not shy away from using Australian themes BUT does not strictly have to.

We should then create 3 more groups using words that may be palindromes or homophones of previous words to increase the difficulty.

This should result in four "keywords" that have four "words" each. Do not output anymore than 4 groups. 

I don't need the code, just output the question set. Only return it as an object with the keys mapping to the answers. There should be 4 object keys. You should order these groups in perceived difficulty. For example: { Months: [ "Summer", "Winter", "Spring", "Autumn" ]}. The JavaScript JSON.parse method should be able to read the output with no errors.
`,
};

const PUZZLE_GENERATION_THREE: ChatCompletionMessageParam = {
  role: "user",
  content: `
You are now a puzzle creator a a game where users are expected to categorise words into four groups of four. Each of the words in each category should be related to one another in some way. 

To generate this puzzle, you should select a random category and then four words that are associated with it. You should then create 3 more groups using categories that may be similar or palindromes or homophones of previous words in categories to increase the difficulty. 

When selecting categories, you should be creative and try to stay away from basic themes. You can use things like current events or cultural themes.

The four categories should have increasingly more difficulty to associate the words within.

This should result in four "keywords" that have four "words" each. Do not output anymore than 4 groups. 

I don't need the code, just output the question set. Only return it as an object with the keys mapping to the answers. There should be 4 object keys. You should order these groups in perceived difficulty. For example: { Months: [ "Summer", "Winter", "Spring", "Autumn" ]}. The JavaScript JSON.parse method should be able to read the output with no errors.
`,
};

export default {
  PUZZLE_GENERATION,
  PUZZLE_GENERATION_TWO,
  PUZZLE_GENERATION_THREE,
  PUZZLE_ROLE,
};
