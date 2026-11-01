/* Brand colours sampled from the logo
   red #F05038   blue #404898   ink #1B2152   mist #F2F3FA

   Cards stack on top of each other as you scroll (pure CSS, no JavaScript).
   TODO: check each promise is true for the client before publishing.
   TODO: if your site header is sticky, raise STICKY_TOP so the cards sit just below it. */

const STICKY_TOP = 5; // rem

const promises = [
  {
    title: "The price you see is the price you pay.",
    body: "Every item is marked on the shelf, so there are no surprises at the counter.",
    card: "bg-[#404898] text-white",
    chip: "bg-white text-[#404898]",
  },
  {
    title: "Fresh stock, every morning.",
    body: "New vegetables and dairy arrive each morning, so what you pick up is fresh.",
    card: "bg-[#F05038] text-[#1B2152]",
    chip: "bg-[#1B2152] text-white",
  },
  {
    title: "Open every day, 7am to 10pm.",
    body: "Stop by on your way to work or on your way home. Your weekly shop fits around your day.",
    card: "bg-white text-[#1B2152] ring-2 ring-inset ring-[#1B2152]/15",
    chip: "bg-[#F05038] text-[#1B2152]",
  },
];

export default function PromiseStack() {
  return (
    <section className="bg-[#F2F3FA] text-[#1B2152]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="mb-10 font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl md:mb-14">
          Three promises, kept every day.
        </h2>

        <ol className="pb-4">
          {promises.map((p, i) => (
            <li
              key={p.title}
              className="sticky mb-6 last:mb-0"
              style={{ top: `${STICKY_TOP + i * 1}rem` }}
            >
              <article
                className={`grid min-h-[18rem] content-between gap-10 rounded-[2rem] p-7 shadow-xl shadow-[#1B2152]/15 sm:min-h-[22rem] sm:p-12 md:grid-cols-12 ${p.card}`}
              >
                <h3
                  className="font-display font-bold leading-[1.02] tracking-[-0.035em] md:col-span-8"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
                >
                  {p.title}
                </h3>

                <div className="flex flex-col justify-between gap-6 md:col-span-4">
                  <span
                    className={`w-fit rounded-full px-4 py-1.5 text-base font-bold ${p.chip}`}
                  >
                    Promise {i + 1} of {promises.length}
                  </span>
                  <p className="text-xl font-bold leading-snug">{p.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}