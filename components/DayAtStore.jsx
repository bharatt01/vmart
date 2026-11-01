"use client";

import { useEffect, useState } from "react";
import { day } from "../app/lib/data";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   Uses your existing `day` array: { time, title, text }.
   The track spaces the stops evenly, so no time parsing is needed. */

const AUTOPLAY_MS = 5000;

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5]" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DayAtStore() {
  const n = day.length;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Autoplay starts only after mount, and only if the visitor has not asked for reduced motion
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && n > 1) setPlaying(true);
  }, [n]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [playing, n]);

  if (n === 0) return null;

  // Any manual choice stops the autoplay, so the page never fights the visitor
  const go = (next) => {
    setPlaying(false);
    setI(((next % n) + n) % n);
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };

  const cur = day[i];
  const ctl =
    "grid h-12 w-12 place-items-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-[#404898] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <section className="bg-[#404898] text-white">
      <style>{`
        @keyframes das-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .das-in { animation: das-in .45s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .das-in { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            A day at Value Mart.
          </h2>
          <p className="max-w-xs text-lg leading-relaxed text-white/90">
            From the first crate of vegetables to the last bill.
          </p>
        </div>

        {/* Selected moment */}
        <div
          className="mt-10 grid items-center gap-6 md:grid-cols-12 md:gap-10"
          aria-live={playing ? "off" : "polite"}
        >
          <div key={`t-${i}`} className="das-in md:col-span-5">
            <p
              className="inline-block rounded-3xl bg-[#F05038] px-6 py-4 font-display font-bold leading-none tracking-[-0.04em] text-[#1B2152]"
              style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)" }}
            >
              {cur.time}
            </p>
          </div>
          <div key={`b-${i}`} className="das-in md:col-span-7">
            <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
              {cur.title}
            </h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/90">{cur.text}</p>
          </div>
        </div>

        {/* Day track */}
        <div className="mt-12" role="group" aria-label="Moments of the day" onKeyDown={onKey}>
          <div className="relative">
            {/* base line and progress */}
            <div
              className="absolute top-[1.375rem] h-0.5 -translate-y-1/2 bg-white/30"
              style={{ left: `${50 / n}%`, right: `${50 / n}%` }}
              aria-hidden="true"
            >
              <div
                className="h-full bg-white transition-[width] duration-500"
                style={{ width: `${n > 1 ? (i / (n - 1)) * 100 : 100}%` }}
              />
            </div>

            <ul className="relative flex">
              {day.map((d, k) => {
                const on = k === i;
                const past = k < i;
                return (
                  <li key={d.time} className="flex flex-1 justify-center">
                    <button
                      type="button"
                      onClick={() => go(k)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`${d.time}, ${d.title}`}
                      className="group flex w-full flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span className="grid h-11 place-items-center">
                        <span
                          className={`block rounded-full border-2 border-white transition-all duration-300 ${
                            on
                              ? "h-6 w-6 bg-white ring-4 ring-[#F05038]"
                              : past
                              ? "h-3.5 w-3.5 bg-white"
                              : "h-3.5 w-3.5 bg-[#404898] group-hover:bg-white/60"
                          }`}
                        />
                      </span>
                      <span
                        className={`hidden text-sm font-semibold sm:block ${on ? "text-white" : "text-white/70"}`}
                      >
                        {d.time}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={() => go(i - 1)} className={ctl} aria-label="Previous moment">
              <Icon d="M19 12H5M11 6l-6 6 6 6" />
            </button>
            <button type="button" onClick={() => go(i + 1)} className={ctl} aria-label="Next moment">
              <Icon d="M5 12h14M13 6l6 6-6 6" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className={ctl}
              aria-label={playing ? "Pause autoplay" : "Play autoplay"}
            >
              <Icon d={playing ? "M9 5v14M15 5v14" : "M8 5l11 7-11 7z"} />
            </button>
            <p className="ml-2 text-base font-semibold tabular-nums text-white/90">
              {i + 1} of {n}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}