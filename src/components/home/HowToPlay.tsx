const steps = [
  {
    number: "01",
    title: "Pick your path",
    description: "Choose a category, question count, and number of balls.",
  },
  {
    number: "02",
    title: "Drop the balls",
    description: "The board sends each ball toward a mystery difficulty zone.",
  },
  {
    number: "03",
    title: "Take the quiz",
    description: "Answer your questions and chase the highest score.",
  },
];

export function HowToPlay() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mb-10 max-w-xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-600">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Skill meets chance.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-6"
            key={step.number}
          >
            <p className="text-sm font-black text-cyan-600">{step.number}</p>
            <h3 className="mt-8 text-xl font-black text-slate-950">
              {step.title}
            </h3>
            <p className="mt-2 leading-7 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
