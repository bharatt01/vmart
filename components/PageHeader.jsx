import stickers from "./Stickers";

// Title block for inner pages. Pass sticker names to decorate it.
export default function PageHeader({ title, text, decor = ["tomato", "orange"] }) {
  return (
    <div className="bg-dots relative overflow-hidden bg-brand-blue text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h1
          className="max-w-3xl font-display font-extrabold leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)" }}
        >
          {title}
        </h1>
        {text && <p className="mt-5 max-w-xl text-lg text-white/85">{text}</p>}
      </div>
      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 md:block">
        {decor.map((k, i) => {
          const S = stickers[k];
          return (
            <S
              key={k}
              className={`h-auto ${i === 0 ? "w-40 rotate-12" : "-ml-6 -mt-4 w-32 -rotate-12"} ${
                i === 0 ? "" : "relative"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
