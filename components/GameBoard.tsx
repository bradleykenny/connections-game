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
    guesses,
  } = usePuzzle();

  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Connections</h2>
        {Array.from({ length: guesses }).map((_, i) => (
          <div key={i} className="h-4 w-4 rounded-full bg-white" />
        ))}
      </div>
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
          className="rounded bg-gray-400 px-4 py-2 hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-400"
          onClick={resetSelections}
          disabled={selectedItems.length === 0}
        >
          Reset
        </button>
        <button
          className="rounded bg-gray-400 px-4 py-2 hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-400"
          disabled
        >
          Shuffle
        </button>
        <button
          className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-400"
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
