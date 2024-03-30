import { cn } from "@/utils/css";

interface Props {
  isSelected?: boolean;
  isGuessed?: boolean;
  value: string;
  addToSelectedItems: (value: string) => void;
}

export default function GameSquare(props: Props) {
  const { isSelected, isGuessed, value, addToSelectedItems } = props;

  return (
    <div
      className={cn(
        "bg-primary-300 text-primary-900 hover:bg-primary-400 hover:ring-primary-200 flex aspect-square cursor-pointer items-center justify-center rounded bg-gradient-to-br text-center hover:ring-2 sm:h-24 sm:w-24",
        isSelected &&
          "bg-secondary-500 text-secondary-100 hover:bg-secondary-600 hover:ring-secondary-400",
        isGuessed &&
          "bg-success-500 text-success-100 hover:bg-success-600 hover:ring-success-400",
      )}
      key="TODO"
      onClick={() => addToSelectedItems(value)}
    >
      {value}
    </div>
  );
}
