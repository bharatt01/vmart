"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   EDIT THIS to change or switch off the announcement.
   • enabled: false hides the bar completely
   • id: change it for each new festival so people who closed the
     last one see the new one
   • till: the bar disappears by itself after this date/time
   ───────────────────────────────────────────────────────────── */
const festival = {
  enabled: true,
  id: "diwali-2026",
  tag: "Festive offers",
  message: "Happy Diwali from Value Mart. Special prices on dry fruits, sweets and puja items",
  cta: { label: "See offers", href: "/offers" },
  till: "2026-11-10T23:59:59+05:30",
};

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 animate-pulse text-[#FFC93C]" fill="currentColor" aria-hidden="true">
      <path d="M12 0c.8 6.6 3.4 9.2 12 12-8.6 2.8-11.2 5.4-12 12-.8-6.6-3.4-9.2-12-12 8.6-2.8 11.2-5.4 12-12z" />
    </svg>
  );
}

export default function FestivalBar() {
  const [show, setShow] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    if (!festival.enabled) return;
    const end = new Date(festival.till).getTime();
    if (Number.isNaN(end) || Date.now() > end) return;

    try {
      if (localStorage.getItem(`festival-closed-${festival.id}`)) return;
    } catch {}

    setDaysLeft(Math.ceil((end - Date.now()) / 86400000));
    setShow(true);
  }, []);

  const close = () => {
    setShow(false);
    try {
      localStorage.setItem(`festival-closed-${festival.id}`, "1");
    } catch {}
  };

  if (!show) return null;

  const endsLabel = daysLeft <= 1 ? "Last day" : `${daysLeft} days left`;

  return (
    <div role="region" aria-label="Festival announcement" className="relative z-[60] border-b-2 border-[#FFC93C] bg-brand-navy text-white">
      <style>{`
        @keyframes fb-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .fb-track { animation: none !important; } }
      `}</style>

      <div className="mx-auto flex h-11 max-w-6xl items-center gap-3 px-3 sm:gap-4 sm:px-6">
        <span className="shrink-0 -rotate-2 rounded-md bg-[#FFC93C] px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-brand-navy sm:text-xs">
          {festival.tag}
        </span>

        {/* Scrolling message */}
        <div className="relative min-w-0 flex-1 overflow-hidden text-sm font-semibold [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            className="fb-track flex w-max hover:[animation-play-state:paused]"
            style={{ animation: "fb-scroll 32s linear infinite" }}
          >
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="flex items-center gap-10 pr-10">
                    <span className="whitespace-nowrap">{festival.message}</span>
                    <Spark />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {daysLeft !== null && (
          <span className="hidden shrink-0 rounded-full bg-[#E63B2E] px-3 py-1 text-xs font-bold md:inline-block">
            {endsLabel}
          </span>
        )}

        <Link
          href={festival.cta.href}
          className="hidden shrink-0 items-center gap-1 rounded-full bg-[#FFC93C] px-4 py-1.5 text-xs font-bold text-brand-navy transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex"
        >
          {festival.cta.label}
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={close}
          aria-label="Close announcement"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}