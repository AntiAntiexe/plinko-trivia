export function Hero() {
  return (
    <section className="pixel-panel relative overflow-hidden px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
      <div className="pixel-stars absolute inset-0 opacity-70" />
      <div className="relative z-10 max-w-2xl">
        <p className="pixel-kicker mb-5 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
          ★ Welcome to the lucky draw ★
        </p>
        <h1 className="pixel-title text-5xl font-black uppercase tracking-tight sm:text-7xl">
          Plinko
          <br />
          <span className="text-pink-400">Trivia</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-cyan-100 sm:text-lg">
          Place your bets, drop your balls, and let the board deal your
          difficulty. Every question is a chance to hit the jackpot.
        </p>
        <a
          className="pixel-button mt-8 inline-flex items-center bg-cyan-300 px-6 py-3 font-bold uppercase text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/40"
          href="#setup"
        >
          Enter the casino
          <span aria-hidden="true" className="ml-3 text-lg">
            ▼
          </span>
        </a>
      </div>

      <div
        aria-hidden="true"
        className="pixel-board absolute bottom-7 right-8 hidden h-60 w-52 p-6 sm:block"
      >
        <div className="grid grid-cols-5 gap-x-5 gap-y-4">
          {Array.from({ length: 16 }, (_, index) => (
            <span
              className="pixel-peg h-2 w-2 bg-cyan-200"
              key={index}
            />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-1 text-center text-[9px] font-bold uppercase text-slate-300">
          <span className="bg-emerald-500/60 py-1">Easy</span>
          <span className="bg-yellow-500/60 py-1">Rare</span>
          <span className="bg-pink-500/60 py-1">Hard</span>
        </div>
      </div>
    </section>
  );
}
