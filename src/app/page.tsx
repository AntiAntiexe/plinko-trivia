import { GameSetup } from "@/components/home/GameSetup";
import { Hero } from "@/components/home/Hero";
import { HowToPlay } from "@/components/home/HowToPlay";

export default function Home() {
  return (
    <main className="pixel-shell min-h-full px-4 py-4 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="pixel-header mb-5 flex items-center justify-between px-3 py-2">
          <p className="pixel-brand text-lg font-black tracking-[0.18em] text-white">
            PLINKO<span className="text-pink-400">★</span>TRIVIA
          </p>
          <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 sm:block">
            The house of hard questions
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
