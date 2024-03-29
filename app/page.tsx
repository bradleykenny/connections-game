import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 flex w-full items-center justify-center font-mono text-sm">
        <GameBoard />
      </div>
    </main>
  );
}
