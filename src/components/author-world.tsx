import type { CSSProperties } from "react";
import { MoveRight } from "lucide-react";

import { CONTRASTS, CORE, DIRECTION, FORMULA, LESSONS } from "@/data/dossier";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** «Авторский мир»: direction, the formula of the style and its contrasts. */
export function AuthorWorld() {
  return (
    <section id="world" className="relative mx-auto max-w-[1200px] px-4 pt-[120px]">
      <p className="eyebrow reveal">Досье авторского мира</p>
      <h2
        className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.8vw,3.6rem)] leading-[1.05] font-medium"
        style={delay(120)}
      >
        То, что растёт в темноте
      </h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-5 text-[16px] leading-relaxed text-[#c7d3ea]">
          {DIRECTION.map((p, i) => (
            <p key={i} className="reveal" style={delay(160 + i * 90)}>
              {p}
            </p>
          ))}
        </div>
        <div className="reveal glass p-6 sm:p-8" style={delay(260)}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#9da7ba] uppercase">Ядро проекта</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {CORE.map((item) => (
              <li
                key={item}
                className="rounded-md bg-[rgba(199,211,234,0.08)] px-3 py-1.5 text-[13px] text-[#d1e4fa] shadow-[inset_0_0_0_1px_rgba(186,215,247,0.1)]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-serif text-lg leading-snug text-[#e9dfcb] italic">
            Тёмная эстетика — это не просто «много чёрного». Она работает, когда есть контраст.
          </p>
        </div>
      </div>

      <Formula />
      <Contrasts />
      <Lessons />
    </section>
  );
}

function Formula() {
  return (
    <div className="mt-24">
      <p className="reveal text-center font-mono text-[11px] tracking-[0.2em] text-[#9da7ba] uppercase">
        Формула, которая повторяется
      </p>
      <ol className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0">
        {FORMULA.map((f, i) => (
          <li key={f.term} className="relative flex items-stretch">
            {i > 0 && (
              <span
                aria-hidden
                className="font-display absolute top-1/2 -left-3 z-10 hidden -translate-x-1/2 -translate-y-1/2 text-4xl text-[#d6c7a8] md:block"
              >
                +
              </span>
            )}
            <div
              className="reveal-paper paper-sheet relative flex w-full flex-col justify-between rounded-[3px] p-5 md:mx-3 md:min-h-[180px]"
              style={{ ...delay(i * 130), "--tilt": `${i % 2 ? 4 : -4}deg`, "--rest": `${i % 2 ? 0.8 : -0.8}deg` } as CSSProperties}
            >
              <span aria-hidden className="grain-overlay" />
              <span className="font-mono text-[11px] text-[#6b5a40]">0{i + 1}</span>
              <span className="mt-6 font-serif text-[1.9rem] leading-none text-[#1a140e] italic">{f.term}</span>
              <span className="mt-3 text-[13px] leading-snug text-[#4a3b28]">{f.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Contrasts() {
  return (
    <div className="mt-20">
      <p className="reveal text-center font-mono text-[11px] tracking-[0.2em] text-[#9da7ba] uppercase">
        Напряжение · наведите тень
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CONTRASTS.map((c, i) => (
          <div
            key={c.dark}
            tabIndex={0}
            className="contrast-tile reveal group relative grid h-[120px] grid-cols-2 overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#663af3]"
            style={delay(i * 90)}
          >
            <span className="paper-sheet relative grid place-items-center px-3 text-center font-serif text-[1.35rem] leading-tight text-[#1a140e] italic">
              <span aria-hidden className="grain-overlay" />
              {c.light}
            </span>
            <span className="relative grid place-items-center bg-[#0b0a0c] px-3 text-center font-serif text-[1.35rem] leading-tight text-[#e9dfcb] italic">
              {c.dark}
            </span>
            {/* The cast shadow that crosses the tile on hover/focus. */}
            <span aria-hidden className="contrast-shadow" />
          </div>
        ))}
      </div>
      <p className="reveal mx-auto mt-8 max-w-[620px] text-center text-[15px] leading-relaxed text-[#9da7ba]">
        Я не боюсь сохранить след руки: слишком стерильная чистота убирает характер. Задача — сделать линию
        увереннее, но не убить её живость.
      </p>
    </div>
  );
}

function Lessons() {
  return (
    <div className="mt-24">
      <p className="reveal text-center font-mono text-[11px] tracking-[0.2em] text-[#9da7ba] uppercase">
        Чему я учусь
      </p>
      <ul className="mx-auto mt-8 max-w-[860px] divide-y divide-[rgba(186,215,247,0.08)]">
        {LESSONS.map((l, i) => (
          <li key={l.from} className="reveal grid gap-2 py-5 md:grid-cols-[1fr_1.3fr] md:gap-8" style={delay(i * 80)}>
            <p className="flex flex-wrap items-center gap-x-2 font-serif text-[1.3rem] leading-tight">
              <span className="text-[#9da7ba]">От {l.from}</span>
              <MoveRight className="size-4 shrink-0 text-[#b3122b]" />
              <span className="text-[#e9dfcb]">к {l.to}</span>
            </p>
            <p className="text-[15px] leading-relaxed text-[#c7d3ea]">{l.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
