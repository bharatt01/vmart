"use client";

import { useState } from "react";
import Image from "next/image";
import { departments } from "../app/lib/data";
import { Reveal } from "./Motion";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   Photos are optional, one per department:
   { name: "Vegetables", items: "Tomato, onion, leafy greens", image: "/departments/vegetables.webp" }
   Without a photo, a solid brand-colour panel with the first letter is shown. */

const fills = ["bg-[#404898]", "bg-[#CF3520]", "bg-[#2E357F]", "bg-[#F05038]"];

function Arrow({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-7 w-7 shrink-0 fill-none stroke-current stroke-[2.5] transition duration-300 sm:h-9 sm:w-9 ${
        active ? "translate-x-0 text-[#F05038] opacity-100" : "-translate-x-2 opacity-0"
      }`}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Photo({ d, i, sizes }) {
  return d.image ? (
    <Image src={d.image} alt="" fill sizes={sizes} className="object-cover" />
  ) : (
    <div className={`absolute inset-0 grid place-items-center ${fills[i % fills.length]}`} aria-hidden="true">
      <span className="font-display text-[10rem] font-bold leading-none text-white/20">{d.name.charAt(0)}</span>
    </div>
  );
}

export default function DepartmentsDirectory({ heading = true }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#1B2152] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {heading && (
          <Reveal className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              Your whole weekly list, under one roof.
            </h2>
            <p className="max-w-xs text-lg leading-relaxed text-white/80 md:pb-1">
              Pick a section to see what is on the shelves.
            </p>
          </Reveal>
        )}

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ----------------------- Directory list ----------------------- */}
          <ul className="border-t border-white/15 lg:col-span-7">
            {departments.map((d, i) => {
              const isActive = i === active;
              return (
                <li key={d.name} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`dept-${i}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex min-h-[4.5rem] w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span
                      className={`font-display text-3xl font-bold leading-none tracking-[-0.03em] transition-colors duration-300 sm:text-4xl lg:text-5xl ${
                        isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      {d.name}
                    </span>
                    <Arrow active={isActive} />
                  </button>

                  {/* On small screens the photo and details open inside the list */}
                  <div
                    id={`dept-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl">
                        <Photo d={d} i={i} sizes="100vw" />
                      </div>
                      <p className="pb-5 text-lg leading-relaxed text-white/85">{d.items}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ----------------------- Photo panel (desktop) ----------------------- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#404898]">
              {departments.map((d, i) => (
                <div
                  key={d.name}
                  className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={i !== active}
                >
                  <Photo d={d} i={i} sizes="40vw" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1B2152]/90 via-[#1B2152]/60 to-transparent p-7 pt-24">
                    <p className="font-display text-3xl font-bold leading-tight tracking-[-0.02em]">{d.name}</p>
                    <p className="mt-2 max-w-sm text-lg leading-relaxed text-white/90">{d.items}</p>
                  </div>
                </div>
              ))}
              {/* Logo red tab: a small nod to the ribbon */}
              <div className="absolute right-0 top-8 h-3 w-20 bg-[#F05038]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}