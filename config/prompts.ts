const PUZZLE_GENERATION = `Create an array that outputs a sample puzzle that follows the following rules:

Find groups of four items that share something in common.

Select four items and tap 'Submit' to check if your guess is correct.
Find the groups without making 4 mistakes!
Category Examples
- FISH: Bass, Flounder, Salmon, Trout
- FIRE ___:  Ant, Drill, Island, Opal

Categories will always be more specific than "5-LETTER-WORDS," "NAMES" or "VERBS."

Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!

I don't need the code, just output the question set. Only return it as an object with the keys mapping to the answers.`;

export default {
  PUZZLE_GENERATION,
};
