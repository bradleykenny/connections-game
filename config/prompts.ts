interface OpenAIPrompt {
  role: "system";
  content: string;
}

const PUZZLE_GENERATION: OpenAIPrompt = {
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

The answers should use Australian English and exactly one group should attempt to use things related to Australia in some way. The other groups should choose a word from that list and then make a different list based on that single item. None of the words should be repeated. All strings in the array should be one word.`,
};

const PUZZLE_GENERATION_TWO: OpenAIPrompt = {
  role: "system",
  content: `
I am creating a game that requires users to correctly guess four groups of four words that are related to one another. I need your help creating the puzzles for this. 

To do this, we should create one theme and then associate four different words with it that could describe it, be related to it, or a synonym of the theme. Each of these words should use Australian English and should not shy away from using Australian themes (but does not have to).

Then, we should take one of the words and repeat that for that particular word. This will create four new words to describe that word.

Do this again two more times. 

This should result in four "keywords" that have four "words".

I don't need the code, just output the question set. Only return it as an object with the keys mapping to the answers. There should be 4 object keys. For example: { Months: [ "Summer", "Winter", "Spring", "Autumn" ]}. The JavaScript JSON.parse method should be able to read the output with no errors.
`,
};

export default {
  PUZZLE_GENERATION,
  PUZZLE_GENERATION_TWO,
};
