"use client";

import { useEffect, useState } from "react";
import { site, hourLabel } from "../app/lib/site";

// Shows "Open now" or "Closed" using India time, whatever the visitor's clock says.
// tone="dark" is for use on the blue/navy sections.
export default function OpenStatus({ className = "", tone = "light" }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const check = () => {
      const hour =
        Number(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
          }).format(new Date())
        ) % 24;
      setOpen(hour >= site.open && hour < site.close);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  const dark = tone === "dark";
  const base = "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold";

  if (open === null) {
    return (
      <p className={`${base} ${dark ? "bg-white/10 text-white" : "bg-mist"} ${className}`}>
        {site.hours}
      </p>
    );
  }

  const style = dark
    ? open
      ? "bg-white/10 text-white"
      : "bg-white/10 text-sun"
    : open
    ? "bg-emerald-50 text-emerald-800"
    : "bg-brand-orange/10 text-brand-orange-dark";

  return (
    <p className={`${base} ${style} ${className}`}>
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-400" : "bg-brand-orange"}`}
      />
      {open
        ? `Open now, closes at ${hourLabel(site.close)}`
        : `Closed now, opens at ${hourLabel(site.open)}`}
    </p>
  );
}
