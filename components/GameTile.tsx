import { cn } from "@/utils/css";

interface Props {
  isGuessed?: boolean;
  title: string;
  values: string[];
}

export default function GameSquare(props: Props) {
  const { isGuessed, title, values } = props;

  const value = values.join(", ");

  return (
    <div
      className={cn(
        "bg-primary-200 ring-primary-300 text-primary-900 hover:bg-primary-300 hover:ring-primary-400 col-span-4 flex h-24 cursor-pointer flex-col items-center justify-center rounded bg-gradient-to-br text-center ring-2 sm:min-w-[27rem]",
        isGuessed &&
          "bg-success-200 ring-success-300 text-success-900 hover:bg-success-300 hover:ring-success-400 cursor-not-allowed",
      )}
    >
      <h2 className="font-bold">{title}</h2>
      <p className="text-success-700 text-wrap">{value}</p>
    </div>
  );
}
