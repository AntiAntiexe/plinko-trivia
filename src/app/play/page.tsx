import Link from "next/link";

import { PlinkoBoard } from "@/components/game/PlinkoBoard";

type PlayPageProps = {
  searchParams: Promise<{
    balls?: string;
    category?: string;
    questions?: string;
  }>;
};

export default async function PlayPage({ searchParams }: PlayPageProps) {
  const params = await searchParams;
  const ballCount = [3, 5, 7].includes(Number(params.balls))
    ? Number(params.balls)
    : 3;
  const questionCount = [10, 15, 20].includes(Number(params.questions))
    ? Number(params.questions)
    : 10;
  const category = params.category || "General knowledge";
  const baseQuestions = Math.floor(questionCount / ballCount);
  const remainder = questionCount % ballCount;
  const split = Array.from({ length: ballCount }, (_, index) =>
    baseQuestions + (index < remainder ? 1 : 0),
  ).join(" · ");

  return (
    <main className="pixel-shell min-h-full px-4 py-4 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="pixel-header mb-5 flex items-center justify-between px-3 py-2">
          <Link className="pixel-brand text-lg font-black tracking-[0.18em] text-white" href="/">
            PLINKO<span className="text-pink-400">★</span>TRIVIA
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
            {category}
          </p>
        </header>

        <div className="mb-6 text-center">
          <p className="pixel-kicker text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            The house is dealing
          </p>
          <h1 className="pixel-title mt-3 text-4xl font-black uppercase text-white sm:text-6xl">
            Your fate is falling
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-cyan-100/70">
            {questionCount} questions split across {ballCount} balls: {split}.
            Outer lanes
            deal easier questions. The center lane deals the hard ones.
          </p>
        </div>

        <PlinkoBoard ballCount={ballCount} questionCount={questionCount} />

        <div className="mt-6 flex justify-center">
          <Link
            className="text-xs font-bold uppercase tracking-widest text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 hover:text-white"
            href="/#setup"
          >
            Leave the table
          </Link>
        </div>
      </div>
    </main>
  );
}
