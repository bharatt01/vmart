"use client";

import { useEffect, useRef, useState } from "react";

/** Fades and slides an element up the first time it scrolls into view. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Card that tilts toward the cursor and catches a moving highlight. */
export function Tilt({ className = "", max = 7, children }) {
  const ref = useRef(null);

  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-(y - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`group relative transform-gpu transition-transform duration-200 ease-out motion-reduce:transform-none ${className}`}
      style={{ transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(18rem circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.2), transparent 60%)",
        }}
      />
    </div>
  );
}

/** Counts a number up from 0 when it scrolls into view. */
export function CountUp({ to, duration = 1000 }) {
  const ref = useRef(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    const target = Number(to) || 0;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    setN(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}

/** Vertical rail that fills with colour as you scroll through its parent. */
export function ScrollRail({ className = "" }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const on = () => {
      const r = el.getBoundingClientRect();
      const v = (window.innerHeight * 0.65 - r.top) / r.height;
      setP(Math.min(1, Math.max(0, v)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <span ref={ref} aria-hidden="true" className={`absolute w-px bg-brand-navy/10 ${className}`}>
      <span
        className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-brand-orange to-brand-orange/60 shadow-[0_0_12px_rgba(249,115,22,0.7)]"
        style={{ height: `${p * 100}%` }}
      />
    </span>
  );
}