import Link from "next/link";
import { Reveal } from "./Motion";
import { Grain, Float } from "./Paper";
import { Tomato, Orange, Leaf, Carrot } from "./Produce";
import { site } from "../app/lib/site";

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[#E63B2E] text-white">
      <Grain className="opacity-[0.25]" />

      {/* Produce on the edges */}
      <Float r={-14} className="absolute -left-6 top-6 hidden w-32 md:block lg:left-6">
        <Tomato className="h-auto w-full drop-shadow-[6px_7px_0_rgba(10,10,60,0.3)]" />
      </Float>
      <Float r={16} delay="-2s" className="absolute -bottom-6 left-[18%] hidden w-24 lg:block">
        <Leaf className="h-auto w-full drop-shadow-[5px_6px_0_rgba(10,10,60,0.3)]" />
      </Float>
      <Float r={12} delay="-1s" className="absolute -right-4 top-4 hidden w-32 md:block lg:right-8">
        <Orange className="h-auto w-full drop-shadow-[6px_7px_0_rgba(10,10,60,0.3)]" />
      </Float>
      <Float r={-18} delay="-3s" className="absolute -bottom-4 right-[20%] hidden w-24 lg:block">
        <Carrot className="h-auto w-full drop-shadow-[5px_6px_0_rgba(10,10,60,0.3)]" />
      </Float>

      <Reveal className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-bold leading-[1] tracking-[-0.04em] sm:text-6xl">
          Fresh stock is in.{" "}
          <span className="inline-block -rotate-1 rounded-md bg-[#FFC93C] px-3 text-brand-navy">Come take a look.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg font-medium leading-relaxed text-white/90">
          No minimum, no membership. Walk in, pick what you need and pay the price on the shelf.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FFC93C] px-8 py-4 font-bold text-brand-navy shadow-[5px_6px_0_0_var(--color-brand-navy)] transition hover:-translate-y-0.5 hover:shadow-[7px_8px_0_0_var(--color-brand-navy)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Get directions
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <Link
            href="/offers"
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 font-bold transition hover:bg-white hover:text-[#E63B2E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            See this week&rsquo;s offers
          </Link>
        </div>
      </Reveal>
    </section>
  );
}