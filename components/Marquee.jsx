function Spark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
    </svg>
  );
}

// A looping ticker. The second copy is hidden from screen readers.
export default function Marquee({ items, reverse = false, speed = 40, className = "" }) {
  const list = [...items, ...items];
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {list.map((t, i) => (
        <li key={i} className="flex items-center gap-5 whitespace-nowrap pr-5">
          <span>{t}</span>
          <Spark />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
