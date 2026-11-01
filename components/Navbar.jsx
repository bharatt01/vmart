"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site } from "../app/lib/site";

const blockColors = ["bg-[#FFC93C]", "bg-[#E63B2E] text-white", "bg-[#1F8A4C] text-white", "bg-[#F28C0F]", "bg-[#FFE3A1]"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Collapse the info strip once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <header className="sticky top-0 z-50">
      {/* Info strip */}
      <div
        className={`overflow-hidden bg-[#E63B2E] text-white transition-[max-height] duration-300 ${
          scrolled ? "max-h-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-sm font-semibold sm:px-6">
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFC93C] opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFC93C]" />
            </span>
            {site.hours}
          </p>
          <div className="hidden items-center gap-5 sm:flex">
            <span className="text-white/85">{site.address}</span>
            <span className="h-4 w-px bg-white/40" aria-hidden="true" />
            <a href={tel} className="font-bold text-[#FFC93C] hover:underline focus-visible:underline">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b-2 border-brand-navy bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_5px_0_0_#FFC93C]" : ""
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63B2E]"
          >
            <Image src="/logo.png" alt={site.name} width={816} height={227} priority className="h-11 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative isolate block rounded-full px-4 py-2 font-display text-[1.02rem] font-bold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E] ${
                      active
                        ? "bg-brand-navy text-[#FFC93C] shadow-[3px_3px_0_0_#E63B2E]"
                        : "text-brand-navy hover:-translate-y-0.5"
                    }`}
                  >
                    {item.label}
                    {!active && (
                      <span
                        className="absolute inset-x-2 bottom-1.5 -z-10 h-3 origin-left scale-x-0 rounded-sm bg-[#FFC93C] transition-transform duration-300 ease-out group-hover:scale-x-100"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={tel}
              aria-label={`Call ${site.phone}`}
              className="hidden h-11 w-11 place-items-center rounded-full border-2 border-brand-navy text-brand-navy transition hover:bg-brand-navy hover:text-[#FFC93C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E] lg:grid"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
              </svg>
            </a>

            <Link
              href="/contact#visit"
              className="hidden items-center gap-2 rounded-full border-2 border-brand-navy bg-[#FFC93C] px-5 py-2.5 text-sm font-bold text-brand-navy shadow-[3px_4px_0_0_var(--color-brand-navy)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_6px_0_0_var(--color-brand-navy)] active:translate-y-0 active:shadow-[1px_2px_0_0_var(--color-brand-navy)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63B2E] sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Find our store
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-xl border-2 border-brand-navy bg-[#FFC93C] text-brand-navy shadow-[3px_3px_0_0_var(--color-brand-navy)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63B2E] md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b-2 border-brand-navy bg-[#FFF8EC] shadow-[0_8px_0_0_#FFC93C] md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {site.nav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-center gap-4 border-b-2 border-brand-navy/10 py-4"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-brand-navy font-display text-sm font-bold text-brand-navy shadow-[2px_3px_0_0_var(--color-brand-navy)] ${
                      blockColors[i % blockColors.length]
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-3xl font-bold tracking-tight ${
                      active ? "text-[#E63B2E]" : "text-brand-navy"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-2xl text-brand-navy transition-transform group-active:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="grid gap-3 py-5">
            <Link
              href="/contact#visit"
              className="rounded-full border-2 border-brand-navy bg-[#FFC93C] py-3.5 text-center font-bold text-brand-navy shadow-[4px_5px_0_0_var(--color-brand-navy)]"
            >
              Find our store
            </Link>
            <a
              href={tel}
              className="rounded-full border-2 border-brand-navy py-3.5 text-center font-bold text-brand-navy"
            >
              Call {site.phone}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}