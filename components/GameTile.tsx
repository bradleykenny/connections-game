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
        "bg-primary-500 hover:bg-primary-600 hover:ring-primary-400 flex aspect-square cursor-pointer items-center justify-center rounded text-white hover:ring-2 sm:h-24 sm:w-24",
        isSelected &&
          "bg-blue-500 text-blue-100 hover:bg-blue-600 hover:ring-blue-400",
        isGuessed &&
          "bg-green-500 text-green-100 hover:bg-green-600 hover:ring-green-400",
      )}
      key="TODO"
      onClick={() => addToSelectedItems(value)}
    >
      {value}
    </div>
  );
}
