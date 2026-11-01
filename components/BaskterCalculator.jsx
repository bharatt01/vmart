"use client";

import { useEffect, useRef, useState } from "react";
import { offers } from "../app/lib/data";
import { site } from "../app/lib/site";
import { Reveal } from "./Motion";
import { Grain, Eyebrow } from "./Paper";
import { Tomato, Orange, Carrot, Onion, Chilli, Leaf } from "./Produce";

const art = [Tomato, Carrot, Orange, Onion, Chilli, Leaf];
const presets = [
  { label: "Just me", n: 1 },
  { label: "Family of 4", n: 2 },
  { label: "Big family", n: 4 },
];
const KEY = "value-mart-basket-v1";
const MAX = 30;

const rupee = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const mrpOf = (o) => (typeof o.mrp === "number" && o.mrp >= o.price ? o.mrp : o.price);

/** Smoothly animates a number toward its target. */
function useTween(target, ms = 550) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const a = from.current;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      const cur = a + (target - a) * (1 - Math.pow(1 - p, 3));
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

export default function BasketCalculator() {
  const [qty, setQty] = useState(() => Object.fromEntries(offers.map((o) => [o.name, 2])));
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Remember the basket on this device
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && typeof saved === "object") {
        setQty((q) => {
          const next = { ...q };
          for (const o of offers) if (Number.isFinite(saved[o.name])) next[o.name] = Math.min(MAX, Math.max(0, saved[o.name]));
          return next;
        });
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(qty));
    } catch {}
  }, [qty, loaded]);

  const change = (name, d) => setQty((q) => ({ ...q, [name]: Math.min(MAX, Math.max(0, (q[name] || 0) + d)) }));
  const applyPreset = (n) => setQty(Object.fromEntries(offers.map((o) => [o.name, n])));
  const reset = () => applyPreset(0);

  const chosen = offers.filter((o) => (qty[o.name] || 0) > 0);
  const pay = chosen.reduce((s, o) => s + o.price * qty[o.name], 0);
  const mrp = chosen.reduce((s, o) => s + mrpOf(o) * qty[o.name], 0);
  const saved = mrp - pay;
  const pct = mrp ? Math.round((saved / mrp) * 100) : 0;
  const payShare = mrp ? (pay / mrp) * 100 : 100;

  const tPay = useTween(pay);
  const tSaved = useTween(saved);
  const tYear = useTween(saved * 12);

  const activePreset = presets.find((p) => offers.every((o) => qty[o.name] === p.n))?.n;

  const listText = () =>
    [
      `${site.name} - my monthly basket`,
      ...chosen.map((o) => `- ${o.name}${o.unit ? ` (${o.unit})` : ""} x${qty[o.name]} = ${rupee(o.price * qty[o.name])}`),
      `Total: ${rupee(pay)} (MRP ${rupee(mrp)}, I save ${rupee(saved)})`,
    ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(listText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8EC] text-brand-navy">
      <Grain className="opacity-[0.12]" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow tone="red">Basket saver</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1] tracking-[-0.04em] sm:text-6xl">
            Plan your month,{" "}
            <span className="bg-[linear-gradient(transparent_60%,#FFC93C_60%)] px-1">see what you save.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg font-medium leading-relaxed text-brand-navy/70">
            Pick how many of each item your home uses in a month. We add it up at this week&rsquo;s shelf prices.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          {/* Items */}
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-bold text-brand-navy/60">Quick fill:</span>
              {presets.map((p) => (
                <button
                  key={p.n}
                  type="button"
                  onClick={() => applyPreset(p.n)}
                  aria-pressed={activePreset === p.n}
                  className={`rounded-full border-2 border-brand-navy px-4 py-1.5 text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E] ${
                    activePreset === p.n
                      ? "bg-brand-navy text-[#FFC93C] shadow-[3px_3px_0_0_#E63B2E]"
                      : "bg-white hover:-translate-y-0.5 hover:bg-[#FFC93C]"
                  }`}
                >
                  {p.label}
                  <span className="ml-1.5 text-xs font-semibold opacity-60">{p.n} of each</span>
                </button>
              ))}
              <button
                type="button"
                onClick={reset}
                className="ml-auto text-sm font-bold text-brand-navy/60 underline decoration-2 underline-offset-4 hover:text-[#E63B2E] focus-visible:outline-2 focus-visible:outline-[#E63B2E]"
              >
                Clear all
              </button>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {offers.map((o, i) => {
                const Art = art[i % art.length];
                const n = qty[o.name] || 0;
                const active = n > 0;
                return (
                  <li
                    key={o.name}
                    className={`relative flex items-center gap-4 rounded-2xl border-2 border-brand-navy p-4 transition-all duration-300 ${
                      active
                        ? "bg-[#FFE9A8] shadow-[5px_6px_0_0_var(--color-brand-navy)]"
                        : "bg-white shadow-[3px_4px_0_0_rgba(10,10,60,0.35)]"
                    }`}
                  >
                    <div className={`w-14 shrink-0 transition-transform duration-300 ${active ? "scale-110 -rotate-6" : "opacity-70 grayscale-[0.4]"}`}>
                      <Art className="h-auto w-full drop-shadow-[3px_4px_0_rgba(10,10,60,0.2)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg font-bold leading-tight">{o.name}</p>
                      <p className="text-xs font-medium text-brand-navy/55">{o.unit}</p>
                      <p className="mt-1 text-sm font-bold">
                        <span className="text-[#E63B2E]">{rupee(o.price)}</span>
                        {mrpOf(o) > o.price && (
                          <span className="ml-1.5 text-xs font-medium text-brand-navy/40">
                            <s>{rupee(mrpOf(o))}</s>
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => change(o.name, -1)}
                        disabled={n === 0}
                        aria-label={`Decrease ${o.name}`}
                        className="grid h-9 w-9 place-items-center rounded-lg border-2 border-brand-navy bg-white text-lg font-bold leading-none transition active:translate-y-px enabled:hover:bg-[#FFC93C] disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E]"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-display text-lg font-bold tabular-nums" aria-live="polite">
                        {n}
                      </span>
                      <button
                        type="button"
                        onClick={() => change(o.name, 1)}
                        disabled={n >= MAX}
                        aria-label={`Increase ${o.name}`}
                        className="grid h-9 w-9 place-items-center rounded-lg border-2 border-brand-navy bg-brand-navy text-lg font-bold leading-none text-[#FFC93C] transition active:translate-y-px enabled:hover:bg-[#E63B2E] enabled:hover:text-white disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E]"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Receipt */}
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border-2 border-brand-navy bg-white shadow-[8px_9px_0_0_var(--color-brand-navy)]">
              <div className="flex items-center justify-between bg-brand-navy px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FFC93C]">
                <span>Your monthly basket</span>
                <span className="opacity-70">{chosen.length} items</span>
              </div>

              <div className="px-5 pt-4">
                {chosen.length === 0 ? (
                  <p className="py-8 text-center font-medium text-brand-navy/55">
                    Add items to see your total and savings.
                  </p>
                ) : (
                  <ul className="max-h-56 space-y-2 overflow-y-auto pr-1 font-mono text-sm">
                    {chosen.map((o) => (
                      <li key={o.name} className="flex items-baseline justify-between gap-3">
                        <span className="min-w-0 truncate">
                          {o.name} <span className="text-brand-navy/50">×{qty[o.name]}</span>
                        </span>
                        <span className="shrink-0 font-bold tabular-nums">{rupee(o.price * qty[o.name])}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative mx-5 mt-4 border-t-2 border-dashed border-brand-navy/25 pt-4">
                <span className="absolute -left-[1.85rem] -top-[0.8rem] h-6 w-6 rounded-full border-2 border-brand-navy bg-[#FFF8EC]" aria-hidden="true" />
                <span className="absolute -right-[1.85rem] -top-[0.8rem] h-6 w-6 rounded-full border-2 border-brand-navy bg-[#FFF8EC]" aria-hidden="true" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-navy/55">You pay</p>
                    <p className="font-display text-5xl font-bold leading-none tracking-[-0.03em] tabular-nums text-[#E63B2E]">
                      {rupee(tPay)}
                    </p>
                  </div>
                  {mrp > pay && (
                    <p className="pb-1 text-right text-sm font-semibold text-brand-navy/45">
                      MRP <s>{rupee(mrp)}</s>
                    </p>
                  )}
                </div>

                {/* Pay vs saved bar */}
                <div className="mt-4 flex h-4 overflow-hidden rounded-full border-2 border-brand-navy bg-[#1F8A4C]" role="img" aria-label={`You pay ${Math.round(payShare)} percent of MRP`}>
                  <div className="h-full bg-brand-navy transition-[width] duration-700 ease-out" style={{ width: `${payShare}%` }} />
                </div>
                <div className="mt-1.5 flex justify-between text-xs font-bold">
                  <span className="text-brand-navy/70">Paid</span>
                  <span className="text-[#1F8A4C]">Saved {pct}%</span>
                </div>

                {/* Saver stamp */}
                <div
                  className={`mt-5 -rotate-1 rounded-2xl border-2 border-brand-navy bg-[#1F8A4C] p-4 text-white shadow-[4px_5px_0_0_var(--color-brand-navy)] transition-opacity duration-300 ${
                    saved > 0 ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">You save every month</p>
                  <p className="font-display text-4xl font-bold leading-tight tracking-[-0.03em] tabular-nums">
                    {rupee(tSaved)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#FFE9A8]">
                    That&rsquo;s about {rupee(tYear)} a year
                  </p>
                </div>
              </div>

              <div className="grid gap-2.5 p-5 pt-5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={copy}
                  disabled={chosen.length === 0}
                  className="rounded-full border-2 border-brand-navy bg-[#FFC93C] px-4 py-3 text-sm font-bold shadow-[3px_4px_0_0_var(--color-brand-navy)] transition-all enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 enabled:active:shadow-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E]"
                >
                  {copied ? "Copied!" : "Copy my list"}
                </button>
                <a
                  href={chosen.length ? `https://wa.me/?text=${encodeURIComponent(listText())}` : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={chosen.length === 0}
                  className={`rounded-full border-2 border-brand-navy bg-white px-4 py-3 text-center text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E] ${
                    chosen.length ? "hover:bg-brand-navy hover:text-white" : "pointer-events-none opacity-40"
                  }`}
                >
                  Share on WhatsApp
                </a>
              </div>

              <p className="border-t border-brand-navy/10 px-5 py-3 text-xs font-medium leading-relaxed text-brand-navy/50">
                Savings are compared with MRP and based on this week&rsquo;s prices. Prices may change weekly.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}