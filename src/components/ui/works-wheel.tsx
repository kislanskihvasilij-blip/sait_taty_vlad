"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
//
// Local change: each card is dressed as a sheet of grained beige paper with a
// soft cast shadow, and the shadow deepens as a sheet turns away from the front.
import * as React from "react";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card. Cards here are portrait (sketchbook pages), so the ratio is
   below 1 and the cap is on height. */
const CARD_H = 0.5; // front card height, of the stage
const CARD_MAX_W = 0.42; // ... but never wider than this much of the stage
const CARD_RATIO = 0.78; // card width / height
const STEP = 34; // degrees between cards on the drum
const DRUM = 1.9; // drum radius, in card heights - and everything below likewise
const LENS = 2.6; // perspective distance
const RING_R = 0.62; // ring radius
const BOW = 1.4;
const TITLE = 0.11; // ring label and front-card title
const INDEX = 0.032; // the index down the right-hand side
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(cardH * TITLE, 22),
      index: Math.max(cardH * INDEX, 11),
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
          // Sheets turned away from the front fall into shadow.
          card.style.setProperty(
            "--shade",
            String(clamp(Math.abs(d) * 0.55 * m, 0, 0.85)),
          );
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const drag = React.useRef<number | null>(null);
  const dragged = React.useRef(0);
  const settling = React.useRef(0);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#c7d3ea]/40 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          dragged.current = 0;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const delta = drag.current - event.clientY;
          dragged.current += Math.abs(delta);
          to(target.current + delta / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onClickCapture={(event) => {
          // A drag that ends over a card shouldn't follow its link.
          if (dragged.current > 6) event.preventDefault();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <Tag
                key={item.title + i}
                id={`works-wheel-${i}`}
                role="option"
                aria-selected={i === active}
                href={item.href}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noreferrer" : undefined}
                draggable={false}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                className="group absolute [backface-visibility:hidden]"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <span className="paper-sheet relative block size-full overflow-hidden rounded-[3px] p-[5%]">
                  <span className="relative block size-full overflow-hidden rounded-[2px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      loading="lazy"
                      className="size-full object-cover [filter:sepia(.18)_contrast(1.04)]"
                    />
                  </span>
                  <span aria-hidden className="grain-overlay" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[#05060f] transition-none"
                    style={{ opacity: "var(--shade, 0)" }}
                  />
                  {action && item.href ? (
                    <span className="pointer-events-none absolute right-[7%] bottom-[7%] flex translate-y-1 items-center gap-1 rounded-full bg-[#05060f]/80 px-2.5 py-1 text-[0.7rem] text-[#d1e4fa] opacity-0 shadow-[inset_0_0_0_1px_rgba(186,215,247,0.12)] backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                        <path
                          d="M3 9 9 3M4 3h5v5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {action}
                    </span>
                  ) : null}
                </span>
              </Tag>
            );
          })}
        </div>
      </div>

      <div
        ref={labelRef}
        className="font-display text-skywash pointer-events-none absolute inset-0 grid place-items-center text-center tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="font-serif pointer-events-none absolute top-1/2 left-[5%] max-w-[22%] -translate-y-1/2 leading-[1.05] text-[#d8ecf8] italic opacity-0 max-md:top-[8%] max-md:max-w-[80%] max-md:translate-y-0"
        style={{ fontSize: metrics.title * 0.62 }}
      >
        {items[active]?.title}
      </div>

      <ol
        className="absolute top-[7.5%] right-[2.5%] text-right leading-[1.8] text-[#9da7ba] max-md:hidden"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title + i}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "cursor-pointer font-mono tracking-[0.08em] uppercase transition-colors outline-none hover:text-[#d1e4fa] focus-visible:outline-1",
                i === active && "text-[#d8ecf8]",
              )}
            >
              {String(i + 1).padStart(2, "0")} · {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
