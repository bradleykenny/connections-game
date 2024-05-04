"use client";

import { MAX_NUMBER_OF_GUESSES, PUZZLE_ROW_LENGTH } from "@/config/consts";
import usePuzzle from "@/hooks/usePuzzle";
import GameSquare from "@/components/GameSquare";
import GameSquareSkeleton from "@/components/GameSquare.Skeleton";
import GameTile from "@/components/GameTile";
import { cn } from "@/utils/css";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

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

  const date = DateTime.now();
  const today = date.toFormat("DDD");

  const couldBeDoneLoading =
    shuffledPuzzle.length > 0 || guessedPuzzles.length === PUZZLE_ROW_LENGTH;

  return (
    <div className="p-2">
      <h2 className="mb-1 text-xl font-bold">
        Kennections <span className="text-gray-400">({today})</span>
      </h2>
      <p>Create four groups of four!</p>
      <div
        className={cn(
          "mt-4 grid grid-cols-4 gap-2 rounded bg-primary-100 p-2  sm:gap-4 sm:p-4",
          guessedPuzzles.length === 4 && "bg-success-100 ring-success-400",
        )}
      >
        {guessedPuzzles.map((puzzle) => {
          const key = Object.keys(puzzle)[0];
          return (
            <GameTile key={key} values={puzzle[key]} title={key} isGuessed />
          );
        })}
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
      <div className="mb-2 ml-4 mt-6 flex items-center gap-4">
        Attempts remaining:{" "}
        {Array.from({ length: guesses }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-primary-400 ring-2 ring-primary-400"
          />
        ))}
        {Array.from({ length: MAX_NUMBER_OF_GUESSES - guesses }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full ring-2 ring-primary-400"
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 p-4">
        <button
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 ring-2 ring-gray-300 hover:bg-gray-300 hover:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:ring-gray-300"
          onClick={resetSelections}
          disabled={selectedItems.length === 0}
        >
          Reset
        </button>
        <button
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 ring-2 ring-gray-300 hover:bg-gray-300 hover:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:ring-gray-300"
          disabled
        >
          Shuffle
        </button>
        <button
          className="rounded bg-secondary-200 px-4 py-2 text-blue-900 ring-2 ring-blue-300 hover:bg-secondary-300 hover:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-secondary-200 disabled:hover:ring-blue-300"
          disabled={selectedItems.length !== PUZZLE_ROW_LENGTH}
          onClick={() => validatePuzzleAnswers(selectedItems)}
        >
          Submit
        </button>
      </div>
      {showToast ? (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded bg-red-200 px-4 py-2 text-red-800">
          <FontAwesomeIcon icon={faWarning} className="mr-2" />
          Nope! Not this time.
        </div>
      ) : null}
    </div>
  );
}
