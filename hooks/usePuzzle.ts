import { getPuzzle } from "@/actions/puzzle";
import { PUZZLE_ROW_LENGTH } from "@/config/consts";
import { useEffect, useMemo, useState } from "react";

interface PuzzleMap {
  [key: string]: string[];
}

const usePuzzle = () => {
  const [puzzle, setPuzzle] = useState<PuzzleMap>({});
  const [guessedKeys, setGuessedKeys] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [guesses, setGuesses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const puzzleData = await getPuzzle();
      setPuzzle(puzzleData);
    };

    fetchData();
  }, []);

  const addToSelectedItems = (value: string) => {
    if (selectedItems.includes(value)) {
      const filteredItems = selectedItems.filter((item) => item !== value);
      setSelectedItems(filteredItems);
      return;
    }

    if (selectedItems.length >= PUZZLE_ROW_LENGTH) {
      return;
    }

    const newSelectedItems = [value, ...selectedItems];
    setSelectedItems(newSelectedItems);
  };

  const resetSelections = () => {
    setSelectedItems([]);
  };

  const puzzleKeys = Object.keys(puzzle);

  const validatePuzzleAnswers = (attempt: string[]) => {
    if (attempt.length !== PUZZLE_ROW_LENGTH) {
      return false;
    }

    const isValid = puzzleKeys.some((key) => {
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

    if (!isValid) {
      setGuesses(guesses + 1);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }

    return isValid;
  };

  const flattenedPuzzle = puzzleKeys
    .filter((key) => !guessedKeys.includes(key))
    .flatMap((key) => puzzle[key]);

  const guessedPuzzles = guessedKeys.map((key) => ({ [key]: puzzle[key] }));

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledPuzzle: string[] = useMemo(
    () => shuffle(flattenedPuzzle),
    [puzzle, guessedKeys],
  );

  return {
    shuffledPuzzle,
    guessedPuzzles,
    validatePuzzleAnswers,
    selectedItems,
    addToSelectedItems,
    resetSelections,
    showToast,
    guesses,
  };
};

export default usePuzzle;
