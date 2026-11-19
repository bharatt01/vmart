"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { offers } from "../app/lib/data";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   For the Offers page. Concept: the shop till.
   Every offer is a hang-tag with a barcode strip. Visitors tap "Add to list" and a till
   receipt on the side totals what they pay and what they save. They can share the
   list on WhatsApp and show it at the store.

   Each offer needs { name, price }.
   Optional: unit ("per kg"), mrp (old price), image, category ("Vegetables").
   If any offers have a category, filter chips appear automatically. */

const fills = ["#404898", "#CF3520", "#2E357F", "#1B2152"];

const sorts = [
  { id: "saving", label: "Biggest saving" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
  { id: "az", label: "Name: A to Z" },
];

const rupee = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const savingOf = (o) => (o.mrp && o.mrp > o.price ? o.mrp - o.price : 0);
const percentOf = (o) => (savingOf(o) ? Math.round((savingOf(o) / o.mrp) * 100) : 0);

/* Decorative barcode, drawn with a repeating gradient so it needs no image */
const barcode =
  "repeating-linear-gradient(90deg,#1B2152 0 2px,transparent 2px 4px,#1B2152 4px 5px,transparent 5px 8px,#1B2152 8px 11px,transparent 11px 12px,#1B2152 12px 13px,transparent 13px 16px)";

function Plus({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 fill-none stroke-current stroke-[2.5]`} aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function Check({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 fill-none stroke-current stroke-[3]`} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----------------------------- hang-tag ----------------------------- */

function Tag({ o, i, qty, onToggle }) {
  const selected = qty > 0;
  const pct = percentOf(o);
  const saving = savingOf(o);

  return (
    <li className="flex">
      <article
        className={`flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm motion-safe:transition-all motion-safe:duration-300 ${
          selected ? "ring-[3px] ring-[#F05038]" : "ring-1 ring-[#1B2152]/15 hover:-translate-y-1 hover:shadow-lg hover:ring-[#1B2152]/35"
        }`}
      >
        {/* picture panel */}
        <div className="relative aspect-[5/3] overflow-hidden" style={{ backgroundColor: fills[i % fills.length] }}>
          {o.image ? (
            <Image src={o.image} alt="" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
          ) : (
            <span
              className="absolute inset-0 grid place-items-center font-display text-[8rem] font-bold leading-none text-white/20"
              aria-hidden="true"
            >
              {o.name.charAt(0)}
            </span>
          )}

          {/* the punched hole of a hang-tag */}
          <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-[#FFF8F3] ring-1 ring-black/15" aria-hidden="true" />

          {pct > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-[#F05038] px-2.5 py-1 text-sm font-bold text-[#1B2152]">
              {pct}% off
            </span>
          )}
        </div>

        {/* details */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.025em] text-[#1B2152]">{o.name}</h3>
          {o.unit && <p className="mt-0.5 text-base text-[#1B2152]/70">{o.unit}</p>}

          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="font-display text-4xl font-bold leading-none tracking-[-0.04em] text-[#1B2152]">
              <span className="mr-0.5 align-top text-xl tracking-normal">₹</span>
              {o.price}
            </p>
            {saving > 0 && (
              <p className="text-base text-[#1B2152]/70">
                <span className="line-through decoration-2">{rupee(o.mrp)}</span>
              </p>
            )}
          </div>
          {saving > 0 && <p className="mt-1 text-base font-bold text-[#CF3520]">You save {rupee(saving)}</p>}

          {/* barcode strip */}
          <div className="mt-4 h-7 opacity-80" style={{ background: barcode }} aria-hidden="true" />

          <button
            type="button"
            aria-pressed={selected}
            onClick={onToggle}
            className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152] ${
              selected ? "bg-[#F05038] text-[#1B2152] hover:bg-[#ff6a52]" : "bg-[#1B2152] text-white hover:bg-[#404898]"
            }`}
          >
            {selected ? <Check /> : <Plus />}
            {selected ? "Added to list" : "Add to list"}
            <span className="sr-only"> {o.name}</span>
          </button>
        </div>
      </article>
    </li>
  );
}

/* ----------------------------- till receipt ----------------------------- */

function Receipt({ lines, totals, onQty, onClear }) {
  const empty = lines.length === 0;

  const shareText = useMemo(() => {
    if (empty) return "";
    const rows = lines.map((l) => `• ${l.o.name} x ${l.qty} (${rupee(l.o.price * l.qty)})`).join("\n");
    return `My shopping list\n${rows}\n\nTotal: ${rupee(totals.pay)}${totals.save ? `\nI save: ${rupee(totals.save)}` : ""}`;
  }, [lines, totals, empty]);

  return (
    <div id="my-list" className="scroll-mt-6">
      <div className="bg-white px-5 pb-5 pt-6 font-mono text-[#1B2152] shadow-xl shadow-[#1B2152]/10 sm:px-6">
        <p className="text-center font-display text-2xl font-bold tracking-[-0.02em]">My shopping list</p>
        <p className="mt-1 text-center text-base text-[#1B2152]/70">Show this at the counter</p>
        <div className="my-4 border-t-2 border-dashed border-[#1B2152]/30" />

        {empty ? (
          <p className="py-6 text-center text-base leading-relaxed text-[#1B2152]/75">
            Tap Add to list on any offer and your total and savings will appear here.
          </p>
        ) : (
          <ul className="space-y-4">
            {lines.map(({ o, qty }) => (
              <li key={o.name}>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold leading-snug">{o.name}</span>
                  <span className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-[#1B2152]/30" aria-hidden="true" />
                  <span className="text-base font-bold">{rupee(o.price * qty)}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-sm text-[#1B2152]/70">
                    {rupee(o.price)}
                    {o.unit ? ` ${o.unit}` : ""}
                  </span>
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onQty(o.name, qty - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#1B2152]/25 text-lg font-bold hover:border-[#1B2152] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2152]"
                      aria-label={qty === 1 ? `Remove ${o.name}` : `One less ${o.name}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-base font-bold" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQty(o.name, qty + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#1B2152]/25 text-lg font-bold hover:border-[#1B2152] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2152]"
                      aria-label={`One more ${o.name}`}
                    >
                      +
                    </button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="my-5 border-t-2 border-dashed border-[#1B2152]/30" />

        <dl className="space-y-2" aria-live="polite">
          <div className="flex justify-between text-base">
            <dt>Items</dt>
            <dd className="font-bold">{totals.items}</dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="text-lg font-bold">You pay</dt>
            <dd className="font-display text-3xl font-bold tracking-[-0.03em]">{rupee(totals.pay)}</dd>
          </div>
          {totals.save > 0 && (
            <div className="flex items-center justify-between rounded-lg bg-[#FDE8E5] px-3 py-2 text-base font-bold text-[#7A1F12]">
              <dt>You save</dt>
              <dd>{rupee(totals.save)}</dd>
            </div>
          )}
        </dl>

        {!empty && (
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F05038] px-6 font-sans text-base font-bold text-[#1B2152] transition-colors hover:bg-[#1B2152] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
            >
              Share on WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
            <button
              type="button"
              onClick={onClear}
              className="min-h-11 rounded-full font-sans text-base font-semibold text-[#1B2152]/75 underline underline-offset-4 hover:text-[#1B2152] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2152]"
            >
              Clear list
            </button>
          </div>
        )}
      </div>

      {/* torn paper edge */}
      <svg className="block h-3 w-full" aria-hidden="true">
        <defs>
          <pattern id="receipt-zig" width="16" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 0h16L8 12z" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#receipt-zig)" />
      </svg>
    </div>
  );
}

/* ----------------------------- page section ----------------------------- */

export default function OffersBoard() {
  const [sort, setSort] = useState("saving");
  const [cat, setCat] = useState("All");
  const [list, setList] = useState({}); // { [offer name]: quantity }

  const categories = useMemo(() => {
    const set = new Set(offers.map((o) => o.category).filter(Boolean));
    return set.size ? ["All", ...set] : [];
  }, []);

  const shown = useMemo(() => {
    const base = offers.map((o, i) => ({ o, i })).filter(({ o }) => cat === "All" || o.category === cat);
    const by = {
      saving: (a, b) => savingOf(b.o) - savingOf(a.o),
      low: (a, b) => a.o.price - b.o.price,
      high: (a, b) => b.o.price - a.o.price,
      az: (a, b) => a.o.name.localeCompare(b.o.name),
    }[sort];
    return [...base].sort(by);
  }, [sort, cat]);

  const lines = useMemo(
    () => offers.filter((o) => list[o.name] > 0).map((o) => ({ o, qty: list[o.name] })),
    [list]
  );
  const totals = useMemo(
    () => ({
      items: lines.reduce((n, l) => n + l.qty, 0),
      pay: lines.reduce((n, l) => n + l.o.price * l.qty, 0),
      save: lines.reduce((n, l) => n + savingOf(l.o) * l.qty, 0),
    }),
    [lines]
  );

  function setQty(name, qty) {
    setList((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[name];
      else next[name] = qty;
      return next;
    });
  }

  return (
    <section className="bg-[#FFF8F3] text-[#1B2152]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {/* heading + controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Pick your deals. Watch the savings add up.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#1B2152]/75">
              {offers.length} offers this week. Add what you need and we will total it like a till.
            </p>
          </div>

          <label className="flex shrink-0 flex-col gap-1.5 text-base font-semibold">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="min-h-12 rounded-full border-2 border-[#1B2152]/25 bg-white px-5 text-base font-medium text-[#1B2152] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2152]"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {categories.length > 0 && (
          <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="group" aria-label="Filter by category">
            <div className="flex min-w-max gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={`min-h-11 rounded-full border-2 px-5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2152] ${
                    cat === c
                      ? "border-[#1B2152] bg-[#1B2152] text-white"
                      : "border-[#1B2152]/20 bg-white text-[#1B2152] hover:border-[#1B2152]/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* tags + receipt */}
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8 lg:grid-cols-3">
            {shown.map(({ o, i }) => (
              <Tag key={o.name} o={o} i={i} qty={list[o.name] || 0} onToggle={() => setQty(o.name, list[o.name] ? 0 : 1)} />
            ))}
          </ul>

          <aside className="lg:sticky lg:top-24 lg:col-span-4" aria-label="Your shopping list">
            <Receipt lines={lines} totals={totals} onQty={setQty} onClear={() => setList({})} />
          </aside>
        </div>
      </div>

      {/* phone-only bar so the total is always in reach */}
      {totals.items > 0 && (
        <a
          href="#my-list"
          className="fixed inset-x-3 z-40 flex min-h-14 items-center justify-between rounded-full bg-[#1B2152] px-6 text-white shadow-2xl lg:hidden"
          style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <span className="text-base font-semibold">
            {totals.items} {totals.items === 1 ? "item" : "items"}
            {totals.save > 0 && <span className="text-[#F5826F]"> · save {rupee(totals.save)}</span>}
          </span>
          <span className="font-display text-xl font-bold">{rupee(totals.pay)}</span>
        </a>
      )}
    </section>
  );
}