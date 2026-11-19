"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "./Motion";
import Marquee from "./Marquee";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   A bold poster-style About section: one giant sentence with little chips inside it,
   a cluster of stickers (visitors on a computer can drag them around), and a ticker ribbon.
   There is very little text on purpose, so it feels open rather than crowded.

   EDIT THE WORDS BELOW. They are sample text, so keep only what is true for your store. */

const content = {
  paragraph: "Fresh food, fair prices and a friendly face at the counter. Come in, take your time and ask us anything.",
  since: "20XX",
  stores: "4",
  ticker: ["Fresh every day", "Fair prices", "Friendly faces", "Four stores", "Come say hello"],
};

/* ------------------------------ little drawings ------------------------------ */

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.8em] w-[0.8em] shrink-0 fill-none stroke-current stroke-[2.4]" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons = {
  leaf: "M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19c3-5 6-8 10-10",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  tag: "M3 12V4h8l10 10-8 8L3 12zM7.5 8.5h.01",
};

/* A rounded chip that sits inside the big sentence */
function Chip({ icon, color, rotate, children }) {
  const colors = {
    white: "bg-white text-[#1B2152]",
    ink: "bg-[#1B2152] text-white",
    yellow: "bg-[#F5B83D] text-[#1B2152]",
  };
  return (
    <span
      className={`mx-1 inline-flex items-center gap-[0.3em] rounded-full px-[0.5em] py-[0.02em] align-middle text-[0.62em] font-bold leading-[1.35] shadow-[3px_4px_0_0_#1B2152] ${colors[color]}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Icon d={icons[icon]} />
      {children}
    </span>
  );
}

/* Points for a starburst shape */
function burstPoints(spikes = 16, outer = 50, inner = 41) {
  return Array.from({ length: spikes * 2 })
    .map((_, i) => {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i * Math.PI) / spikes;
      return `${(50 + r * Math.sin(a)).toFixed(2)},${(50 - r * Math.cos(a)).toFixed(2)}`;
    })
    .join(" ");
}

/* ------------------------------ draggable sticker ------------------------------ */
/* Mouse and pen users can drag it. Touch is left alone, so scrolling on a phone is never blocked. */

function Sticker({ rotate = 0, className = "", children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef(null);

  function down(e) {
    if (e.pointerType === "touch") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
  }
  function move(e) {
    if (!start.current) return;
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  }
  function up() {
    start.current = null;
    setDragging(false);
  }

  return (
    <div
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className={`select-none motion-safe:transition-[transform] ${dragging ? "z-20 cursor-grabbing motion-safe:duration-75" : "cursor-grab motion-safe:duration-300"} ${className}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotate}deg) scale(${dragging ? 1.08 : 1})` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ section ------------------------------ */

export default function AboutSection() {
  const { paragraph, since, stores, ticker } = content;

  return (
    <section className="relative overflow-hidden bg-[#F05038] text-[#1B2152]">
      {/* dotted poster texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: "radial-gradient(rgba(27,33,82,0.22) 1.5px, transparent 1.5px)", backgroundSize: "26px 26px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        {/* the giant sentence */}
        <Reveal>
          <h2 className="max-w-5xl font-display text-[2.6rem] font-bold leading-[1.18] tracking-[-0.04em] sm:text-6xl sm:leading-[1.15] lg:text-7xl lg:leading-[1.14]">
            We are a
            <Chip icon="leaf" color="white" rotate={-2}>
              fresh
            </Chip>
            neighbourhood grocery with
            <Chip icon="pin" color="ink" rotate={2}>
              {stores} stores
            </Chip>
            and one simple promise:
            <Chip icon="tag" color="yellow" rotate={-1.5}>
              fair prices
            </Chip>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* words and links */}
          <div className="lg:col-span-5">
            <p className="max-w-md text-xl font-semibold leading-relaxed sm:text-2xl sm:leading-relaxed">{paragraph}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/visit-us"
                className="inline-flex min-h-12 items-center rounded-full bg-[#1B2152] px-8 text-lg font-bold text-white transition-colors hover:bg-white hover:text-[#1B2152] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
              >
                Visit a store
              </Link>
              <Link
                href="/offers"
                className="inline-flex min-h-12 items-center text-lg font-bold underline decoration-[3px] underline-offset-[6px] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
              >
                See this week&rsquo;s offers
              </Link>
            </div>
          </div>

          {/* sticker cluster */}
          <div className="lg:col-span-7">
            <div className="relative flex flex-wrap items-center justify-center gap-5 lg:block lg:h-[22rem]">
              {/* starburst */}
              <Sticker rotate={-8} className="relative lg:absolute lg:left-4 lg:top-0">
                <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[4px_5px_0_#1B2152]" aria-hidden="true">
                    <polygon points={burstPoints()} fill="#F5B83D" stroke="#1B2152" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  <p className="relative text-center font-display font-bold leading-[0.95] tracking-[-0.03em]">
                    <span className="block text-4xl sm:text-5xl">Fresh</span>
                    <span className="mt-1 block text-lg sm:text-xl">every day</span>
                  </p>
                </div>
              </Sticker>

              {/* round white sticker */}
              <Sticker rotate={7} className="relative lg:absolute lg:right-6 lg:top-6">
                <div className="grid h-40 w-40 place-items-center rounded-full border-4 border-[#1B2152] bg-white text-center shadow-[5px_6px_0_0_#1B2152] sm:h-48 sm:w-48">
                  <p className="font-display font-bold leading-[0.95] tracking-[-0.03em]">
                    <span className="block text-sm">Always</span>
                    <span className="block text-4xl sm:text-5xl">Fair</span>
                    <span className="block text-2xl sm:text-3xl text-[#CF3520]">prices</span>
                  </p>
                </div>
              </Sticker>

              {/* ink tile */}
              <Sticker rotate={-4} className="relative lg:absolute lg:bottom-0 lg:left-44">
                <div className="grid h-36 w-44 place-items-center rounded-[1.75rem] border-4 border-white bg-[#1B2152] text-center text-white shadow-[5px_6px_0_0_#fff] sm:h-40 sm:w-52">
                  <p className="font-display font-bold leading-none tracking-[-0.04em]">
                    <span className="block text-7xl sm:text-8xl">{stores}</span>
                    <span className="mt-1 block text-xl">stores near you</span>
                  </p>
                </div>
              </Sticker>

              {/* small pill */}
              <Sticker rotate={5} className="relative lg:absolute lg:bottom-6 lg:right-0">
                <div className="rounded-full border-4 border-[#1B2152] bg-white px-6 py-3 font-display text-xl font-bold tracking-[-0.02em] shadow-[4px_5px_0_0_#1B2152] sm:text-2xl">
                  Since {since}
                </div>
              </Sticker>
            </div>

            <p className="mt-6 hidden text-center text-base font-semibold lg:block">Psst, you can drag the stickers around.</p>
          </div>
        </div>
      </div>

      {/* ticker ribbon, same style as the offers flyer */}
      <div className="relative bg-[#1B2152]" aria-hidden="true">
        <Marquee items={ticker} speed={45} className="py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white" />
      </div>
    </section>
  );
}