// Small shared building blocks for the "market flyer" look.

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Faint paper texture. Drop inside a `relative isolate` section. */
export function Grain({ className = "opacity-[0.2]" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 mix-blend-multiply ${className}`}
      style={{ backgroundImage: grain }}
    />
  );
}

/** Sticker-style section label. */
export function Eyebrow({ children, tone = "dark" }) {
  const look =
    tone === "dark"
      ? "bg-brand-navy text-[#FFC93C]"
      : tone === "red"
      ? "bg-[#E63B2E] text-white"
      : "bg-[#FFC93C] text-brand-navy";
  return (
    <span
      className={`inline-block -rotate-2 rounded-md px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${look}`}
    >
      {children}
    </span>
  );
}

/** Starburst shape for "% OFF" badges. */
export function Burst({ className = "", fill = "#E63B2E", spikes = 14 }) {
  const pts = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 ? 40 : 56;
    const a = (i * Math.PI) / spikes;
    pts.push(`${(60 + r * Math.cos(a)).toFixed(1)},${(60 + r * Math.sin(a)).toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <polygon points={pts.join(" ")} fill={fill} stroke="#0A0A3C" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Gently bobbing wrapper that keeps a base tilt. */
export function Float({ r = 0, delay = "0s", className = "", children }) {
  return (
    <div
      className={`pp-f ${className}`}
      style={{ "--r": `${r}deg`, animation: `pp-float 7s ease-in-out ${delay} infinite`, transform: `rotate(${r}deg)` }}
    >
      <style>{`
        @keyframes pp-float {
          0%, 100% { transform: translateY(0) rotate(var(--r)); }
          50% { transform: translateY(-10px) rotate(calc(var(--r) + 3deg)); }
        }
        @media (prefers-reduced-motion: reduce) { .pp-f { animation: none !important; } }
      `}</style>
      {children}
    </div>
  );
}