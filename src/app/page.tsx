import { GameSetup } from "@/components/home/GameSetup";
import { Hero } from "@/components/home/Hero";
import { HowToPlay } from "@/components/home/HowToPlay";

export default function Home() {
  return (
    <main className="min-h-full bg-slate-50 px-5 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 flex items-center justify-between px-1">
          <p className="text-lg font-black tracking-tight text-slate-950">
            PLINKO<span className="text-cyan-600">/</span>TRIVIA
          </p>
          <p className="hidden text-sm font-medium text-slate-500 sm:block">
            A new way to play what you know
          </p>
        </header>
        <Hero />
        <div className="mx-auto mt-6 max-w-4xl">
          <GameSetup />
        </div>
        <HowToPlay />
      </div>
    </main>
  );
}
