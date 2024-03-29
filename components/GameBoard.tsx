"use client";

import { PUZZLE_ROW_LENGTH } from "@/config/consts";
import usePuzzle from "@/hooks/usePuzzle";
import GameSquare from "@/components/GameSquare";
import GameSquareSkeleton from "@/components/GameSquare.Skeleton";

export default function GameBoard() {
  const {
    shuffledPuzzle,
    validatePuzzleAnswers,
    guessedPuzzles,
    selectedItems,
    addToSelectedItems,
    resetSelections,
    showToast,
  } = usePuzzle();

  return (
    <div>
      <h2 className="text-2xl font-bold">Connections</h2>
      <div className="mt-4 grid grid-cols-4 gap-4 rounded bg-gray-700 p-4">
        {guessedPuzzles.map((puzzle) =>
          Object.values(puzzle).map((item) => (
            <GameSquare
              key={item}
              value={item}
              isGuessed
              addToSelectedItems={addToSelectedItems}
            />
          )),
        )}
        {shuffledPuzzle.length > 0
          ? shuffledPuzzle.map((item) => (
              <GameSquare
                key={item}
                value={item}
                isSelected={selectedItems.includes(item)}
                addToSelectedItems={addToSelectedItems}
              />
            ))
          : Array.from({ length: 4 * 4 }).map((_, i) => (
              <GameSquareSkeleton key={i} />
            ))}
      </div>
      <div className="flex justify-end gap-4 p-4">
        <button
          className="rounded bg-gray-400 px-4 py-2 hover:bg-gray-500"
          onClick={resetSelections}
        >
          Reset
        </button>
        <button className="rounded bg-gray-400 px-4 py-2 hover:bg-gray-500">
          Shuffle
        </button>
        <button
          className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-500"
          disabled={selectedItems.length !== PUZZLE_ROW_LENGTH}
          onClick={() => validatePuzzleAnswers(selectedItems)}
        >
          Submit
        </button>
      </div>
      {showToast ? (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded bg-red-800 px-4 py-2">
          Nope! Not this time.
        </div>
      ) : null}
    </div>
  );
}
