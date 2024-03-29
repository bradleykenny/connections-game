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
        "flex h-24 w-24 items-center justify-center rounded bg-gray-500 text-white",
        isSelected && "bg-blue-500 text-blue-100",
        isGuessed && "bg-green-500 text-green-100",
      )}
      key="TODO"
      onClick={() => addToSelectedItems(value)}
    >
      {value}
    </div>
  );
}
