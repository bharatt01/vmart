"use client";

import { useEffect, useState } from "react";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   Typical North India (Delhi NCR) seasons. Edit freely: the client knows
   what the mandi actually sends. Each month has vegetables (v) and fruit (f). */
const months = [
  { short: "Jan", full: "January", season: "Winter",
    v: ["Carrot", "Cauliflower", "Peas", "Spinach", "Mustard greens", "Radish", "Turnip", "Fenugreek", "Cabbage", "Beetroot"],
    f: ["Kinnow", "Orange", "Guava", "Amla", "Pomegranate", "Apple"] },
  { short: "Feb", full: "February", season: "Winter",
    v: ["Cauliflower", "Peas", "Spinach", "Carrot", "Radish", "Cabbage", "Fenugreek", "Beetroot"],
    f: ["Kinnow", "Guava", "Strawberry", "Banana", "Papaya"] },
  { short: "Mar", full: "March", season: "Summer",
    v: ["Spinach", "Cabbage", "Cauliflower", "Carrot", "Bottle gourd", "Cucumber"],
    f: ["Watermelon", "Strawberry", "Papaya", "Banana"] },
  { short: "Apr", full: "April", season: "Summer",
    v: ["Cucumber", "Bottle gourd", "Ridge gourd", "Bitter gourd", "Okra", "Pumpkin"],
    f: ["Watermelon", "Muskmelon", "Mango", "Papaya"] },
  { short: "May", full: "May", season: "Summer",
    v: ["Okra", "Bottle gourd", "Ridge gourd", "Bitter gourd", "Cucumber", "Brinjal"],
    f: ["Mango", "Litchi", "Watermelon", "Muskmelon"] },
  { short: "Jun", full: "June", season: "Summer",
    v: ["Okra", "Bitter gourd", "Ridge gourd", "Cucumber", "Bottle gourd", "Tinda"],
    f: ["Mango", "Litchi", "Jamun", "Watermelon", "Plum"] },
  { short: "Jul", full: "July", season: "Monsoon",
    v: ["Okra", "Bottle gourd", "Bitter gourd", "Brinjal", "Tinda", "Ridge gourd", "Corn"],
    f: ["Mango", "Jamun", "Plum", "Pear", "Peach"] },
  { short: "Aug", full: "August", season: "Monsoon",
    v: ["Okra", "Brinjal", "Bottle gourd", "Corn", "Pumpkin", "Ridge gourd"],
    f: ["Apple", "Pear", "Plum", "Peach", "Banana", "Papaya"] },
  { short: "Sep", full: "September", season: "Monsoon",
    v: ["Okra", "Brinjal", "Bottle gourd", "Tomato", "Capsicum", "Beans"],
    f: ["Apple", "Pear", "Guava", "Pomegranate", "Banana"] },
  { short: "Oct", full: "October", season: "Autumn",
    v: ["Tomato", "Capsicum", "Beans", "Pumpkin", "Cauliflower", "Spinach", "Carrot"],
    f: ["Apple", "Pomegranate", "Guava", "Custard apple", "Banana"] },
  { short: "Nov", full: "November", season: "Winter",
    v: ["Cauliflower", "Carrot", "Radish", "Peas", "Spinach", "Cabbage", "Turnip", "Sweet potato", "Fenugreek"],
    f: ["Guava", "Pomegranate", "Apple", "Orange", "Amla", "Custard apple"] },
  { short: "Dec", full: "December", season: "Winter",
    v: ["Carrot", "Cauliflower", "Peas", "Spinach", "Mustard greens", "Radish", "Turnip", "Beetroot", "Fenugreek", "Cabbage"],
    f: ["Kinnow", "Orange", "Guava", "Amla", "Pomegranate", "Apple"] },
];

export default function SeasonalGuide() {
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(0);

  // Start on the real current month, set after mount to avoid a hydration mismatch
  useEffect(() => {
    const m = new Date().getMonth();
    setCurrent(m);
    setSelected(m);
  }, []);

  const m = months[selected];

  const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#404898]";

  return (
    <section className="bg-white text-[#1B2152]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
          What&rsquo;s fresh this month.
        </h2>
        <p className="mt-3 max-w-md text-lg leading-relaxed">
          Fruit and vegetables taste best, and cost less, in their season. Pick a month.
        </p>

        {/* Month picker */}
        <div
          role="radiogroup"
          aria-label="Choose a month"
          className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12"
        >
          {months.map((mo, i) => {
            const on = i === selected;
            return (
              <button
                key={mo.short}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={mo.full + (i === current ? " (this month)" : "")}
                onClick={() => setSelected(i)}
                className={`relative min-h-12 rounded-2xl border-2 text-base font-bold transition ${focus} ${
                  on
                    ? "border-[#1B2152] bg-[#1B2152] text-white"
                    : "border-[#D5D9EE] hover:border-[#404898]"
                }`}
              >
                {mo.short}
                {i === current && (
                  <span
                    className={`absolute right-2 top-2 h-2 w-2 rounded-full ${on ? "bg-[#F05038]" : "bg-[#F05038]"}`}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Giant month name */}
        <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-2" aria-live="polite">
          <p
            className="font-display font-bold leading-[0.9] tracking-[-0.05em]"
            style={{ fontSize: "clamp(3.5rem, 13vw, 9rem)" }}
          >
            {m.full}
          </p>
          <p className="mb-2 rounded-full bg-[#F05038] px-4 py-1.5 text-base font-bold sm:mb-4">
            {m.season}
            {selected === current && ", this month"}
          </p>
        </div>

        {/* Produce panels */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] bg-[#404898] p-6 text-white sm:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-3xl font-bold tracking-[-0.02em]">Vegetables</h3>
              <p className="text-base font-semibold">{m.v.length} in season</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {m.v.map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-2 text-lg font-semibold text-[#1B2152]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-[#F05038] p-6 text-[#1B2152] sm:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-3xl font-bold tracking-[-0.02em]">Fruit</h3>
              <p className="text-lg font-bold">{m.f.length} in season</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {m.f.map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-2 text-lg font-semibold text-[#1B2152]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-base">
          Typical for Delhi and North India. What is on the shelf can change with the weather and the market.
        </p>
      </div>
    </section>
  );
}