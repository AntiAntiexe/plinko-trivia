const steps = [
  {
    number: "01",
    title: "Choose your game",
    description: "Pick a category, question count, and number of balls.",
  },
  {
    number: "02",
    title: "Roll the board",
    description: "The board sends each ball toward a mystery difficulty zone.",
  },
  {
    number: "03",
    title: "Win the pot",
    description: "Answer your questions and chase the highest score.",
  },
];

export function HowToPlay() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mb-10 max-w-xl">
        <p className="pixel-kicker text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
          House rules
        </p>
        <h2 className="pixel-heading mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
          Skill meets chance
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article
            className="pixel-card pixel-rule-card p-6"
            key={step.number}
          >
            <p className="text-sm font-black text-cyan-300">{step.number}</p>
            <h3 className="mt-8 text-xl font-black uppercase text-white">
              {step.title}
            </h3>
            <p className="mt-2 leading-7 text-cyan-100/60">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
