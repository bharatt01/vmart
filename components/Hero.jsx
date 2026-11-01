"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { offers } from "../app/lib/data";

/* Brand colours sampled from the logo
   red   #F05038   blue  #404898   ink  #1B2152   mist  #F2F3FA   price  #CF3520 */

/* Wide landscape image, about 2400x1200 (2:1). Keep the left 45% calm and uncluttered,
   because the headline sits there. Save it as /public/hero.webp */
const HERO_SRC = "/herobanner.png";
const HERO_ALT = "Fresh vegetables and fruit arranged on a grocery shelf";

/* TODO: move to app/lib/site.js. open / close are 24h hours in IST. */
const stores = [
  { id: "deoli", name: "Deoli", open: 7, close: 22, phone: "919999900001", mapQuery: "Value Mart Deoli, Delhi" },
  { id: "store-2", name: "Store 2", open: 7, close: 22, phone: "919999900002", mapQuery: "Value Mart Store 2" },
  { id: "store-3", name: "Store 3", open: 7, close: 22, phone: "919999900003", mapQuery: "Value Mart Store 3" },
  { id: "store-4", name: "Store 4", open: 7, close: 22, phone: "919999900004", mapQuery: "Value Mart Store 4" },
];

const tags = offers.slice(0, 2);

function fmt(h) {
  const suffix = h >= 12 ? "pm" : "am";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${suffix}`;
}

function useStatus(open, close) {
  const [isOpen, setIsOpen] = useState(null);
  useEffect(() => {
    const compute = () => {
      const hour = Number(
        new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date())
      );
      setIsOpen(hour >= open && hour < close);
    };
    compute();
    const t = setInterval(compute, 60000);
    return () => clearInterval(t);
  }, [open, close]);
  return isOpen;
}

export default function HeroBanner() {
  const [storeId, setStoreId] = useState(stores[0].id);
  const [imgFailed, setImgFailed] = useState(false);
  const store = stores.find((s) => s.id === storeId) ?? stores[0];
  const isOpen = useStatus(store.open, store.close);

  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`;
  const whatsapp = `https://wa.me/${store.phone}?text=${encodeURIComponent(`Hi, I have a question about ${store.name} store.`)}`;

  const focusDark =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#404898]";
  const focusLight =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <section className="bg-[#F2F3FA] text-[#1B2152]">
      {/* ------------------------------ Banner ------------------------------ */}
      <div className="relative isolate min-h-[34rem] overflow-hidden bg-[#404898] md:min-h-[40rem]">
        {/* Image covers the whole banner */}
        {!imgFailed && (
          <Image
            src={HERO_SRC}
            alt={HERO_ALT}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[70%_center] md:object-center"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Dark-blue overlay keeps the headline readable on any photo.
            Solid on mobile, fading to clear on the right on desktop. */}
        <div
          className="absolute inset-0 -z-10 bg-[#1B2152]/50 md:bg-gradient-to-r md:from-[#1B2152]/80 md:via-[#1B2152]/35 md:to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center px-4 pb-28 pt-14 sm:px-6 md:pb-32">
          <div className="max-w-xl">
            <h1
              className="font-display font-bold leading-[1.02] tracking-[-0.035em] text-white"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.6rem)" }}
            >
              Fresh groceries, fair prices, every day.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/90">
              Walk in, pick what you need and pay the price on the shelf.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/offers"
                className={`inline-flex min-h-12 items-center rounded-full bg-[#F05038] px-7 text-base font-bold text-[#1B2152] transition hover:bg-[#ff6149] ${focusLight}`}
              >
                See this week&rsquo;s offers
              </Link>
              <a
                href="#stores"
                className={`inline-flex min-h-12 items-center rounded-full border-2 border-white px-6 text-base font-bold text-white transition hover:bg-white hover:text-[#1B2152] ${focusLight}`}
              >
                Find your store
              </a>
            </div>
          </div>

          {/* Price tags sit on the image, bottom right on desktop */}
          <div className="mt-8 flex gap-3 md:absolute md:bottom-28 md:right-8 md:mt-0 lg:right-[max(2rem,calc((100vw-72rem)/2+1.5rem))]">
            {tags.map((o) => (
              <div key={o.name} className="rounded-2xl bg-white px-4 py-2.5 shadow-lg">
                <p className="text-sm font-semibold">{o.name}</p>
                <p className="font-display text-2xl font-bold leading-none text-[#CF3520]">₹{o.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------- Store bar (overlaps banner) ------------------------- */}
      <div id="stores" className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 pb-10 sm:px-6">
        <div className="rounded-3xl bg-white p-5 shadow-xl shadow-[#1B2152]/15 sm:p-6">
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold">Choose your store</p>
              <div
                role="radiogroup"
                aria-label="Choose your store"
                className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
              >
                {stores.map((s) => {
                  const active = s.id === storeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setStoreId(s.id)}
                      className={`min-h-11 shrink-0 rounded-full border-2 px-5 text-base font-bold transition ${focusDark} ${
                        active
                          ? "border-[#404898] bg-[#404898] text-white"
                          : "border-[#D5D9EE] hover:border-[#404898]"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 flex items-center gap-2 text-base font-semibold" aria-live="polite">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOpen === null ? "bg-[#1B2152]/30" : isOpen ? "bg-[#12805C]" : "bg-[#CF3520]"
                  }`}
                  aria-hidden="true"
                />
                {isOpen === null
                  ? `${store.name}, ${fmt(store.open)} to ${fmt(store.close)}`
                  : isOpen
                  ? `${store.name} is open, closes at ${fmt(store.close)}`
                  : `${store.name} is closed, opens at ${fmt(store.open)}`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:+${store.phone}`}
                className={`inline-flex min-h-12 items-center rounded-full border-2 border-[#404898] px-6 text-base font-bold text-[#404898] transition hover:bg-[#404898] hover:text-white ${focusDark}`}
              >
                Call {store.name}
              </a>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center rounded-full bg-[#F05038] px-6 text-base font-bold text-[#1B2152] transition hover:bg-[#e2432b] ${focusDark}`}
              >
                Directions to {store.name}
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#12805C] px-5 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 ${focusLight}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.2Z" />
        </svg>
        Order on WhatsApp
      </a>
    </section>
  );
}