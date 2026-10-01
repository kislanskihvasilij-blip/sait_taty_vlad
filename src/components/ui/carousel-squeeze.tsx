"use client";

// Squeeze carousel: one panel gets the room, the rest are squeezed into slats
// down the right-hand side. Adapted from the original component for this site:
// - panels are sheets of grained beige paper, slats fall into shadow;
// - the open panel is capped at a share of the container width, so on a phone
//   the remaining columns never get a negative width;
// - horizontal swipe steps the strip on touch screens;
// - site fonts and the midnight palette instead of Geist and theme tokens.
import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export type SqueezeSlide = {
  /** Stable key. Falls back to the position in the array. */
  id?: string | number;
  /** The light opening line under the panels. */
  title: string;
  /** The muted sentence that runs on from the title. */
  description?: string;
  /** Picture for the panel. It crops from the middle as the panel narrows. */
  image?: string;
  /** Alt text for that picture. Leave it out and the picture reads as decoration. */
  imageAlt?: string;
  /** Any CSS background. Used when there is no picture. */
  background?: string;
  /** Sits in the corner of the open panel. */
  overlay?: ReactNode;
  /** Text on the button. No text, no button. */
  action?: string;
  /** Where the button goes. */
  href?: string;
  /** Opens the link in a new tab. */
  target?: string;
  /** Runs instead of following `href`. */
  onAction?: () => void;
};

/** A number is read as pixels; a string goes through as written. */
type Size = number | string;

const size = (value: Size) => (typeof value === "number" ? `${value}px` : value);

const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value));

/**
 * Four columns share out whatever is left once the open card, the slats and the
 * gaps are paid for. Column −1 and anything past column 3 is a slat, so a card
 * leaving the front narrows to a slat and carries on out of the left edge.
 */
const SHARES = [-0.06, 0.61, 0.3, 0.15];
const STRETCHED = [0, 0.71, 0.4, 0.25];
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];

/** Pixels a horizontal swipe has to travel before it counts as a step. */
const SWIPE = 40;

/** How dark a card gets in each column; slats sit deepest in shadow. */
const shadeOf = (col: number) => (col === 0 ? 0 : col > 0 && col < 4 ? 0.18 + col * 0.12 : 0.7);

type Card = { key: number; slide: number };

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  return reduced;
}

export type SqueezeCarouselProps = {
  slides: SqueezeSlide[];
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Height of the row. */
  height?: Size;
  /** Widest the open panel may get, as a CSS length. Default `62cqi`. */
  heroMax?: Size;
  slatWidth?: Size;
  slatGap?: Size;
  gap?: Size;
  radius?: Size;
  duration?: number;
  hoverGrow?: boolean;
  autoplay?: boolean;
  interval?: number;
  controls?: boolean;
  accent?: string;
  accentForeground?: string;
  label?: string;
  panelClassName?: string;
  /** How a picture fills its panel. `contain` keeps portrait sketches whole. Default `cover`. */
  fit?: "cover" | "contain";
} & Omit<ComponentProps<"div">, "onSelect">;

export function SqueezeCarousel({
  slides,
  defaultIndex = 0,
  onIndexChange,
  height = "clamp(260px, 42cqi, 480px)",
  heroMax = "62cqi",
  slatWidth = 8,
  slatGap = 8,
  gap = 16,
  radius = 6,
  duration = 1000,
  hoverGrow = true,
  autoplay = false,
  interval = 6000,
  controls = true,
  accent = "#663af3",
  accentForeground = "#ffffff",
  label = "Featured",
  panelClassName,
  fit = "cover",
  className,
  style,
  ...props
}: SqueezeCarouselProps) {
  const count = slides.length;
  const wrap = (i: number) => ((i % count) + count) % count;

  const slats = clamp(count - 4, 1, 3);
  const visible = 4 + slats;

  const reduced = useReducedMotion();
  const ms = reduced ? 0 : duration;

  const ids = useId();
  const seed = useRef(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const window0 = () =>
    Array.from({ length: visible }, (_, p) => ({
      key: seed.current++,
      slide: wrap(defaultIndex + p),
    }));

  const [cards, setCards] = useState<Card[]>(window0);
  const [column, setColumn] = useState(0);
  const columnRef = useRef(0);
  const forward = useRef(true);
  const [slid, setSlid] = useState(0);
  const [still, setStill] = useState(false);
  const [hover, setHover] = useState(-1);

  const open = cards[-column]?.slide ?? defaultIndex;
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // After a step the strip is longer than it needs to be: cut it back to the
  // cards on show and reset the offsets, with nothing animating on the way.
  const settle = useCallback(() => {
    setCards((strip) => (forward.current ? strip.slice(-visible) : strip.slice(0, visible)));
    columnRef.current = 0;
    setColumn(0);
    setSlid(0);
    setStill(true);
  }, [visible]);

  useLayoutEffect(() => {
    if (!still) return;
    const id = requestAnimationFrame(() => setStill(false));
    return () => cancelAnimationFrame(id);
  }, [still]);

  const step = useCallback(
    (by: number) => {
      if (count < 2 || by === 0) return;

      timers.current.forEach(clearTimeout);
      timers.current = [];
      forward.current = by > 0;

      if (by > 0) {
        setCards((strip) => [
          ...strip,
          ...Array.from({ length: by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(strip[strip.length - 1].slide + 1 + k),
          })),
        ]);
        columnRef.current -= by;
        setColumn(columnRef.current);
        setSlid((s) => s - by);
      } else {
        // Going back the strip grows at the front, which shoves everything
        // right. Slide it left by the same amount with no transition, then ease home.
        setCards((strip) => [
          ...Array.from({ length: -by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(strip[0].slide - (-by - k)),
          })),
          ...strip,
        ]);
        setSlid((s) => s + by);
        setStill(true);
        timers.current.push(window.setTimeout(() => setSlid(0), 0));
      }

      timers.current.push(window.setTimeout(settle, ms + 20));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, ms, settle],
  );

  useEffect(() => {
    onIndexChange?.(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || paused || reduced || count < 2) return;
    const timer = window.setTimeout(() => step(1), interval);
    return () => clearTimeout(timer);
  }, [autoplay, paused, reduced, count, open, interval, step]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number | undefined> = { ArrowRight: 1, ArrowLeft: -1 };
    const by = moves[event.key];
    if (by === undefined) return;
    event.preventDefault();
    step(by);
  };

  if (!count) return null;

  const slat = size(slatWidth);
  const shares = hoverGrow && hover >= 0 && hover <= 3 && !reduced ? null : SHARES;

  const shareOf = (col: number) => {
    if (shares) return SHARES[col];
    return hover === col ? STRETCHED[col] : SQUEEZED[col];
  };

  const widthOf = (col: number) => {
    if (col < 0 || col > 3) return slat;
    if (col === 0) return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
    return `calc(var(--sq-room) * ${shareOf(col)})`;
  };

  const vars = {
    "--sq-h": size(height),
    "--sq-gap": size(gap),
    "--sq-slat-gap": size(slatGap),
    "--sq-radius": size(radius),
    "--sq-ms": `${ms}ms`,
    "--sq-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
    "--sq-fill": accent,
    "--sq-on-fill": accentForeground,
    // 16:9 of the row height, but never so wide that the other columns starve.
    "--sq-hero": `min(calc(var(--sq-h) * 16 / 9), ${size(heroMax)})`,
    "--sq-room": `calc(100cqi - var(--sq-hero) - ${slats} * var(--sq-slat-gap) - 3 * var(--sq-gap) - ${slats} * ${slat})`,
  } as CSSProperties;

  const move = `translateX(calc(${slid} * (${slat} + var(--sq-gap))))`;

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      style={{ containerType: "inline-size", ...vars, ...style }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHover(-1);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      {...props}
    >
      {controls && count > 1 && (
        <div className="mb-4 flex justify-end gap-2">
          <Arrow back label="Назад" onClick={() => step(-1)} />
          <Arrow label="Вперёд" onClick={() => step(1)} />
        </div>
      )}

      <div
        className="w-full touch-pan-y overflow-hidden"
        style={{ height: "var(--sq-h)" }}
        onTouchStart={(event) => {
          const t = event.touches[0];
          swipe.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(event) => {
          const from = swipe.current;
          swipe.current = null;
          if (!from) return;
          const t = event.changedTouches[0];
          const dx = t.clientX - from.x;
          const dy = t.clientY - from.y;
          if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy)) return;
          step(dx < 0 ? 1 : -1);
        }}
      >
        <div
          role="tablist"
          aria-label={label}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="flex h-full w-max"
          style={{
            transform: move,
            transition: still ? "none" : `transform var(--sq-ms) var(--sq-ease)`,
          }}
        >
          {cards.map((card, place) => {
            const col = place + column;
            const slide = slides[card.slide];
            const front = col === 0;

            return (
              <button
                key={card.key}
                type="button"
                role="tab"
                id={`${ids}-tab-${card.key}`}
                aria-selected={front}
                aria-controls={`${ids}-panel`}
                aria-label={slide.title}
                tabIndex={front ? 0 : -1}
                onMouseMove={() => hoverGrow && setHover(col)}
                onClick={() => col > 0 && step(col)}
                className={cn(
                  "paper-sheet relative isolate h-full shrink-0 cursor-pointer overflow-hidden p-0",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--sq-fill)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]",
                  panelClassName,
                )}
                style={{
                  width: widthOf(col),
                  marginLeft: place === 0 ? 0 : col < 4 ? "var(--sq-gap)" : "var(--sq-slat-gap)",
                  borderRadius: `min(var(--sq-radius), calc(${widthOf(col)} / 2))`,
                  transitionProperty: "width, margin-left",
                  transitionDuration: still ? "0s" : "var(--sq-ms)",
                  transitionTimingFunction: "var(--sq-ease)",
                }}
              >
                {/* The sketch sits on the sheet with a narrow paper margin. */}
                <span className="absolute inset-[3.5%] overflow-hidden rounded-[2px]">
                  <Picture slide={slide} fit={fit} />
                </span>
                <span aria-hidden className="grain-overlay" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[#05060f]"
                  style={{
                    opacity: shadeOf(col),
                    transition: `opacity var(--sq-ms) var(--sq-ease)`,
                  }}
                />

                {slide.overlay && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-4 pt-16 @lg:p-6 @lg:pt-20"
                    style={{
                      opacity: front ? 1 : 0,
                      transition: `opacity var(--sq-ms) var(--sq-ease)`,
                      backgroundImage: "linear-gradient(to top, rgb(5 6 15 / 0.75), transparent)",
                    }}
                  >
                    {slide.overlay}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${ids}-panel`} role="tabpanel" aria-live="polite" className="mt-6 grid @xl:mt-7">
        {slides.map((slide, i) => {
          const shown = i === open;

          return (
            <div
              key={slide.id ?? i}
              aria-hidden={!shown}
              className="col-start-1 row-start-1 flex flex-col gap-4 @xl:flex-row @xl:items-start @xl:justify-between @xl:gap-10"
              style={{
                opacity: shown ? 1 : 0,
                visibility: shown ? "visible" : "hidden",
                pointerEvents: shown ? "auto" : "none",
                transition: `opacity var(--sq-ms) var(--sq-ease), visibility var(--sq-ms)`,
              }}
            >
              <p className="max-w-[46rem] text-[15px] leading-[1.6] text-balance @lg:text-[17px]">
                <span className="text-[#d8ecf8]">{slide.title}</span>{" "}
                {slide.description && <span className="text-[#9da7ba]">{slide.description}</span>}
              </p>

              {slide.action && <Action slide={slide} shown={shown} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Drawn at a fixed block and centred, never at the width of its card, so the
 * picture keeps one scale while the card only changes how much of it shows.
 */
function Picture({ slide, fit }: { slide: SqueezeSlide; fit: "cover" | "contain" }) {
  const box = { width: "var(--sq-hero)", minWidth: "100%" } as const;

  if (slide.image) {
    return (
      <img
        src={slide.image}
        alt={slide.imageAlt ?? ""}
        draggable={false}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-y-0 left-1/2 h-full max-w-none -translate-x-1/2",
          fit === "contain" ? "object-contain" : "object-cover",
        )}
        style={box}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-1/2 -translate-x-1/2"
      style={{ background: slide.background, ...box }}
    />
  );
}

function Arrow({ back = false, label, onClick }: { back?: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pill grid size-10 cursor-pointer place-items-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--sq-fill)]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path
          d={
            back
              ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
              : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
          }
        />
      </svg>
    </button>
  );
}

function Action({ slide, shown }: { slide: SqueezeSlide; shown: boolean }) {
  const inside = (
    <>
      {slide.action}
      <svg
        width="6"
        height="9"
        viewBox="0 0 6 9"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/sq-action:translate-x-0.5"
      >
        <path d="M1.2 1 4.7 4.5 1.2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  const dress = cn(
    "group/sq-action inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-full",
    "bg-[var(--sq-fill)] px-5 py-2.5 text-sm font-medium text-[var(--sq-on-fill)]",
    "shadow-[0_0_24px_rgba(102,58,243,0.4)] transition-opacity hover:opacity-85 outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--sq-fill)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]",
  );

  if (slide.href) {
    return (
      <a
        href={slide.href}
        target={slide.target}
        rel={slide.target === "_blank" ? "noopener noreferrer" : undefined}
        tabIndex={shown ? 0 : -1}
        onClick={slide.onAction}
        className={dress}
      >
        {inside}
      </a>
    );
  }

  return (
    <button type="button" tabIndex={shown ? 0 : -1} onClick={slide.onAction} className={dress}>
      {inside}
    </button>
  );
}

export default SqueezeCarousel;
