import { useId } from "react";
import { site, hourLabel } from "../app/lib/site";

// A spinning round badge with the opening hours in the middle.
export default function Badge({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const r = 77;
  const circ = Math.round(2 * Math.PI * r);
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <circle cx="100" cy="100" r="98" fill="#ffd23f" />
        <defs>
          <path id={id} d={`M100 100 m-${r} 0 a${r} ${r} 0 1 1 ${r * 2} 0 a${r} ${r} 0 1 1 -${r * 2} 0`} />
        </defs>
        <text fontSize="15" fontWeight="700" fill="#0b0b4f" className="font-display">
          <textPath href={`#${id}`} textLength={circ - 6} lengthAdjust="spacing">
            fresh every morning • open every day • 
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center font-display font-extrabold leading-none text-brand-navy">
        <div>
          <p className="text-xl md:text-2xl">{hourLabel(site.open)}</p>
          <p className="my-0.5 text-xs font-semibold">to</p>
          <p className="text-xl md:text-2xl">{hourLabel(site.close)}</p>
        </div>
      </div>
    </div>
  );
}
