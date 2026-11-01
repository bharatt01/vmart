import { reasons } from "../app/lib/data";
import { Reveal } from "./Motion";
import { Grain, Eyebrow } from "./Paper";
import { Leaf, Tomato, Orange, Carrot, Onion, Chilli } from "./Produce";

const art = [Tomato, Leaf, Orange, Carrot, Onion, Chilli];
const looks = [
  { card: "bg-[#FFC93C] text-brand-navy", tilt: "md:-rotate-1" },
  { card: "bg-[#E63B2E] text-white", tilt: "md:rotate-1" },
  { card: "bg-[#1F8A4C] text-white", tilt: "md:-rotate-1" },
];

export default function WhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8EC]">
      <Grain className="opacity-[0.12]" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="red">Why shop with us</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1] tracking-[-0.04em] text-brand-navy sm:text-6xl">
            A small store that{" "}
            <span className="bg-[linear-gradient(transparent_60%,#FFC93C_60%)] px-1">does the basics well.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 md:mt-16 md:grid-cols-3 md:gap-6">
          {reasons.map((r, i) => {
            const Art = art[i % art.length];
            const look = looks[i % looks.length];
            return (
              <Reveal as="li" key={r.title} delay={i * 120}>
                <div
                  className={`group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-3xl border-2 border-brand-navy p-7 shadow-[7px_8px_0_0_var(--color-brand-navy)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[9px_12px_0_0_var(--color-brand-navy)] sm:p-8 ${look.card} ${look.tilt}`}
                >
                  <span className="font-display text-7xl font-bold leading-none tracking-[-0.05em] opacity-25">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="relative mt-6 max-w-[14rem] font-display text-2xl font-bold leading-tight tracking-tight">
                    {r.title}
                  </h3>
                  <p className="relative mt-3 max-w-[16rem] font-medium leading-relaxed opacity-90">{r.text}</p>

                  <div className="pointer-events-none absolute -bottom-6 -right-6 w-36 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 sm:w-40">
                    <Art className="h-auto w-full rotate-12 drop-shadow-[5px_6px_0_rgba(10,10,60,0.25)]" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}