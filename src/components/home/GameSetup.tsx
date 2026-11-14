export function GameSetup() {
  return (
    <section
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
      id="setup"
    >
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-600">
          Your next round
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Build your challenge
        </h2>
        <p className="mt-2 text-slate-600">
          Choose your category and let the board set the stakes.
        </p>
      </div>

      <form className="grid gap-5 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Category
          <select className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10">
            <option>General knowledge</option>
            <option>Science</option>
            <option>History</option>
            <option>Film and TV</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Questions
          <select className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10">
            <option>10 questions</option>
            <option>15 questions</option>
            <option>20 questions</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Plinko balls
          <select className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10">
            <option>3 balls</option>
            <option>5 balls</option>
            <option>7 balls</option>
          </select>
        </label>
      </form>

      <button
        className="mt-8 w-full rounded-xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/20"
        type="button"
      >
        Start game
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        Gameplay is coming next. Your setup will be ready when it arrives.
      </p>
    </section>
  );
}
