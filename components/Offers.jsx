"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { offers } from "../app/lib/data";
import Marquee from "./Marquee";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   Each offer needs { name, price }. Optional: unit ("per kg"), mrp (old price), image. */

const list = offers.slice(0, 6);
const prices = offers.map((o) => `${o.name}  ·  ₹${o.price}`);

export default function OffersFlyer() {
  const [active, setActive] = useState(0);
  const o = list[active] ?? list[0];
  if (!o) return null;

  const saving = o.mrp && o.mrp > o.price ? o.mrp - o.price : 0;

  return (
    <section className="bg-[#F05038] text-[#1B2152]">
      <style>{`
        @keyframes of-pop {
          0% { transform: scale(.88) rotate(-3deg); opacity: 0; }
          60% { transform: scale(1.04) rotate(1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes of-stick {
          0% { transform: rotate(-30deg) scale(.4); opacity: 0; }
          100% { transform: rotate(-9deg) scale(1); opacity: 1; }
        }
        .of-pop { animation: of-pop .45s ease-out both; }
        .of-stick { animation: of-stick .5s .15s cubic-bezier(.3,1.6,.5,1) both; }
        @media (prefers-reduced-motion: reduce) { .of-pop, .of-stick { animation: none; } .of-stick { transform: rotate(-9deg); } }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20">
        <h2 className="font-display text-4xl font-bold leading-none tracking-[-0.04em] sm:text-6xl">
          This week&rsquo;s offers
        </h2>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ------------------------- Featured deal ------------------------- */}
          <div className="lg:col-span-7" aria-live="polite">
            {/* key remounts the block so the pop animation replays on every switch */}
            <div key={o.name} className="of-pop">
              <p className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
                {o.name}
                {o.unit && <span className="font-semibold"> / {o.unit.replace(/^per\s+/i, "")}</span>}
              </p>

              <div className="relative mt-2 flex items-end gap-6">
                <p
                  className="font-display font-bold leading-[0.85] tracking-[-0.06em] text-white [text-shadow:6px_7px_0_#1B2152] sm:[text-shadow:9px_10px_0_#1B2152]"
                  style={{ fontSize: "clamp(7.5rem, 22vw, 16rem)" }}
                >
                  <span className="mr-1 align-top text-[0.35em] tracking-normal">₹</span>
                  {o.price}
                </p>

                {o.image && (
                  <div className="relative mb-4 hidden aspect-square w-40 shrink-0 overflow-hidden rounded-3xl border-4 border-[#1B2152] sm:block lg:w-48">
                    <Image src={o.image} alt="" fill sizes="192px" className="object-cover" />
                  </div>
                )}

                {/* Sticker */}
                <div className="of-stick absolute -top-2 right-0 grid h-28 w-28 place-items-center rounded-full border-4 border-[#1B2152] bg-white p-2 text-center shadow-[4px_5px_0_0_#1B2152] sm:right-8 sm:h-32 sm:w-32">
                  {saving > 0 ? (
                    <p className="font-display text-xl font-bold leading-[1.05]">
                      Save
                      <br />
                      <span className="text-3xl text-[#CF3520]">₹{saving}</span>
                    </p>
                  ) : (
                    <p className="font-display text-xl font-bold leading-[1.05]">
                      Shelf
                      <br />
                      price
                    </p>
                  )}
                </div>
              </div>

              {saving > 0 && (
                <p className="mt-5 text-xl font-bold">
                  Was <span className="line-through decoration-[3px]">₹{o.mrp}</span>
                </p>
              )}
            </div>
          </div>

          {/* ------------------------- Other deals ------------------------- */}
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {list.map((d, i) => {
                const on = i === active;
                return (
                  <li key={d.name}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={on}
                      className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border-[3px] border-[#1B2152] px-5 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2152] ${
                        on
                          ? "translate-x-2 bg-[#1B2152] text-white shadow-[0_0_0_0_#1B2152]"
                          : "bg-white shadow-[4px_5px_0_0_#1B2152] hover:-translate-y-0.5"
                      }`}
                    >
                      <span className="text-lg font-bold">{d.name}</span>
                      <span
                        className={`font-display text-2xl font-bold ${on ? "text-[#F05038]" : "text-[#CF3520]"}`}
                      >
                        ₹{d.price}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/offers"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#1B2152] px-7 text-base font-bold text-white transition hover:bg-[#404898] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
            >
              See every offer
            </Link>
          </div>
        </div>
      </div>

      {/* Flyer ticker with the same real prices */}
      <div className="bg-[#1B2152]" aria-hidden="true">
        <Marquee
          items={prices}
          speed={50}
          className="py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white"
        />
      </div>
    </section>
  );
}