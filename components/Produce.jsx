// Bold, flat "cut paper" produce. Pure SVG, no photos needed.
// Each piece is 200x200 and takes a className for size / rotation.

export function Tomato({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="114" r="78" fill="#C42B20" />
      <circle cx="93" cy="106" r="74" fill="#E63B2E" />
      <ellipse cx="66" cy="82" rx="15" ry="8" transform="rotate(-38 66 82)" fill="#fff" opacity="0.35" />
      <path
        d="M100 54 L108 32 L120 52 L142 46 L128 64 L148 76 L122 74 L112 94 L100 76 L88 94 L78 74 L52 76 L72 64 L58 46 L80 52 L92 32Z"
        fill="#1F8A4C"
      />
      <rect x="96" y="22" width="8" height="28" rx="4" fill="#176B3A" />
    </svg>
  );
}

export function Orange({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="86" fill="#F28C0F" />
      <circle cx="100" cy="100" r="74" fill="#FFB627" />
      <g stroke="#FFE7A3" strokeWidth="5" strokeLinecap="round">
        {[0, 45, 90, 135].map((a) => (
          <line key={a} x1="100" y1="34" x2="100" y2="166" transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
      <circle cx="100" cy="100" r="74" fill="none" stroke="#FFE7A3" strokeWidth="4" />
      <circle cx="100" cy="100" r="8" fill="#FFF3C9" />
    </svg>
  );
}

export function Chilli({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M36 152 C70 154 122 132 150 72 C158 54 178 54 174 70 C166 124 110 182 36 172 Z"
        fill="#D7261E"
      />
      <path d="M52 152 C92 150 132 120 156 76" stroke="#FF6A5C" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M150 72 C152 54 164 44 178 48" stroke="#1F8A4C" strokeWidth="9" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Leaf({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path d="M100 192 C38 152 28 70 100 12 C172 70 162 152 100 192Z" fill="#2E9E5B" />
      <path d="M100 192 C70 150 66 80 100 12 C80 80 100 150 100 192Z" fill="#1F7F46" opacity="0.55" />
      <g stroke="#1B6B3A" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M100 188 L100 36" />
        <path d="M100 120 L136 92M100 150 L142 124M100 92 L130 70" />
        <path d="M100 120 L64 92M100 150 L58 124M100 92 L70 70" />
      </g>
    </svg>
  );
}

export function Carrot({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path d="M100 52 C70 34 62 12 74 6 C92 12 100 30 100 52Z" fill="#2E9E5B" />
      <path d="M100 52 C100 26 108 8 100 2 C92 8 100 26 100 52Z" fill="#1F8A4C" />
      <path d="M100 52 C130 34 138 12 126 6 C108 12 100 30 100 52Z" fill="#2E9E5B" />
      <path d="M62 58 C62 44 138 44 138 58 L110 178 C106 194 94 194 90 178 Z" fill="#F4731C" />
      <g stroke="#C95510" strokeWidth="4" strokeLinecap="round">
        <path d="M78 82h22M104 110h20M86 132h16M96 158h8" />
      </g>
    </svg>
  );
}

export function Onion({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path d="M100 26 C152 82 178 122 152 162 C132 192 68 192 48 162 C22 122 48 82 100 26Z" fill="#8E2F5B" />
      <path d="M100 26 C140 86 162 124 142 160 C126 184 80 186 66 168 C94 160 126 110 100 26Z" fill="#A63D6B" />
      <g stroke="#E7A3C0" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M100 34 C78 90 74 142 92 184" />
        <path d="M100 34 C120 90 128 140 112 184" />
      </g>
      <path d="M100 26 C96 14 104 8 108 2" stroke="#6B8E3A" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const produce = { tomato: Tomato, orange: Orange, chilli: Chilli, leaf: Leaf, carrot: Carrot, onion: Onion };
export default produce;