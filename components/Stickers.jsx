import { useId } from "react";

// Die-cut "sticker" illustrations: flat shapes + a white outline and soft shadow.
// All drawn in code, so they stay sharp at any size and need no image files.
export function Sticker({ children, className = "", title }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <defs>
        <filter id={id} x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="grow" />
          <feGaussianBlur in="grow" stdDeviation="1.6" result="soft" />
          <feComponentTransfer in="soft" result="round">
            <feFuncA type="linear" slope="14" intercept="-3" />
          </feComponentTransfer>
          <feFlood floodColor="#ffffff" result="white" />
          <feComposite in="white" in2="round" operator="in" result="outline" />
          <feDropShadow in="outline" dx="0" dy="4" stdDeviation="3.5" floodColor="#0b0b4f" floodOpacity="0.28" result="shadowed" />
          <feMerge>
            <feMergeNode in="shadowed" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
}

const leaf = "#2fa34a";
const leafDark = "#1f7d38";

export const stickers = {
  orange: (p) => (
    <Sticker {...p}>
      <circle cx="60" cy="66" r="38" fill="#ff8a1f" />
      <ellipse cx="46" cy="52" rx="10" ry="6" fill="#ffb15c" transform="rotate(-30 46 52)" />
      <g fill="#e66f0a">
        <circle cx="68" cy="78" r="1.8" /><circle cx="78" cy="68" r="1.8" />
        <circle cx="58" cy="86" r="1.8" /><circle cx="80" cy="84" r="1.8" />
        <circle cx="48" cy="72" r="1.8" />
      </g>
      <path d="M60 30 q2 -10 9 -14 q1 9 -5 15z" fill={leaf} />
      <circle cx="60" cy="30" r="3" fill={leafDark} />
    </Sticker>
  ),
  tomato: (p) => (
    <Sticker {...p}>
      <path d="M60 36 C90 30 106 50 100 74 C94 98 72 104 60 104 C48 104 26 98 20 74 C14 50 30 30 60 36Z" fill="#ec3a2c" />
      <ellipse cx="42" cy="56" rx="9" ry="5.5" fill="#f77a6e" transform="rotate(-35 42 56)" />
      <path d="M60 40 L50 30 L58 34 L60 22 L64 34 L72 28 L66 40 L78 42 L66 46 L70 54 L60 48 L50 54 L54 46 L42 42Z" fill={leaf} />
    </Sticker>
  ),
  carrot: (p) => (
    <Sticker {...p}>
      <path d="M36 44 C44 36 58 38 66 46 L98 92 C100 98 94 102 88 98 L40 66 C32 60 30 50 36 44Z" fill="#ff7a1a" transform="rotate(-8 60 70)" />
      <g stroke="#d9610a" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-8 60 70)">
        <path d="M48 52 l8 2" /><path d="M56 62 l9 3" /><path d="M66 74 l8 3" /><path d="M76 86 l6 2" />
      </g>
      <g fill={leaf}>
        <path d="M44 42 C36 28 38 20 44 14 C50 22 50 32 44 42Z" />
        <path d="M52 40 C52 26 58 18 66 16 C66 26 62 34 52 40Z" />
        <path d="M38 46 C28 38 24 30 26 24 C34 28 40 36 38 46Z" />
      </g>
    </Sticker>
  ),
  milk: (p) => (
    <Sticker {...p}>
      <path d="M36 44 L60 22 L84 44 L84 100 Q84 104 80 104 L40 104 Q36 104 36 100Z" fill="#1a1aa6" />
      <path d="M36 44 L60 22 L84 44 L60 52Z" fill="#3a3ad0" />
      <rect x="44" y="60" width="32" height="30" rx="5" fill="#fff" />
      <path d="M60 64 C66 72 68 76 68 79 a8 8 0 0 1 -16 0 C52 76 54 72 60 64Z" fill="#2c6bff" />
      <rect x="36" y="44" width="48" height="4" fill="#ffd23f" />
    </Sticker>
  ),
  bread: (p) => (
    <Sticker {...p}>
      <path d="M26 62 C20 44 34 30 60 30 C86 30 100 44 94 62 L92 96 Q92 102 86 102 L34 102 Q28 102 28 96Z" fill="#e8a64a" />
      <path d="M26 62 C20 44 34 30 60 30 C86 30 100 44 94 62 C80 54 40 54 26 62Z" fill="#f2bd68" />
      <g stroke="#c27d22" strokeWidth="3.5" strokeLinecap="round">
        <path d="M44 42 l6 12" /><path d="M60 40 l6 12" /><path d="M76 42 l-2 11" />
      </g>
    </Sticker>
  ),
  berries: (p) => (
    <Sticker {...p}>
      <circle cx="44" cy="72" r="22" fill="#2b2ec9" />
      <circle cx="76" cy="70" r="22" fill="#1a1aa6" />
      <circle cx="60" cy="48" r="22" fill="#3a3dde" />
      <g fill="#0f0f6e">
        <path d="M60 42 l4 6 l-4 4 l-4 -4z" />
        <path d="M44 66 l4 6 l-4 4 l-4 -4z" />
        <path d="M76 64 l4 6 l-4 4 l-4 -4z" />
      </g>
      <ellipse cx="52" cy="38" rx="6" ry="3.5" fill="#7a7cf0" transform="rotate(-30 52 38)" />
      <path d="M62 24 q4 -10 14 -10 q-2 10 -14 10z" fill={leaf} />
    </Sticker>
  ),
  sack: (p) => (
    <Sticker {...p}>
      <path d="M42 30 L78 30 L74 42 C96 50 100 76 96 94 Q95 102 88 102 L32 102 Q25 102 24 94 C20 76 24 50 46 42Z" fill="#f4d9a0" />
      <path d="M42 30 L78 30 L74 42 L46 42Z" fill="#e2bd78" />
      <rect x="38" y="56" width="44" height="30" rx="4" fill="#f2502d" />
      <path d="M46 71 q7 -9 14 0 q7 9 14 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M44 33 h32" stroke="#c9a05a" strokeWidth="3" />
    </Sticker>
  ),
  oil: (p) => (
    <Sticker {...p}>
      <rect x="50" y="16" width="20" height="14" rx="3" fill="#1a1aa6" />
      <path d="M52 30 L68 30 L70 44 C86 50 90 62 90 76 L90 98 Q90 104 84 104 L36 104 Q30 104 30 98 L30 76 C30 62 34 50 50 44Z" fill="#ffc933" />
      <rect x="38" y="62" width="44" height="30" rx="4" fill="#fff" />
      <path d="M60 67 C66 75 68 79 68 82 a8 8 0 0 1 -16 0 C52 79 54 75 60 67Z" fill="#ffb300" />
      <ellipse cx="40" cy="54" rx="3" ry="8" fill="#ffe38a" />
    </Sticker>
  ),
  cookie: (p) => (
    <Sticker {...p}>
      <circle cx="60" cy="62" r="40" fill="#d9954b" />
      <circle cx="60" cy="62" r="40" fill="none" stroke="#c07a33" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <g fill="#5a3418">
        <ellipse cx="46" cy="50" rx="6" ry="5" /><ellipse cx="74" cy="46" rx="5" ry="4.5" />
        <ellipse cx="62" cy="68" rx="6.5" ry="5" /><ellipse cx="42" cy="78" rx="5" ry="4.5" />
        <ellipse cx="80" cy="76" rx="5.5" ry="4.5" />
      </g>
    </Sticker>
  ),
  bottle: (p) => (
    <Sticker {...p}>
      <rect x="48" y="14" width="26" height="12" rx="3" fill="#f2502d" />
      <path d="M52 26 L70 26 L72 38 C88 42 92 54 92 64 L92 98 Q92 104 86 104 L36 104 Q30 104 30 98 L30 64 C30 54 34 42 50 38Z" fill="#35c3f3" />
      <rect x="38" y="58" width="46" height="32" rx="5" fill="#fff" />
      <g fill="#35c3f3"><circle cx="52" cy="74" r="6" /><circle cx="66" cy="70" r="4" /><circle cx="72" cy="80" r="5" /></g>
      <ellipse cx="40" cy="48" rx="3" ry="7" fill="#9be3fa" />
    </Sticker>
  ),
  peas: (p) => (
    <Sticker {...p}>
      <path d="M22 70 C22 40 54 24 98 40 C98 80 62 100 22 70Z" fill="#46b85a" />
      <path d="M22 70 C46 66 78 56 98 40" stroke="#2c8a40" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill="#8fe29f" stroke="#2c8a40" strokeWidth="2"><circle cx="42" cy="62" r="8" /><circle cx="62" cy="56" r="9" /><circle cx="82" cy="48" r="8" /></g>
      <path d="M22 70 q-8 4 -12 14" stroke="#2c8a40" strokeWidth="4" fill="none" strokeLinecap="round" />
    </Sticker>
  ),
};

export default stickers;
