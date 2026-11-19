"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Motion";

/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152

   A complete "Visit us" page: hero, one big Main Branch feature with a live map,
   three other branches as cards, and a short "before you visit" strip.

   EDIT THE DATA BELOW. Everything in the sample text (addresses, phone numbers, facilities,
   directions, tips) is a placeholder, so replace it with your real details.

   open / close are 24-hour numbers in India time, e.g. 7 = 7:00 am, 21.5 = 9:30 pm.
   mapQuery is an address or "lat,lng" ("lat,lng" gives the most accurate pin). */

const stores = [
  {
    id: "main",
    main: true,
    name: "Main Branch",
    area: "Area name",
    address: ["Tigaon Road, Opposie Puri, Paranayam Residency, Sector 82, Faridabad, Haryana 121007"],
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    open: 7,
    close: 22,
    mapQuery: "Shop No. 1, Main Market Road, New Delhi",
    landmark: "Next to the main market gate",
    facilities: ["Customer parking", "Bakery counter", "Meat & fish counter", "Fresh produce hall", "Home delivery desk", "ATM"],
    reach: [
      { mode: "By car", text: "Free customer parking right outside, entry from the main road." },
      { mode: "By metro", text: "Add your nearest station here, about 10 minutes by auto." },
      { mode: "On foot", text: "Two minutes from the market gate, look for the red and blue sign." },
    ],
  },
  {
    id: "store-2",
    name: "Store Two",
    area: "Area name",
    address: ["KLJ society, Greater, Block A, Sector 77, Faridabad, Faizupur Majra Neemka, Haryana 121006"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.7605593681237!2d77.3665924!3d28.366087800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd3d0694e8e1%3A0xb6c35d28796b06ce!2sValue%20mart!5e0!3m2!1sen!2sin!4v1795093686906!5m2!1sen!2sin",
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    open: 7,
    close: 22,
    mapQuery: "Plot 4, Sector Road, New Delhi",
  },
  {
    id: "store-3",
    name: "Store Three",
    area: "Area name",
    address: ["Basement, RPS Central Mall, RPS City, Sector 88, Faridabad, Haryana 121014"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1493803921467!2d77.35429239999999!3d28.4147491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd7d4fc66999%3A0x677e72cc42466a83!2sValue%20Mart%20(RPS%20Central%20Mall)%2C%20RPS%20City!5e0!3m2!1sen!2sin!4v1795093962805!5m2!1sen!2sin",
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    open: 8,
    close: 21.5,
    mapQuery: "Market Complex, New Delhi",
  },
  {
    id: "store-4",
    name: "Store Four",
    area: "Area name",
    address: ["Shop number - 5,6,7,8 Royal Heritage, Society, Sector 70, Faridabad, Haryana 121004"],
      mapEmbed: "YOUR_STORE_4_EMBED_URL",
    phone: "+91 8447071001",
    email: "valuemart1008@gmail.com",
    open: 8,
    close: 21.5,
    mapQuery: "Station Road, New Delhi",
  },
];

const tips = [
  { title: "Parking", text: "Customer parking at the main branch, limited at the other stores." },
  { title: "Payments", text: "UPI, cards and cash accepted at every counter." },
  { title: "Need a hand?", text: "Ask any team member and we will walk you to the shelf." },
];

/* ---------------------------------- helpers ---------------------------------- */

function fmt(h) {
  const hour = Math.floor(h);
  const min = Math.round((h - hour) * 60);
  const suffix = hour >= 12 ? "pm" : "am";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${suffix}`;
}

const hoursLabel = (s) => `Every day, ${fmt(s.open)} to ${fmt(s.close)}`;

function getEmbedSrc(value = "") {
  const match = value.match(/src="([^"]+)"/);
  return match ? match[1] : value;
}

function coordsFromEmbed(value = "") {
  const src = getEmbedSrc(value);
  const lng = src.match(/!2d(-?\d+\.\d+)/);
  const lat = src.match(/!3d(-?\d+\.\d+)/);
  return lat && lng ? `${lat[1]},${lng[1]}` : null;
}

const mapsDir = (s) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    coordsFromEmbed(s.mapEmbed) || s.mapQuery
  )}`;
  const tel = (s) => `tel:${s.phone.replace(/\s/g, "")}`;

/* Works out open / closed in India time after mount, so server and browser HTML always match */
function useOpenNow(s) {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
      timeZone: "Asia/Kolkata",
    }).formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === "hour").value) % 24;
    const m = Number(parts.find((p) => p.type === "minute").value);
    const now = h + m / 60;
    setStatus(now >= s.open && now < s.close ? "open" : "closed");
  }, [s.open, s.close]);
  return status;
}

function StatusPill({ store }) {
  const status = useOpenNow(store);
  if (!status) return null;
  const isOpen = status === "open";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-base font-semibold ${
        isOpen ? "bg-[#E4F5EA] text-[#14532D]" : "bg-[#FDE8E5] text-[#7A1F12]"
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? "bg-[#1E9E52]" : "bg-[#CF3520]"}`} aria-hidden="true" />
      {isOpen ? `Open now, closes ${fmt(store.close)}` : `Closed, opens ${fmt(store.open)}`}
    </span>
  );
}

/* ---------------------------------- icons ---------------------------------- */

const paths = {
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 fill-none stroke-current stroke-2`} aria-hidden="true">
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------- stylised map art ---------------------------------- */

const artVariants = [
  { bg: "#404898", roads: "M-10 150 C80 120 140 170 230 110 S360 60 420 90 M120 -10 L170 210 M-10 40 L420 190 M300 -10 C280 60 330 120 310 210", pin: [215, 108] },
  { bg: "#CF3520", roads: "M-10 60 C90 100 150 40 250 90 S370 150 420 120 M60 -10 C90 70 40 140 90 210 M-10 180 L420 30 M330 -10 L290 210", pin: [196, 88] },
  { bg: "#2E357F", roads: "M-10 110 L420 110 M200 -10 L200 210 M-10 30 C100 50 160 160 420 170 M70 -10 C60 70 120 150 80 210", pin: [200, 110] },
];

function MapArt({ index }) {
  const v = artVariants[index % artVariants.length];
  return (
    <div className="relative h-44 overflow-hidden" style={{ backgroundColor: v.bg }} aria-hidden="true">
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path d={v.roads} fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="14" strokeLinecap="round" />
        <path d={v.roads} fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" />
        <circle cx={v.pin[0]} cy={v.pin[1]} r="34" fill="white" fillOpacity="0.12" />
        <circle cx={v.pin[0]} cy={v.pin[1]} r="18" fill="white" fillOpacity="0.18" />
        <path
          d={`M${v.pin[0]} ${v.pin[1] + 22} c-10-12-16-20-16-30a16 16 0 0 1 32 0c0 10-6 18-16 30z`}
          fill="#F05038"
          stroke="white"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx={v.pin[0]} cy={v.pin[1] - 8} r="5.5" fill="white" />
      </svg>
    </div>
  );
}

/* ---------------------------------- pieces ---------------------------------- */

function Row({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white" aria-hidden="true">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <dt className="text-sm font-semibold text-white/65">{label}</dt>
        <dd className="mt-0.5 text-lg leading-snug text-white">{children}</dd>
      </div>
    </div>
  );
}

function MainBranch({ s }) {
  const q = encodeURIComponent(s.mapQuery);
  return (
    <section id={s.id} className="scroll-mt-8 bg-[#FFF8F3] text-[#1B2152]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-0">
          {/* details */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] bg-[#1B2152] p-7 text-white shadow-2xl shadow-[#1B2152]/20 sm:p-10 lg:col-span-5 lg:-mr-12 lg:my-10">
            <span className="absolute right-0 top-8 h-3 w-20 bg-[#F05038]" aria-hidden="true" />

            <p className="inline-flex items-center gap-2 rounded-full bg-[#F05038] px-4 py-1.5 text-base font-bold text-[#1B2152]">
              <Icon name="pin" className="h-4 w-4" />
              Our flagship store
            </p>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl">{s.name}</h2>
            <p className="mt-2 text-lg text-white/75">{s.area}</p>
            <div className="mt-5">
              <StatusPill store={s} />
            </div>

            <dl className="mt-8 space-y-5 border-t border-white/15 pt-8">
              <Row icon="pin" label="Address">
                {s.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-1 block text-base text-white/70">{s.landmark}</span>
              </Row>
              <Row icon="clock" label="Open">
                {hoursLabel(s)}
              </Row>
              <Row icon="phone" label="Call">
                <a href={tel(s)} className="underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {s.phone}
                </a>
              </Row>
              <Row icon="mail" label="Email">
                <a href={`mailto:${s.email}`} className="break-all underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {s.email}
                </a>
              </Row>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapsDir(s)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F05038] px-7 py-3 text-lg font-bold text-[#1B2152] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get directions
                <Icon name="arrow" className="h-5 w-5" />
                <span className="sr-only"> to {s.name} (opens Google Maps)</span>
              </a>
              <a
                href={tel(s)}
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/30 px-7 py-3 text-lg font-bold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Call the store
              </a>
            </div>
          </div>

          {/* map */}
          {/* map */}
<div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-[#404898] lg:col-span-7 lg:min-h-[40rem]">
  <iframe
    title="Value Mart Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.747951659225!2d77.3543511!3d28.396679799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdde511104559%3A0xe06b5e95034285c3!2sValue%20Mart!5e0!3m2!1sen!2sin!4v1795084361299!5m2!1sen!2sin"
    loading="lazy"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
    className="absolute inset-0 h-full w-full border-0"
  />
</div>
        </div>

        {/* what is here */}
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">What you will find here</h3>
            <p className="mt-3 max-w-sm text-lg leading-relaxed text-[#1B2152]/75">
              Our biggest store carries every department under one roof.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {s.facilities.map((f) => (
                <li key={f} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-medium shadow-sm ring-1 ring-[#1B2152]/10">
                  <Icon name="check" className="h-4 w-4 stroke-[#CF3520] stroke-[3]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">How to reach us</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {s.reach.map((r, i) => (
                <li key={r.mode} className="rounded-2xl bg-white p-5 ring-1 ring-[#1B2152]/10">
                  <span className="font-display text-4xl font-bold leading-none tracking-[-0.04em] text-[#F05038]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 font-display text-xl font-bold tracking-[-0.02em]">{r.mode}</p>
                  <p className="mt-1.5 text-base leading-relaxed text-[#1B2152]/80">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
function BranchMap({ s, index }) {
  const hasEmbed = s.mapEmbed?.startsWith("https://www.google.com/maps/embed");
  if (!hasEmbed) return <MapArt index={index} />;

  return (
    <div className="relative h-44 overflow-hidden bg-[#404898]">
      <iframe
        title={`${s.name} location`}
        src={s.mapEmbed}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

function BranchCard({ s, index }) {
  return (
    <article
      id={s.id}
      className="group flex scroll-mt-8 flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-[#1B2152]/10 motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
     <BranchMap s={s} index={index} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-base font-semibold text-[#CF3520]">Branch {String(index + 2).padStart(2, "0")}</p>
        <h3 className="mt-1 font-display text-3xl font-bold leading-none tracking-[-0.035em] text-[#1B2152]">{s.name}</h3>
        <p className="mt-1.5 text-lg text-[#1B2152]/70">{s.area}</p>

        <div className="mt-4">
          <StatusPill store={s} />
        </div>

        <dl className="mt-6 space-y-4 text-[#1B2152]">
          <div className="flex gap-3">
            <Icon name="pin" className="mt-1 h-5 w-5 text-[#404898]" />
            <div>
              <dt className="sr-only">Address</dt>
              <dd className="text-lg leading-snug">
                {s.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="clock" className="mt-1 h-5 w-5 text-[#404898]" />
            <div>
              <dt className="sr-only">Open</dt>
              <dd className="text-lg leading-snug">{hoursLabel(s)}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-8 flex gap-3 pt-1 sm:mt-auto sm:pt-8">
          <a
            href={mapsDir(s)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#1B2152] px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-[#404898] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
          >
            Directions
            <Icon name="arrow" className="h-5 w-5" />
            <span className="sr-only"> to {s.name} (opens Google Maps)</span>
          </a>
          <a
            href={tel(s)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#1B2152]/20 text-[#1B2152] transition-colors hover:border-[#1B2152] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2152]"
          >
            <Icon name="phone" className="h-5 w-5" />
            <span className="sr-only">Call {s.name} on {s.phone}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function VisitUs() {
  const main = stores.find((s) => s.main);
  const others = stores.filter((s) => !s.main);

  return (
    <main>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden bg-[#1B2152] text-white">
        {/* ripples, like a location ping */}
        <div className="pointer-events-none absolute -right-40 -top-40 hidden sm:block" aria-hidden="true">
          {[0, 1, 2, 3].map((n) => (
            <span
              key={n}
              className="absolute rounded-full border border-white/10"
              style={{ width: 280 + n * 150, height: 280 + n * 150, right: -(140 + n * 75), top: -(140 + n * 75) }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Reveal>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
              Come visit us.
              <span className="block text-[#F05038]">Four doors, one welcome.</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-white/80">
              Find your nearest store, check the timings and get directions in one tap.
            </p>
          </Reveal>

          <nav aria-label="Jump to a store" className="mt-12 flex flex-wrap gap-3">
            {stores.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`inline-flex min-h-12 items-center gap-2.5 rounded-full px-5 py-2.5 text-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  s.main ? "bg-[#F05038] text-[#1B2152] hover:bg-white" : "border-2 border-white/25 text-white hover:border-white"
                }`}
              >
                <Icon name="pin" className="h-5 w-5" />
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------- main branch ---------- */}
      <MainBranch s={main} />

      {/* ---------- other branches ---------- */}
      <section className="bg-[#EEF0FA] text-[#1B2152]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="mb-10 md:mb-14">
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">Our other stores</h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-[#1B2152]/75">
              Same shelves, same fresh stock, closer to your home.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <BranchCard key={s.id} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- before you visit ---------- */}
      <section className="bg-[#1B2152] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">Before you visit</h2>
          <ul className="mt-8 grid border-t border-white/15 md:grid-cols-3">
            {tips.map((t, i) => (
              <li key={t.title} className={`border-b border-white/15 py-7 md:border-b-0 md:py-8 md:pr-8 ${i > 0 ? "md:border-l md:pl-8" : ""}`}>
                <p className="font-display text-2xl font-bold tracking-[-0.02em]">{t.title}</p>
                <p className="mt-2 max-w-xs text-lg leading-relaxed text-white/80">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}