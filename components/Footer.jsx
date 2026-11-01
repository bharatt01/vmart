import Link from "next/link";
import { Tomato, Orange, Leaf, Carrot, Onion, Chilli } from "./Produce";
import { site } from "../app/lib/site";

const tel = `tel:${site.phone.replace(/\s/g, "")}`;
const row = [Tomato, Leaf, Orange, Chilli, Carrot, Onion, Tomato, Leaf];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-navy text-white">
      {/* Shelf of produce sitting on the top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 flex -translate-y-1/2 justify-around px-4" aria-hidden="true">
        {row.map((C, i) => (
          <C
            key={i}
            className={`h-auto w-12 sm:w-16 md:w-20 ${i % 2 ? "rotate-12" : "-rotate-12"} ${i > 4 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>

      {/* Giant faint wordmark */}
      <div
        className="pointer-events-none absolute -bottom-8 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-display font-extrabold leading-none tracking-[-0.05em] text-transparent"
        style={{ fontSize: "clamp(5rem, 17vw, 15rem)", WebkitTextStroke: "2px rgba(255,201,60,0.16)" }}
        aria-hidden="true"
      >
        {site.name}
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-24 sm:px-6 md:grid-cols-[1.3fr_0.8fr_1fr] md:pb-32 md:pt-28">
        <div>
          <p className="font-display text-3xl font-bold tracking-tight text-[#FFC93C]">{site.name}</p>
          <p className="mt-4 max-w-xs leading-relaxed text-white/70">
            Fresh vegetables, staples, dairy and everything for the home. Prices marked on every shelf.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-medium text-white/85 transition hover:text-[#FFC93C] focus-visible:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Visit us</p>
          <address className="mt-4 space-y-2.5 not-italic text-white/85">
            <p>{site.address}</p>
            <p>{site.hours}</p>
            <p>
              <a href={tel} className="font-semibold text-[#FFC93C] underline decoration-2 underline-offset-4 hover:text-white">
                {site.phone}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-sm text-white/50 sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Prices may change weekly.</p>
        </div>
      </div>
    </footer>
  );
}