import { cn } from "@/utils/css";

interface Props {
  isSelected?: boolean;
  isGuessed?: boolean;
  value: string;
  addToSelectedItems?: (value: string) => void;
}

export default function GameSquare(props: Props) {
  const { isSelected, isGuessed, value, addToSelectedItems } = props;

  return (
    <div
      className={cn(
        "bg-primary-200 ring-primary-300 text-primary-900 hover:bg-primary-300 hover:ring-primary-400 flex aspect-square cursor-pointer items-center justify-center rounded bg-gradient-to-br text-center ring-2 sm:h-24 sm:w-24",
        isSelected &&
          "bg-secondary-200 ring-secondary-300 text-secondary-900 hover:bg-secondary-300 hover:ring-secondary-400",
        isGuessed &&
          "bg-success-200 ring-success-300 text-success-900 hover:bg-success-300 hover:ring-success-400 cursor-not-allowed",
      )}
      key="TODO"
      onClick={() => addToSelectedItems?.(value)}
    >
      {value}
    </div>
  );
}
