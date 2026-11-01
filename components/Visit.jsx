import OpenStatus from "./OpenStatus";
import { Reveal } from "./Motion";
import { Eyebrow, Float } from "./Paper";
import { Tomato, Leaf } from "./Produce";
import { site } from "../app/lib/site";

const q = encodeURIComponent(site.mapQuery);
const tel = `tel:${site.phone.replace(/\s/g, "")}`;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-5 w-5",
  "aria-hidden": true,
};

const rows = [
  {
    label: "Address",
    value: site.address,
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Hours",
    value: site.hours,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: (
      <a href={tel} className="underline decoration-2 underline-offset-4 hover:text-[#E63B2E]">
        {site.phone}
      </a>
    ),
    icon: (
      <svg {...iconProps}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      </svg>
    ),
  },
];

export default function Visit() {
  return (
    <section id="visit" className="relative isolate scroll-mt-24 overflow-hidden bg-brand-navy text-white">
      <div className="absolute -left-20 top-1/3 -z-10 h-80 w-80 rounded-full bg-[#E63B2E]/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#FFC93C]/15 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14 md:py-28">
        <Reveal>
          <Eyebrow tone="yellow">Visit the store</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-bold leading-[1] tracking-[-0.04em] sm:text-7xl">
            Come say{" "}
            <span className="inline-block -rotate-2 rounded-md bg-[#FFC93C] px-3 text-brand-navy">hello.</span>
          </h2>

          <div className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/20">
            <OpenStatus tone="dark" />
          </div>

          <dl className="mt-9 space-y-4">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-start gap-4 rounded-2xl border-2 border-brand-navy bg-[#FFF8EC] p-4 text-brand-navy shadow-[5px_6px_0_0_#FFC93C]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#E63B2E] text-white">
                  {r.icon}
                </span>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-brand-navy/55">{r.label}</dt>
                  <dd className="mt-0.5 text-lg font-semibold leading-snug">{r.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FFC93C] px-7 py-3.5 font-bold text-brand-navy shadow-[5px_6px_0_0_#E63B2E] transition hover:-translate-y-0.5 hover:shadow-[7px_8px_0_0_#E63B2E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Open in Google Maps
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            <a
              href={tel}
              className="inline-flex items-center rounded-full border-2 border-white/40 px-7 py-3.5 font-bold transition hover:bg-white hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Call the store
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <Float r={-12} className="absolute -left-6 -top-10 z-10 hidden w-24 md:block">
            <Tomato className="h-auto w-full drop-shadow-[4px_5px_0_rgba(0,0,0,0.3)]" />
          </Float>
          <Float r={14} delay="-2s" className="absolute -bottom-8 -right-4 z-10 hidden w-24 md:block">
            <Leaf className="h-auto w-full drop-shadow-[4px_5px_0_rgba(0,0,0,0.3)]" />
          </Float>

          <div className="h-full min-h-96 overflow-hidden rounded-3xl border-4 border-[#FFC93C] bg-white shadow-[9px_10px_0_0_#E63B2E]">
            <iframe
              title={`Map showing ${site.name}`}
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              className="h-full min-h-96 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}