"use client";

import { useRouter } from "next/navigation";

export function GameSetup() {
  const router = useRouter();

  function startGame(formData: FormData) {
    const params = new URLSearchParams({
      category: String(formData.get("category")),
      questions: String(formData.get("questions")),
      balls: String(formData.get("balls")),
    });
    router.push(`/play?${params.toString()}`);
  }

  return (
    <section
      className="pixel-card p-6 sm:p-8"
      id="setup"
    >
      <div className="mb-8">
        <p className="pixel-kicker text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
          Place your wager
        </p>
        <h2 className="pixel-heading mt-2 text-3xl font-black uppercase tracking-tight text-white">
          Set the table
        </h2>
        <p className="mt-2 text-cyan-100/70">
          Pick your game, then let lady luck set the stakes.
        </p>
      </div>

      <form action={startGame} className="grid gap-5 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold uppercase tracking-wider text-yellow-300">
          Category
          <select className="pixel-select h-12 border border-cyan-500/50 bg-slate-950 px-4 font-normal text-white outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20" name="category">
            <option>General knowledge</option>
            <option>Science</option>
            <option>History</option>
            <option>Film and TV</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold uppercase tracking-wider text-yellow-300">
          Questions
          <select className="pixel-select h-12 border border-cyan-500/50 bg-slate-950 px-4 font-normal text-white outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20" name="questions">
            <option value="10">10 questions</option>
            <option value="15">15 questions</option>
            <option value="20">20 questions</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold uppercase tracking-wider text-yellow-300">
          Plinko balls
          <select className="pixel-select h-12 border border-cyan-500/50 bg-slate-950 px-4 font-normal text-white outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20" name="balls">
            <option value="3">3 balls</option>
            <option value="5">5 balls</option>
            <option value="7">7 balls</option>
          </select>
        </label>

        <button
          className="pixel-button mt-8 w-full bg-pink-500 px-6 py-4 font-bold uppercase text-white transition hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-400/30 sm:col-span-3"
          type="submit"
        >
          Deal me in
        </button>
      </form>
      <p className="mt-3 text-center text-xs uppercase tracking-wider text-cyan-100/50">
        Selected questions · No ante required
      </p>
    </section>
  );
}
