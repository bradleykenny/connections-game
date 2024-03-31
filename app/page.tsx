import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <main className="bg-primary-50 flex min-h-screen flex-col items-center pt-24">
      <div className="z-10 flex w-full items-center justify-center text-sm">
        <GameBoard />
      </div>
    </main>
  );
}
