"use client";

import { PUZZLE_ROW_LENGTH } from "@/config/consts";
import usePuzzle from "@/hooks/usePuzzle";
import GameSquare from "@/components/GameSquare";
import GameSquareSkeleton from "@/components/GameSquare.Skeleton";
import GameTile from "@/components/GameTile";

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

  const date = new Date();
  const today = date.toLocaleDateString();

  const couldBeDoneLoading =
    shuffledPuzzle.length > 0 || guessedPuzzles.length === PUZZLE_ROW_LENGTH;

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Kennections <span className="text-gray-600">({today})</span>
      </h2>
      <div className="bg-primary-100 ring-primary-400 mt-4 grid grid-cols-4 gap-2 rounded p-2 ring-2 sm:gap-4 sm:p-4">
        {guessedPuzzles.map((puzzle) =>
          Object.values(puzzle).map((item) => (
            <GameTile
              key={item}
              value={item}
              isGuessed
              addToSelectedItems={addToSelectedItems}
            />
          )),
        )}
        {couldBeDoneLoading
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
      <div className="ml-4 mt-4 flex items-center gap-4">
        Attempts:{" "}
        {Array.from({ length: guesses }).map((_, i) => (
          <div key={i} className="bg-primary-800 h-4 w-4 rounded-full" />
        ))}
      </div>
      <div className="flex justify-center gap-4 p-4">
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
          className="bg-secondary-400 hover:bg-secondary-500 disabled:hover:bg-secondary-400 rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
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
