"use client";

import { useEffect, useMemo, useState } from "react";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152   mist #F2F3FA

   TODO: replace everything below with the client's real details, ideally in app/lib/site.js.
   lat / lng are only used for the "nearest store" sort. Copy them from Google Maps
   (right click the store pin). open / close are 24h hours in IST. phone is digits only, with 91. */
const stores = [
  { id: "deoli", name: "Deoli", address: "Replace with full address, Deoli, New Delhi", open: 7, close: 22, phone: "919999900001", lat: 28.5, lng: 77.23 },
  { id: "store-2", name: "Store 2", address: "Replace with full address", open: 7, close: 22, phone: "919999900002", lat: 28.52, lng: 77.2 },
  { id: "store-3", name: "Store 3", address: "Replace with full address", open: 7, close: 22, phone: "919999900003", lat: 28.55, lng: 77.25 },
  { id: "store-4", name: "Store 4", address: "Replace with full address", open: 7, close: 22, phone: "919999900004", lat: 28.48, lng: 77.27 },
];

const zigzag = "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 20px 100%";
const barcode =
  "repeating-linear-gradient(90deg, #1B2152 0 2px, transparent 2px 4px, #1B2152 4px 5px, transparent 5px 9px, #1B2152 9px 12px, transparent 12px 14px)";
const tilts = ["lg:-rotate-2", "lg:rotate-1", "lg:-rotate-1", "lg:rotate-2"];

function fmt(h) {
  const suffix = h >= 12 ? "pm" : "am";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${suffix}`;
}

function km(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(x));
}

function useIstHour() {
  const [hour, setHour] = useState(null);
  useEffect(() => {
    const tick = () =>
      setHour(
        Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()))
      );
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);
  return hour;
}

export default function StoreReceipts() {
  const hour = useIstHour();
  const [here, setHere] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const list = useMemo(() => {
    const withDist = stores.map((s) => ({ ...s, dist: here ? km(here, s) : null }));
    return here ? withDist.sort((a, b) => a.dist - b.dist) : withDist;
  }, [here]);

  const locate = () => {
    if (!navigator.geolocation) {
      setMessage("Your browser can't share your location. Pick a store below.");
      return;
    }
    setBusy(true);
    setMessage("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setHere({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setMessage("Sorted by distance from you.");
        setBusy(false);
      },
      () => {
        setMessage("Location is blocked. Allow it in your browser, or pick a store below.");
        setBusy(false);
      },
      { timeout: 10000 }
    );
  };

  const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#404898]";

  return (
    <section id="store-list" className="bg-[#F2F3FA] text-[#1B2152]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              Find your nearest store.
            </h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed">
              {stores.length} stores, the same shelf prices in every one.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={locate}
              disabled={busy}
              className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-[#404898] px-7 text-base font-bold text-white transition hover:bg-[#33397a] disabled:opacity-60 ${focus}`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
              </svg>
              {busy ? "Finding you..." : "Use my location"}
            </button>
            <p className="mt-2 min-h-6 text-base" aria-live="polite">
              {message}
            </p>
          </div>
        </div>

        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => {
            const isOpen = hour === null ? null : hour >= s.open && hour < s.close;
            const nearest = here && i === 0;
            const directions = `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`;

            return (
              <li
                key={s.id}
                className={`transition-transform duration-300 motion-safe:hover:rotate-0 ${tilts[i % tilts.length]}`}
              >
                {/* drop-shadow lives on the wrapper because the mask would clip a box-shadow */}
                <div className="drop-shadow-[0_8px_14px_rgba(27,33,82,0.18)]">
                  <div
                    className="bg-white px-5 pb-10 pt-6"
                    style={{ WebkitMask: zigzag, mask: zigzag }}
                  >
                    <p className="text-center text-sm font-bold tracking-wide">VALUE MART</p>
                    <h3 className="mt-1 text-center font-display text-4xl font-bold leading-none tracking-[-0.03em]">
                      {s.name}
                    </h3>
                    {nearest ? (
                      <p className="mx-auto mt-3 w-fit rounded-full bg-[#F05038] px-3 py-1 text-sm font-bold">
                        Nearest to you, {s.dist.toFixed(1)} km
                      </p>
                    ) : (
                      here && (
                        <p className="mt-3 text-center text-sm font-semibold">{s.dist.toFixed(1)} km away</p>
                      )
                    )}

                    <div className="my-5 border-t-2 border-dashed border-[#1B2152]/30" />

                    <dl className="space-y-3 text-base">
                      <div>
                        <dt className="text-sm font-bold">Address</dt>
                        <dd className="mt-0.5 leading-snug">{s.address}</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-sm font-bold">Open daily</dt>
                        <dd className="font-semibold tabular-nums">
                          {fmt(s.open)} to {fmt(s.close)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-sm font-bold">Right now</dt>
                        <dd className="flex items-center gap-2 font-semibold" aria-live="polite">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              isOpen === null ? "bg-[#1B2152]/30" : isOpen ? "bg-[#12805C]" : "bg-[#CF3520]"
                            }`}
                            aria-hidden="true"
                          />
                          {isOpen === null ? "..." : isOpen ? "Open" : "Closed"}
                        </dd>
                      </div>
                    </dl>

                    <div className="my-5 border-t-2 border-dashed border-[#1B2152]/30" />

                    <div className="grid gap-2">
                      <a
                        href={directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[#404898] px-5 text-base font-bold text-white transition hover:bg-[#33397a] ${focus}`}
                      >
                        Directions to {s.name}
                      </a>
                      <a
                        href={`tel:+${s.phone}`}
                        className={`inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#404898] px-5 text-base font-bold text-[#404898] transition hover:bg-[#404898] hover:text-white ${focus}`}
                      >
                        Call {s.name}
                      </a>
                    </div>

                    <div className="mt-6 h-9 w-full" style={{ backgroundImage: barcode }} aria-hidden="true" />
                    <p className="mt-2 text-center text-sm font-semibold">Thank you, see you soon</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}