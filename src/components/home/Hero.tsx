export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 px-6 py-12 text-white shadow-2xl shadow-cyan-950/20 sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
          Trivia with a twist
        </p>
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          Drop in.
          <br />
          <span className="text-cyan-300">Think big.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Plinko Trivia turns every question into a surprise. Drop your balls,
          discover your difficulty, and prove what you know.
        </p>
        <a
          className="mt-8 inline-flex items-center rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/40"
          href="#setup"
        >
          Set up a round
          <span aria-hidden="true" className="ml-3 text-lg">
            →
          </span>
        </a>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 hidden h-56 w-48 rounded-t-[5rem] border-x-2 border-t-2 border-cyan-300/30 p-6 sm:block"
      >
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 16 }, (_, index) => (
            <span
              className="h-2 w-2 rounded-full bg-cyan-200/80 shadow-[0_0_12px] shadow-cyan-300"
              key={index}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-around text-xs font-bold text-slate-400">
          <span>Easy</span>
          <span>Hard</span>
        </div>
      </div>
    </section>
  );
}
