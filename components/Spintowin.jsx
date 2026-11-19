"use client";

import { useEffect, useRef, useState } from "react";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   LUCKY WHEEL for the Offers page.

   HOW THE ODDS WORK
   Every slice has a `weight`. The wheel picks a slice using those weights, NOT the slice size,
   so all slices look the same size but the big prizes are rare. With the sample weights below:
     "Try again" lands 48 times in 100, the small treats about 45, and the big prizes
     (₹100 off and ₹500 off) only 5 times in 100 spins.
   Weights are relative, so they do not have to add up to 100. To make a prize rarer,
   lower its weight. To control cost, keep the minimum bill (terms) well above the discount.

   EVERYTHING in `prizes` is SAMPLE TEXT. Set your own discounts, minimum bills and weights.
   A slice with no `terms` is treated as "no prize".

   IMPORTANT BEFORE YOU GO LIVE
   This runs in the visitor's browser, so a determined person can spin again by clearing their
   browser data, and codes are made on their phone. For small treats that is usually fine.
   For real discounts, check the code at the billing counter, or have your server create
   and verify the codes. Odds are shown to visitors under "See the odds" on purpose.

   Props:  oncePerDay (default true)   set false while testing to spin as often as you like
           validDays  (default 7)      how long a prize code stays valid
           codePrefix (default "LUCKY") */

const prizes = [
  { short: "Try again", label: "Better luck next time", weight: 24, color: "#FFF8F3", text: "#1B2152" },
  { short: "₹20 off", label: "₹20 off", weight: 18, color: "#404898", text: "#FFFFFF", terms: "On a bill of ₹500 or more." },
  { short: "Free chocolate", label: "A free chocolate", weight: 9, color: "#CF3520", text: "#FFFFFF", terms: "One free chocolate on a bill of ₹500 or more." },
  { short: "Try again", label: "Better luck next time", weight: 24, color: "#FFF8F3", text: "#1B2152" },
  { short: "5% off", label: "5% off", weight: 12, color: "#2E357F", text: "#FFFFFF", terms: "On a bill of ₹1,500 or more. Maximum saving ₹150." },
  { short: "₹50 off", label: "₹50 off", weight: 8, color: "#CF3520", text: "#FFFFFF", terms: "On a bill of ₹1,000 or more." },
  { short: "₹100 off", label: "₹100 off", weight: 4, color: "#404898", text: "#FFFFFF", terms: "On a bill of ₹2,000 or more." },
  { short: "₹500 off", label: "₹500 off", weight: 1, color: "#F5B83D", text: "#1B2152", terms: "On a bill of ₹5,000 or more." },
];

const STORAGE_KEY = "spin-win-v1";
const SPIN_MS = 5200;
const confettiColors = ["#F05038", "#404898", "#F5B83D", "#FFFFFF", "#F5826F"];

/* ------------------------------ helpers ------------------------------ */

function rand() {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] / 2 ** 32;
  } catch {
    return Math.random();
  }
}

function pickIndex() {
  const total = prizes.reduce((n, p) => n + p.weight, 0);
  let r = rand() * total;
  for (let i = 0; i < prizes.length; i++) {
    r -= prizes[i].weight;
    if (r < 0) return i;
  }
  return 0;
}

function makeCode(prefix) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(rand() * chars.length)];
  return `${prefix}-${s}`;
}

const todayKey = () => new Date().toLocaleDateString("en-CA");
const seg = 360 / prizes.length;
/* rotation (mod 360) that puts slice i under the pointer at the top */
const angleFor = (i) => 360 - (i * seg + seg / 2);
const pct = (w) => {
  const total = prizes.reduce((n, p) => n + p.weight, 0);
  const v = (w / total) * 100;
  return v >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
};

function polar(r, deg) {
  const a = (deg * Math.PI) / 180;
  return [r * Math.sin(a), -r * Math.cos(a)];
}

/* ------------------------------ wheel drawing ------------------------------ */

function WheelFace() {
  return (
    <svg viewBox="-100 -100 200 200" className="h-full w-full" aria-hidden="true">
      <circle r="99" fill="#F05038" />
      {Array.from({ length: 24 }).map((_, i) => {
        const [x, y] = polar(94.5, i * 15);
        return <circle key={i} cx={x} cy={y} r="1.9" fill="#fff" />;
      })}
      {prizes.map((p, i) => {
        const a0 = i * seg;
        const a1 = (i + 1) * seg;
        const [x0, y0] = polar(89, a0);
        const [x1, y1] = polar(89, a1);
        const mid = a0 + seg / 2;
        return (
          <g key={i}>
            <path d={`M0 0 L${x0} ${y0} A89 89 0 0 1 ${x1} ${y1} Z`} fill={p.color} stroke="#1B2152" strokeWidth="1" />
            <g transform={`rotate(${mid - 90})`}>
              <text x="80" y="3.4" textAnchor="end" fontSize="9.5" fontWeight="800" fill={p.text} style={{ fontFamily: "inherit" }}>
                {p.short}
              </text>
            </g>
          </g>
        );
      })}
      <circle r="17" fill="#1B2152" />
    </svg>
  );
}

/* ------------------------------ prize ticket ------------------------------ */

function Ticket({ result }) {
  const [copied, setCopied] = useState(false);
  const p = prizes[result.idx];
  const win = Boolean(p.terms);

  async function copy() {
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked, the code is still on screen */
    }
  }

  if (!win) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-white/30 p-6 text-white">
        <p className="font-display text-2xl font-bold tracking-[-0.02em]">No prize this time.</p>
        <p className="mt-2 text-lg leading-relaxed text-white/80">So close! Your next spin is free tomorrow.</p>
      </div>
    );
  }

  const expires = new Date(result.expires).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white text-[#1B2152] shadow-2xl motion-safe:animate-[swPop_.5s_ease-out]">
      <div className="p-6 pb-5">
        <p className="text-base font-semibold text-[#CF3520]">You won</p>
        <p className="mt-1 font-display text-4xl font-bold leading-none tracking-[-0.04em] sm:text-5xl">{p.label}</p>
        <p className="mt-3 text-base leading-relaxed text-[#1B2152]/80">{p.terms}</p>
      </div>

      {/* perforation with side notches */}
      <div className="relative" aria-hidden="true">
        <div className="border-t-2 border-dashed border-[#1B2152]/25" />
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#1B2152]" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#1B2152]" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-6 pt-5">
        <div>
          <p className="text-sm font-semibold text-[#1B2152]/70">Your code</p>
          <p className="font-mono text-2xl font-bold tracking-wider">{result.code}</p>
          <p className="mt-1 text-sm text-[#1B2152]/70">Valid till {expires}. Show it at the billing counter.</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="min-h-11 rounded-full bg-[#1B2152] px-6 text-base font-bold text-white transition-colors hover:bg-[#404898] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
        >
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ main component ------------------------------ */

export default function SpinToWin({ oncePerDay = true, validDays = 7, codePrefix = "LUCKY" }) {
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null); // { idx, code, expires, date }
  const [played, setPlayed] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const doneRef = useRef(true);
  const timerRef = useRef(null);
  const pendingIdx = useRef(0);

  /* remember today's spin so a refresh does not give another one */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && saved.date === todayKey()) {
        setResult(saved);
        setRot(angleFor(saved.idx));
        if (oncePerDay) setPlayed(true);
      }
    } catch {
      /* storage unavailable, the wheel simply works without memory */
    }
    return () => clearTimeout(timerRef.current);
  }, [oncePerDay]);

  function finish(idx) {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimeout(timerRef.current);

    const win = Boolean(prizes[idx].terms);
    const res = {
      idx,
      date: todayKey(),
      code: win ? makeCode(codePrefix) : "",
      expires: new Date(Date.now() + validDays * 864e5).toISOString(),
    };
    setResult(res);
    setSpinning(false);
    if (oncePerDay) setPlayed(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    } catch {
      /* ignore */
    }

    if (win) {
      setConfetti(
        Array.from({ length: 36 }).map((_, k) => ({
          id: `${Date.now()}-${k}`,
          left: rand() * 100,
          delay: rand() * 0.6,
          dur: 2.2 + rand() * 1.8,
          size: 6 + Math.round(rand() * 8),
          color: confettiColors[k % confettiColors.length],
        }))
      );
      setTimeout(() => setConfetti([]), 5000);
    }
  }

  function spin() {
    if (spinning || played) return;
    const idx = pickIndex();
    const jitter = (rand() - 0.5) * seg * 0.6;
    const base = Math.ceil(rot / 360) * 360;
    setResult(null);
    setConfetti([]);
    doneRef.current = false;
    setSpinning(true);
    setRot(base + 360 * 6 + angleFor(idx) + jitter);
    timerRef.current = setTimeout(() => finish(idx), SPIN_MS + 500);
    pendingIdx.current = idx;
  }

  const disabled = spinning || played;

  return (
    <section className="relative overflow-hidden bg-[#1B2152] text-white">
      <style>{`
        .sw-wheel{transition:transform ${SPIN_MS}ms cubic-bezier(.12,.62,.08,1)}
        @media (prefers-reduced-motion: reduce){.sw-wheel{transition-duration:.8s}}
        @keyframes swPop{0%{transform:scale(.9) rotate(-1.5deg);opacity:0}60%{transform:scale(1.03)}100%{transform:none;opacity:1}}
        @keyframes swFall{0%{top:-4%;transform:rotate(0)}100%{top:104%;transform:translateX(30px) rotate(720deg)}}
        @keyframes swTick{0%,100%{transform:translateX(-50%) rotate(0)}50%{transform:translateX(-50%) rotate(-8deg)}}
        @media (prefers-reduced-motion: reduce){.sw-confetti{display:none}}
      `}</style>

      {/* soft red glow behind the wheel */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-[#F05038]/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:gap-10">
        {/* ----------------------- copy + result ----------------------- */}
        <div className="lg:col-span-6">
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Feeling lucky?
            <span className="block text-[#F05038]">Give the wheel a spin.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
            One free spin a day. Small treats come up often, the big prizes are rare, so keep coming back.
          </p>

          <ul className="mt-6 space-y-2.5 text-lg text-white/90">
            {[
              "One spin per person per day",
              `Prize codes are valid for ${validDays} days`,
              "Every prize shows its minimum bill on the ticket",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 fill-none stroke-[#F5826F] stroke-[3]" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>

          {/* result, announced to screen readers */}
          <div className="mt-8 min-h-[9rem]" aria-live="polite">
            {result ? (
              <Ticket result={result} />
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-white/25 p-6">
                <p className="font-display text-2xl font-bold tracking-[-0.02em] text-white/90">
                  {spinning ? "Round and round it goes..." : "Your prize ticket will show up here."}
                </p>
              </div>
            )}
          </div>

          <details className="group mt-6 max-w-md">
            <summary className="inline-flex min-h-11 cursor-pointer items-center text-base font-semibold text-white/85 underline decoration-white/40 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              See the odds
            </summary>
            <ul className="mt-3 divide-y divide-white/10 rounded-xl border border-white/15 text-base">
              {prizes.map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <span className="text-white/90">{p.label}</span>
                  <span className="font-mono font-bold">{pct(p.weight)}%</span>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* ----------------------- wheel ----------------------- */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] pt-3">
            {/* pointer */}
            <svg
              viewBox="0 0 40 48"
              className={`absolute left-1/2 top-0 z-20 h-12 w-10 -translate-x-1/2 drop-shadow-lg ${spinning ? "motion-safe:animate-[swTick_.18s_linear_infinite]" : ""}`}
              style={{ transformOrigin: "50% 20%" }}
              aria-hidden="true"
            >
              <path d="M20 46 L4 12 A18 18 0 1 1 36 12 Z" fill="#F5B83D" stroke="#1B2152" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="20" cy="15" r="5" fill="#1B2152" />
            </svg>

            {/* spinning disc */}
            <div className="relative mt-3 aspect-square w-full rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div
                className="sw-wheel h-full w-full rounded-full"
                style={{ transform: `rotate(${rot}deg)` }}
                onTransitionEnd={(e) => {
                  if (e.target === e.currentTarget) finish(pendingIdx.current);
                }}
              >
                <WheelFace />
              </div>

              {/* hub */}
              <button
                type="button"
                onClick={spin}
                disabled={disabled}
                aria-label={disabled ? "Wheel unavailable" : "Spin the wheel"}
                className="absolute left-1/2 top-1/2 z-10 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] border-white bg-[#F05038] font-display text-lg font-bold tracking-[-0.02em] text-[#1B2152] shadow-xl transition-transform enabled:hover:scale-105 disabled:bg-[#F05038]/70 sm:text-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {spinning ? "..." : "SPIN"}
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={spin}
              disabled={disabled}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#F05038] px-10 text-xl font-bold text-[#1B2152] transition-colors enabled:hover:bg-white disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {spinning ? "Spinning..." : played ? "Come back tomorrow" : "Spin the wheel"}
            </button>
            {played && <p className="text-base text-white/75">You have used today&rsquo;s spin.</p>}
          </div>
        </div>
      </div>

      {/* confetti for a win */}
      {confetti.length > 0 && (
        <div className="sw-confetti pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="absolute block rounded-[2px]"
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 0.6,
                backgroundColor: c.color,
                animation: `swFall ${c.dur}s ${c.delay}s ease-in both`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}