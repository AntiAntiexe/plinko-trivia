"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Runner,
  World,
} from "matter-js";

type Ball = {
  id: number;
  questionCount: number;
  delay: number;
};

type BallPosition = {
  x: number;
  y: number;
  settled: boolean;
};

const landingZones = [
  { label: "Easy", color: "bg-emerald-500" },
  { label: "Easy +", color: "bg-lime-400" },
  { label: "Medium", color: "bg-yellow-400" },
  { label: "Hard", color: "bg-pink-500" },
  { label: "Medium", color: "bg-yellow-400" },
  { label: "Easy +", color: "bg-lime-400" },
  { label: "Easy", color: "bg-emerald-500" },
];

function randomBetween(min: number, max: number) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  const normalized = values[0] / (0xffffffff + 1);
  return min + normalized * (max - min);
}

type PlinkoRoundProps = {
  ballCount: number;
  questionCount: number;
  round: number;
  onReplay: () => void;
};

function PlinkoRound({
  ballCount,
  questionCount,
  round,
  onReplay,
}: PlinkoRoundProps) {
  const [landed, setLanded] = useState<number[]>([]);
  const [positions, setPositions] = useState<Record<number, BallPosition>>({});
  const [results, setResults] = useState<Record<number, string>>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const balls = useMemo(() => {
    const baseQuestionCount = Math.floor(questionCount / ballCount);
    const extraQuestions = questionCount % ballCount;
    return Array.from({ length: ballCount }, (_, index) => ({
      id: index + 1,
      questionCount: baseQuestionCount + (index < extraQuestions ? 1 : 0),
      delay: index * 0.8,
    }));
  }, [ballCount, questionCount]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const engine = Engine.create({
      gravity: { x: 0, y: 0.72, scale: 0.001 },
    });
    const ballBodies = new Map<number, Body>();
    const pegRows = [36, 76, 116, 156, 196, 236, 276, 316, 356, 396, 436, 476];
    const pegGap = width >= 640 ? 52 : 26;
    const pegs = pegRows.flatMap((y, row) => {
      const count = row + 1;
      const start = width / 2 - ((count - 1) * pegGap) / 2;
      return Array.from({ length: count }, (_, index) =>
        Bodies.circle(start + index * pegGap, y, 5, {
          isStatic: true,
          restitution: 0.62,
          friction: 0.03,
          label: "peg",
        }),
      );
    });
    const walls = [
      Bodies.rectangle(-3, height / 2, 6, height, {
        isStatic: true,
        restitution: 0.65,
        label: "teal-border",
      }),
      Bodies.rectangle(width + 3, height / 2, 6, height, {
        isStatic: true,
        restitution: 0.65,
        label: "teal-border",
      }),
    ];
    const basketFloor = Bodies.rectangle(width / 2, height - 10, width, 20, {
      isStatic: true,
      restitution: 0.2,
      friction: 0.8,
      label: "basket-floor",
    });
    const separators = Array.from({ length: 8 }, (_, index) =>
      Bodies.rectangle((width / 7) * index, height - 42, 4, 84, {
        isStatic: true,
        restitution: 0.2,
        friction: 0.8,
        label: "separator",
      }),
    );

    Composite.add(engine.world, [...pegs, ...walls, basketFloor, ...separators]);
    const dropTimers = balls.map((ball) => {
      const body = Bodies.circle(
        width / 2 + randomBetween(-8, 8),
        24 + randomBetween(-2, 2),
        8,
        {
          restitution: randomBetween(0.5, 0.7),
          friction: randomBetween(0.06, 0.12),
          frictionAir: randomBetween(0.008, 0.014),
          label: `ball-${ball.id}`,
        },
      );
      Body.setVelocity(body, {
        x: (ball.id - 2) * randomBetween(1.1, 1.8) + randomBetween(-0.35, 0.35),
        y: randomBetween(-0.2, 0.2),
      });
      ballBodies.set(ball.id, body);
      return window.setTimeout(
        () => World.add(engine.world, body),
        Math.max(0, ball.delay + randomBetween(-0.12, 0.12)) * 1000,
      );
    });

    const updatePositions = () => {
      const snapshot: Record<number, BallPosition> = {};
      ballBodies.forEach((body, id) => {
        const settled = body.position.y >= height - 28;
        snapshot[id] = { x: body.position.x, y: body.position.y, settled };
        if (settled) {
          const zoneIndex = Math.max(
            0,
            Math.min(landingZones.length - 1, Math.floor((body.position.x / width) * 7)),
          );
          setLanded((current) => (current.includes(id) ? current : [...current, id]));
          setResults((current) => ({
            ...current,
            [id]: landingZones[zoneIndex].label,
          }));
        }
      });
      setPositions(snapshot);
    };

    const runner = Runner.create();
    const afterUpdate = () => updatePositions();
    Events.on(engine, "afterUpdate", afterUpdate);
    Runner.run(runner, engine);

    return () => {
      dropTimers.forEach(window.clearTimeout);
      Events.off(engine, "afterUpdate", afterUpdate);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [balls, round]);

  return (
    <section className="pixel-card p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="pixel-kicker text-xs font-bold uppercase tracking-[0.25em] text-pink-500">
            Live table
          </p>
          <h2 className="pixel-heading mt-2 text-2xl font-black uppercase text-white sm:text-3xl">
            Drop the questions
          </h2>
        </div>
        <p className="text-xs uppercase tracking-widest text-cyan-100/60">
          Round {round + 1} · {landed.length}/{ballCount} balls landed
        </p>
      </div>

      <div
        className="plinko-stage relative mx-auto h-[40rem] max-w-3xl overflow-hidden bg-slate-950/80 sm:h-[44rem]"
        ref={stageRef}
      >
        <div className="absolute inset-x-0 top-8">
          <div className="grid gap-y-10 sm:gap-y-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((pegCount, row) => (
              <div className="flex justify-center gap-6 sm:gap-12" key={row}>
                {Array.from({ length: pegCount }, (_, index) => (
                  <span className="pixel-peg h-2 w-2 bg-cyan-200/80" key={index} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {balls.map((ball) => (
          <span
            aria-label={`Ball ${ball.id} carrying ${ball.questionCount} questions`}
            className="plinko-ball absolute top-7 h-4 w-4 bg-cyan-300"
            key={`${round}-${ball.id}`}
            role="img"
            style={
              {
                left: positions[ball.id]?.x ?? "50%",
                top: positions[ball.id]?.y ?? 28,
              } as CSSProperties
            }
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 grid h-20 grid-cols-7 gap-px bg-cyan-500/60 p-px">
          {landingZones.map((zone, index) => (
            <div
              className="flex flex-col items-center justify-center bg-slate-950/95"
              key={`${zone.label}-${index}`}
            >
              <span className={`mb-2 h-2 w-7 ${zone.color}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                {zone.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-xs leading-5 text-cyan-100/60">
          Each ball carries a batch of questions. Its landing zone sets that
          batch&apos;s difficulty.
        </p>
        <button
          className="pixel-button shrink-0 bg-cyan-300 px-4 py-2 text-xs font-bold uppercase text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/30"
          onClick={onReplay}
          type="button"
        >
          Replay
        </button>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {balls.map((ball) => (
          <div className="border border-cyan-500/30 bg-slate-950/60 p-3" key={ball.id}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Ball {ball.id} · {ball.questionCount} questions
            </p>
            <p className="mt-1 text-xs uppercase text-white/70">
              {results[ball.id] ? (
                <>
                  Lands in the{" "}
                  <span className="text-yellow-300">{results[ball.id]}</span> zone
                </>
              ) : (
                "Rolling..."
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PlinkoBoard({
  ballCount,
  questionCount,
}: PlinkoBoardProps) {
  const [round, setRound] = useState(0);

  return (
    <PlinkoRound
      key={round}
      onReplay={() => setRound((current) => current + 1)}
      ballCount={ballCount}
      questionCount={questionCount}
      round={round}
    />
  );
}
