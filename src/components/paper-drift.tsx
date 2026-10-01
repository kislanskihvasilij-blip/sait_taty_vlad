import type { CSSProperties } from "react";

// Beige grained sheets tumbling slowly through the dark. Values are fixed rather
// than random so server and client render the same thing.
const SHEETS = [
  { left: "6%", w: 90, dur: 26, delay: -4, dx: 80, o: 0.6, r0: -14, r1: 18, r2: -8 },
  { left: "18%", w: 54, dur: 31, delay: -18, dx: -40, o: 0.4, r0: 8, r1: -22, r2: 6 },
  { left: "34%", w: 70, dur: 24, delay: -10, dx: 60, o: 0.35, r0: -6, r1: 14, r2: -12 },
  { left: "62%", w: 110, dur: 34, delay: -2, dx: -90, o: 0.5, r0: 12, r1: -10, r2: 16 },
  { left: "78%", w: 60, dur: 28, delay: -22, dx: 50, o: 0.55, r0: -20, r1: 8, r2: -4 },
  { left: "90%", w: 80, dur: 36, delay: -12, dx: -70, o: 0.4, r0: 4, r1: -16, r2: 10 },
];

export function PaperDrift() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden [perspective:900px]">
      {SHEETS.map((s, i) => (
        <span
          key={i}
          className="drift-sheet paper-sheet"
          style={
            {
              left: s.left,
              width: s.w,
              height: s.w * 1.32,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
              "--dx": `${s.dx}px`,
              "--o": s.o,
              "--r0": `${s.r0}deg`,
              "--r1": `${s.r1}deg`,
              "--r2": `${s.r2}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
