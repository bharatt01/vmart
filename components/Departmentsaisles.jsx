"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "./Motion";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   ONE-SCREEN LAYOUT
   On desktop the whole component (heading, aisle signs and the open aisle) is sized to the
   height of the browser window, so a visitor sees everything without scrolling.

   If your site has a fixed header, set its height once, for example in globals.css:
     :root { --header-h: 4.5rem; }
   The component subtracts it from the screen height (the fallback is 4.5rem).

   Concept: aisle signs hang from a rail. Pick one and its sections and highlights appear.

   EDIT THE CONTENT BELOW to match what your store really stocks. The highlight lines
   are sample wording, so keep only what is true for you. Add or remove departments freely,
   the tab row adjusts to however many there are.

   Photos are optional, one per department: add  image: "/departments/produce.webp"
   Without a photo, a solid brand-colour panel with a big aisle number is shown. */

export const departments = [
  {
    name: "Fruits & Vegetables",
    short: "Fruits & Veg",
    tagline: "From the everyday onion to the first mangoes of the season, all on one bright, cool aisle.",
    sections: [
      { title: "Everyday vegetables", items: ["Tomato", "Onion", "Potato", "Carrot", "Cauliflower", "Gourds", "Beans"] },
      { title: "Leafy greens", items: ["Spinach", "Methi", "Sarson", "Bathua", "Lettuce", "Cabbage"] },
      { title: "Fruits", items: ["Apple", "Banana", "Orange", "Pomegranate", "Papaya", "Seasonal mango", "Grapes"] },
      { title: "Herbs & exotics", items: ["Coriander", "Mint", "Curry leaves", "Broccoli", "Zucchini", "Cherry tomato"] },
    ],
    highlights: ["Fresh stock through the day", "Sorted by hand, not by hurry", "Cut and packed fruit ready to go"],
  },
  {
    name: "Dairy & Eggs",
    short: "Dairy & Eggs",
    tagline: "Everything for the breakfast table and the evening chai, kept properly chilled.",
    sections: [
      { title: "Milk & curd", items: ["Full cream", "Toned", "Double toned", "Dahi", "Lassi", "Buttermilk"] },
      { title: "Paneer, butter & cheese", items: ["Fresh paneer", "Butter", "Cheese slices", "Mozzarella", "Cream", "Khoya"] },
      { title: "Eggs", items: ["White eggs", "Brown eggs", "Tray packs", "Free range"] },
      { title: "Plant-based", items: ["Soy milk", "Almond milk", "Oat milk", "Tofu"] },
    ],
    highlights: ["Cold chain from shelf to cart", "Expiry dates checked daily", "Tray packs for big families"],
  },
  {
    name: "Meat & Fish",
    short: "Meat & Fish",
    tagline: "Clean cuts, cut to your recipe, and ready to cook when you want it quick.",
    sections: [
      { title: "Chicken", items: ["Curry cut", "Boneless", "Breast", "Drumsticks", "Mince", "Whole bird"] },
      { title: "Mutton", items: ["Curry cut", "Boneless", "Mince", "Chops", "Liver"] },
      { title: "Fish & seafood", items: ["Rohu", "Katla", "Pomfret", "Prawns", "Surmai", "Fillets"] },
      { title: "Ready to cook", items: ["Marinated chicken", "Kebabs", "Tikka cuts", "Sausages", "Cold cuts"] },
    ],
    highlights: ["Cut and cleaned to order", "Kept chilled at every step", "Marinated packs for busy nights"],
  },
  {
    name: "Atta, Rice & Dal",
    short: "Atta, Rice, Dal",
    tagline: "The monthly staples, in sizes from a small pack to a full family sack.",
    sections: [
      { title: "Flours", items: ["Wheat atta", "Multigrain atta", "Besan", "Maida", "Sooji", "Rice flour", "Ragi"] },
      { title: "Rice & poha", items: ["Basmati", "Sona masoori", "Brown rice", "Poha", "Sabudana", "Daliya"] },
      { title: "Pulses", items: ["Toor", "Moong", "Chana", "Masoor", "Urad", "Rajma", "Chhole"] },
      { title: "Oils & ghee", items: ["Mustard oil", "Sunflower oil", "Rice bran oil", "Desi ghee", "Olive oil"] },
    ],
    highlights: ["Small packs to 25 kg sacks", "Monthly list friendly", "Clearly labelled by size and grade"],
  },
  {
    name: "Spices & Masalas",
    short: "Spices",
    tagline: "Whole, ground and blended, so the kitchen smells right from the first tadka.",
    sections: [
      { title: "Whole spices", items: ["Jeera", "Sabut dhania", "Elaichi", "Laung", "Dalchini", "Kali mirch", "Hing"] },
      { title: "Ground spices", items: ["Haldi", "Lal mirch", "Dhania powder", "Jeera powder", "Amchur", "Kasuri methi"] },
      { title: "Ready blends", items: ["Garam masala", "Chaat masala", "Chhole masala", "Sabzi masala", "Biryani masala"] },
      { title: "Salt, sugar & more", items: ["Rock salt", "Iodised salt", "Sugar", "Jaggery", "Mishri", "Pickles"] },
    ],
    highlights: ["Fresh packs, tight seals", "Trusted national and local brands", "Everything for a full tadka"],
  },
  {
    name: "Snacks & Beverages",
    short: "Snacks & Drinks",
    tagline: "Tea-time, movie night or a gift for the kids, there is an aisle for it.",
    sections: [
      { title: "Namkeen & chips", items: ["Bhujia", "Mixture", "Chips", "Makhana", "Popcorn", "Nachos"] },
      { title: "Sweets & chocolates", items: ["Chocolates", "Mithai boxes", "Toffees", "Gift packs", "Dry fruit sweets"] },
      { title: "Tea & coffee", items: ["Chai patti", "Green tea", "Instant coffee", "Filter coffee", "Herbal teas"] },
      { title: "Cold drinks & juices", items: ["Soft drinks", "Fruit juices", "Coconut water", "Soda", "Energy drinks", "Water"] },
    ],
    highlights: ["Festival gift packs in season", "Family-size and single-serve", "Cold drinks from the chiller"],
  },
  {
    name: "Frozen & Ready to Eat",
    short: "Frozen",
    tagline: "Dinner in ten minutes, without giving up on taste.",
    sections: [
      { title: "Frozen snacks", items: ["Parathas", "Samosa", "Tikki", "Nuggets", "French fries", "Momos"] },
      { title: "Frozen produce", items: ["Green peas", "Sweet corn", "Mixed veg", "Berries", "Paneer cubes"] },
      { title: "Ready meals", items: ["Heat and eat curries", "Instant noodles", "Pasta", "Soups", "Poha mixes"] },
      { title: "Ice cream & desserts", items: ["Tubs", "Cones", "Kulfi", "Family packs", "Sundae cups"] },
    ],
    highlights: ["Deep freezers kept at the right chill", "Quick fixes for busy evenings", "Ice cream tubs for every size"],
  },
  {
    name: "Household & Care",
    short: "Household",
    tagline: "The cleaning, bathing and baby-care shelves that keep the whole house running.",
    sections: [
      { title: "Cleaning", items: ["Detergent", "Dishwash", "Floor cleaner", "Toilet cleaner", "Phenyl", "Mops"] },
      { title: "Personal care", items: ["Soap", "Shampoo", "Toothpaste", "Face wash", "Hair oil", "Deodorant"] },
      { title: "Baby care", items: ["Diapers", "Wipes", "Baby food", "Baby soap", "Rash cream"] },
      { title: "Kitchen & disposables", items: ["Foil", "Cling film", "Garbage bags", "Tissues", "Napkins", "Sponges"] },
    ],
    highlights: ["Bulk packs for bigger savings", "Everything for baby in one place", "Refills and value combos"],
  },
];

/* Panel colours, chosen so white text stays readable */
const fills = ["#404898", "#CF3520", "#2E357F", "#1B2152"];

/* How many item chips each section shows before "+ more". Keeps every card inside the screen. */
const MAX_CHIPS = 6;

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

function Panel({ d, i }) {
  const num = String(i + 1).padStart(2, "0");
  const fill = fills[i % fills.length];

  return (
    <div className="mt-6 grid gap-4 motion-safe:animate-[aisleIn_.45s_ease] lg:mt-7 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-5">
      {/* ------------ aisle card: name, story, highlights ------------ */}
      <div
        className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 text-white sm:p-7 lg:col-span-4 lg:min-h-0 lg:rounded-[2rem]"
        style={{ backgroundColor: fill }}
      >
        {d.image ? (
          <>
            <Image src={d.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2152]/95 via-[#1B2152]/55 to-[#1B2152]/20" aria-hidden="true" />
          </>
        ) : (
          <span
            className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display text-[12rem] font-bold leading-none tracking-[-0.06em] text-white/[0.13]"
            aria-hidden="true"
          >
            {num}
          </span>
        )}

        {/* red ribbon tab, a nod to the logo */}
        <div className="absolute left-0 top-6 z-10 h-2.5 w-16 bg-[#F05038]" aria-hidden="true" />

        <div className="relative pt-5">
          <p className="text-base font-semibold text-white/80">Aisle {num}</p>
          <h3 className="mt-1 font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl">{d.name}</h3>
          <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">{d.tagline}</p>
        </div>

        <ul className="relative mt-5 hidden space-y-2 lg:block">
          {d.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-base leading-snug text-white/95">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 fill-none stroke-[#F5826F] stroke-[3]" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* ------------ the four sections, always a tidy 2 x 2 ------------ */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8 lg:min-h-0 lg:grid-rows-2">
        {d.sections.map((s) => {
          const shown = s.items.slice(0, MAX_CHIPS);
          const more = s.items.length - shown.length;
          return (
            <section
              key={s.title}
              className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#1B2152]/10 bg-white p-4 sm:p-5"
            >
              <h4 className="flex items-center gap-2.5 font-display text-lg font-bold tracking-[-0.02em] text-[#1B2152] sm:text-xl">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-[#F05038]" aria-hidden="true" />
                {s.title}
              </h4>
              <ul className="mt-3 flex flex-wrap content-start gap-1.5">
                {shown.map((it) => (
                  <li key={it} className="rounded-full bg-[#EEF0FA] px-3 py-1 text-[0.95rem] leading-snug text-[#1B2152]">
                    {it}
                  </li>
                ))}
                {more > 0 && (
                  <li className="rounded-full border border-[#1B2152]/20 px-3 py-1 text-[0.95rem] font-semibold leading-snug text-[#404898]">
                    + {more} more
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function DepartmentsAisles({ heading = true }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const count = departments.length;
  const last = count - 1;

  function onKeyDown(e, i) {
    let next = null;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <section className="bg-[#FFF8F3] text-[#1B2152]">
      {/* On desktop this box is exactly one screen tall (minus your header), so nothing needs scrolling. */}
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-8 sm:px-6 lg:h-[calc(100svh-var(--header-h,4.5rem))] lg:min-h-[40rem] lg:py-7">
        {heading && (
          <Reveal className="mb-6 flex flex-col gap-2 lg:mb-7 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              {numberWords[count] || count} aisles. Your whole list.
            </h2>
            <p className="max-w-xs text-base leading-relaxed text-[#1B2152]/75 lg:pb-1 lg:text-lg">
              Follow the signs to the aisle you need.
            </p>
          </Reveal>
        )}

        {/* ------------ hanging aisle signs ------------ */}
        <div className="-mx-4 shrink-0 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <div
            role="tablist"
            aria-label="Store departments"
            style={{ "--n": count }}
            className="relative flex min-w-max gap-2 pt-5 lg:grid lg:min-w-0 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
          >
            {/* the rail the signs hang from */}
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-full bg-[#1B2152]" aria-hidden="true" />

            {departments.map((d, i) => {
              const isActive = i === active;
              return (
                <button
                  key={d.name}
                  ref={(el) => (refs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`aisle-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="aisle-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="group relative w-32 shrink-0 text-left focus-visible:outline-none lg:w-auto"
                >
                  {/* the two strings */}
                  <span className="absolute -top-5 left-4 h-5 w-0.5 bg-[#1B2152]/50" aria-hidden="true" />
                  <span className="absolute -top-5 right-4 h-5 w-0.5 bg-[#1B2152]/50" aria-hidden="true" />

                  <span
                    className={`relative flex h-full min-h-[4.25rem] flex-col justify-between rounded-xl border-2 px-3 py-2.5 motion-safe:transition-all motion-safe:duration-300 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#1B2152] ${
                      isActive
                        ? "translate-y-0.5 border-[#1B2152] bg-[#1B2152] text-white shadow-lg"
                        : "border-[#1B2152]/15 bg-white text-[#1B2152] group-hover:-translate-y-0.5 group-hover:border-[#1B2152]/40"
                    }`}
                  >
                    <span className={`text-sm font-bold ${isActive ? "text-[#F5826F]" : "text-[#CF3520]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 font-display text-base font-bold leading-tight tracking-[-0.02em]">{d.short}</span>
                    {isActive && <span className="absolute inset-x-3 bottom-0 h-1 rounded-t-full bg-[#F05038]" aria-hidden="true" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------ aisle panel (fills the rest of the screen) ------------ */}
        <div
          id="aisle-panel"
          role="tabpanel"
          aria-labelledby={`aisle-tab-${active}`}
          tabIndex={0}
          className="flex flex-col focus-visible:outline-none lg:min-h-0 lg:flex-1"
        >
          <Panel key={active} d={departments[active]} i={active} />
        </div>
      </div>

      <style>{`@keyframes aisleIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}