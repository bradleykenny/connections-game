import { PUZZLE_ROW_LENGTH } from "@/config/consts";
import { useMemo, useState } from "react";

interface PuzzleMap {
  [key: string]: string[];
}

const usePuzzle = () => {
  const [guessedKeys, setGuessedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addToSelectedItems = (value: string) => {
    if (
      selectedItems.length >= PUZZLE_ROW_LENGTH ||
      selectedItems.includes(value)
    ) {
      return;
    }

    const newSelectedItems = [value, ...selectedItems];
    setSelectedItems(newSelectedItems);
  };

  const resetSelections = () => {
    setSelectedItems([]);
  };

  // TODO: convert to AI DB call
  const puzzle: PuzzleMap = {
    "Musical Instruments": ["Piano", "Violin", "Guitar", "Trumpet"],
    "African Animals": ["Lion", "Elephant", "Giraffe", "Zebra"],
    "Geometric Shapes": ["Circle", "Square", "Triangle", "Pentagon"],
    "Movie Genres": ["Comedy", "Horror", "Romance", "Action"],
    // "Planets in the Solar System": ["Earth", "Mars", "Jupiter", "Saturn"],
  };

  const puzzleKeys = Object.keys(puzzle);

  const validatePuzzleAnswers = (attempt: string[]) => {
    if (attempt.length !== PUZZLE_ROW_LENGTH) {
      return false;
    }

    return puzzleKeys.some((key) => {
      const relatedAnswers = [];

      attempt.some((val) => {
        const column = puzzle[key];
        if (!column.includes(val)) {
          return false;
        }

        relatedAnswers.push(val);
      });

      if (relatedAnswers.length === PUZZLE_ROW_LENGTH) {
        setGuessedKeys([...guessedKeys, key]);
        setSelectedItems([]);
        return true;
      }

      return false;
    });
  };

  const flattenedPuzzle = puzzleKeys
    .filter((key) => !guessedKeys.includes(key))
    .flatMap((key) => puzzle[key]);
  const guessedPuzzles = guessedKeys.map((key) => puzzle[key]);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //   const shuffledPuzzle: string[] = shuffle(flattenedPuzzle);
  const shuffledPuzzle = flattenedPuzzle;

  return {
    shuffledPuzzle,
    guessedPuzzles,
    validatePuzzleAnswers,
    selectedItems,
    addToSelectedItems,
    resetSelections,
  };
};

export default usePuzzle;
