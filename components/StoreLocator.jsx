"use client";

import { useState } from "react";
import { Reveal } from "./Motion";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   Concept: a market street. Each store is a shopfront with a striped, scalloped awning.
   Click a shopfront and it opens up to show a live map and the store details.

   EDIT THE STORES BELOW with your real details (or move the array to app/lib/data.js).
   mapQuery: an address or "lat,lng" (lat,lng gives the most accurate pin). */

export const stores = [
  {
    name: "Store One",
    area: "Area name",
    address: ["Tigaon Road, Opposie Puri, Paranayam Residency, Sector 82, Faridabad, Haryana 121007"],
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    hours: "Every day, 7:00 am to 10:00 pm",
    mapQuery: "Shop No. 12, Main Market Road, New Delhi",
  },
  {
    name: "Store Two",
    area: "Area name",
    address: ["KLJ society, Greater, Block A, Sector 77, Faridabad, Faizupur Majra Neemka, Haryana 121006"],
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    hours: "Every day, 7:00 am to 10:00 pm",
    mapQuery: "Plot 4, Sector Road, New Delhi",
  },
  {
    name: "Store Three",
    area: "Area name",
    address: ["Basement, RPS Central Mall, RPS City, Sector 88, Faridabad, Haryana 121014"],
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    hours: "Every day, 8:00 am to 9:30 pm",
    mapQuery: "Market Complex, New Delhi",
  },
  {
    name: "Store Four",
    area: "Area name",
    address: ["Shop number - 5,6,7,8 Royal Heritage, Society, Sector 70, Faridabad, Haryana 121004"],
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    hours: "Every day, 8:00 am to 9:30 pm",
    mapQuery: "Station Road, New Delhi",
  },
];

/* Awning colours per shopfront, alternating so the street has rhythm */
const awnings = [
  ["#F05038", "#FFFFFF"],
  ["#404898", "#FFFFFF"],
  ["#F05038", "#FFFFFF"],
  ["#404898", "#FFFFFF"],
];

/* Striped canvas with a scalloped edge. Stripes are 28px wide, and each
   scallop is a half circle exactly one stripe wide, so they line up. */
function Awning({ colors }) {
  const [a, b] = colors;
  const stripes = `repeating-linear-gradient(90deg, ${a} 0 28px, ${b} 28px 56px)`;
  const scallop = "radial-gradient(circle at 50% 0, #000 13.5px, transparent 14.5px)";
  return (
    <div className="relative z-10 shrink-0" style={{ filter: "drop-shadow(0 8px 6px rgba(0,0,0,0.28))" }} aria-hidden="true">
      <div className="h-10" style={{ background: stripes }} />
      <div
        className="h-3.5"
        style={{
          background: stripes,
          WebkitMaskImage: scallop,
          maskImage: scallop,
          WebkitMaskSize: "28px 100%",
          maskSize: "28px 100%",
          WebkitMaskRepeat: "repeat-x",
          maskRepeat: "repeat-x",
        }}
      />
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-[#404898]">{label}</dt>
      <dd className="mt-0.5 text-base leading-snug text-[#1B2152] sm:text-lg">{children}</dd>
    </div>
  );
}

function Shopfront({ store, index, isActive, onOpen }) {
  const q = encodeURIComponent(store.mapQuery);
  const panelId = `store-${index}`;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl motion-safe:transition-[flex-grow,background-color] motion-safe:duration-500 motion-safe:ease-out lg:min-w-0 ${
        isActive ? "bg-[#404898] lg:flex-[3.6]" : "bg-[#2E357F] hover:bg-[#363E8C] lg:flex-1"
      }`}
    >
      <button
        type="button"
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={onOpen}
        className={`flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white ${
          isActive ? "" : "lg:flex-1"
        }`}
      >
        <Awning colors={awnings[index % awnings.length]} />

        <span
          className={`flex w-full gap-1 px-5 pb-4 pt-5 ${
            isActive
              ? "flex-col sm:flex-row sm:items-baseline sm:gap-4 sm:px-6"
              : "min-h-[5.5rem] flex-col justify-center lg:flex-1 lg:items-center lg:justify-start lg:py-8"
          }`}
        >
          <span
            className={`font-display font-bold leading-none tracking-[-0.035em] text-white ${
              isActive ? "text-4xl sm:text-5xl" : "text-3xl text-white/90 lg:rotate-180 lg:text-4xl lg:[writing-mode:vertical-rl]"
            }`}
          >
            {store.name}
          </span>
          <span
            className={`text-base ${isActive ? "text-white/80" : "text-white/55 lg:mt-5 lg:rotate-180 lg:[writing-mode:vertical-rl]"}`}
          >
            {store.area}
          </span>
        </span>
      </button>

      {isActive && (
        <div id={panelId} className="relative flex flex-col gap-3 px-3 pb-3 lg:flex-1">
          {/* the shop window: a live map */}
          <div className="relative h-72 overflow-hidden rounded-xl bg-[#2E357F] lg:absolute lg:inset-x-3 lg:inset-y-0 lg:bottom-3 lg:h-auto">
            <iframe
              title={`Map showing ${store.name}`}
              src={`https://maps.google.com/maps?q=${q}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 motion-safe:animate-[storeFade_.7s_ease]"
            />
          </div>

          {/* the shop sign: details card */}
          <div className="relative rounded-xl bg-white p-5 shadow-xl sm:p-6 lg:absolute lg:bottom-6 lg:left-6 lg:w-[21rem]">
            <dl className="space-y-4">
              <Detail label="Address">
                {store.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Detail>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Detail label="Open">{store.hours}</Detail>
                <Detail label="Call">
                  <a
                    href={`tel:${store.phone.replace(/\s/g, "")}`}
                    className="font-semibold underline decoration-[#404898]/40 underline-offset-4 hover:decoration-[#404898] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#404898]"
                  >
                    {store.phone}
                  </a>
                </Detail>
              </div>
            </dl>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F05038] px-6 py-3 text-lg font-bold text-[#1B2152] transition-colors hover:bg-[#1B2152] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
            >
              Get directions
              <span className="sr-only"> to {store.name} (opens Google Maps)</span>
            </a>
          </div>
        </div>
      )}
    </article>
  );
}

export default function StoresLocator({ heading = true }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#1B2152] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {heading && (
          <Reveal className="mb-12 md:mb-16">
            <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Walk down our street. Pick your store.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
              Open any shopfront to see where it is, when it is open and how to get there.
            </p>
          </Reveal>
        )}

        {/* the street */}
        <div className="flex flex-col gap-4 lg:h-[39rem] lg:flex-row lg:gap-3">
          {stores.map((s, i) => (
            <Shopfront key={s.name} store={s} index={i} isActive={i === active} onOpen={() => setActive(i)} />
          ))}
        </div>

        {/* pavement */}
        <div className="mt-0 hidden h-3 rounded-b-xl bg-[#0F1438] lg:block" aria-hidden="true" />
      </div>

      <style>{`@keyframes storeFade{from{opacity:0}to{opacity:1}}`}</style>
    </section>
  );
}