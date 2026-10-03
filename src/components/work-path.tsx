import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { PATH, RUBRICS, SYMBOLS, type PathStep } from "@/data/dossier";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** «Путь»: the sketches in the order the style grew, then the symbolism behind them. */
export function WorkPath() {
  return (
    <section id="path" className="relative mx-auto max-w-[1200px] px-4 pt-[120px]">
      <p className="eyebrow reveal">Визуальный архив</p>
      <h2
        className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] font-medium"
        style={delay(120)}
      >
        Путь: от наброска к языку
      </h2>
      <p className="reveal mx-auto mt-4 max-w-[600px] text-center text-[#c7d3ea]" style={delay(200)}>
        Стиль не нужно придумывать насильно — его можно обнаруживать через серию работ.
      </p>

      <ol className="relative mt-16">
        {/* The spine of the timeline: left on phones, centred on desktop. */}
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-[15px] w-px bg-[linear-gradient(to_bottom,transparent,rgba(214,199,168,0.35)_8%,rgba(214,199,168,0.35)_92%,transparent)] md:left-1/2"
        />
        {PATH.map((step, i) => (
          <Step key={step.title} step={step} index={i} />
        ))}
      </ol>

      <Symbolism />
    </section>
  );
}

function Step({ step, index }: { step: PathStep; index: number }) {
  const isRight = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="relative grid grid-cols-[minmax(0,1fr)] gap-6 pb-14 pl-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:pl-0">
      <span
        aria-hidden
        className="absolute top-2 left-[9px] grid size-[13px] place-items-center rounded-full bg-[#05060f] shadow-[0_0_0_1px_rgba(214,199,168,0.6),0_0_18px_rgba(214,199,168,0.35)] md:left-1/2 md:-translate-x-1/2"
      >
        <span className="size-[5px] rounded-full bg-[#d6c7a8]" />
      </span>

      <div className={cn("reveal md:pt-0", isRight ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right")} style={delay(80)}>
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#9da7ba] uppercase">{number}</p>
        <h3 className="mt-2 font-serif text-[1.8rem] leading-tight text-[#e9dfcb]">{step.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#c7d3ea]">{step.text}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[#9da7ba] italic">{step.meaning}</p>
      </div>

      <div className={cn(isRight ? "md:order-1 md:pr-4" : "md:pl-4")}>
        <figure
          className="reveal-paper paper-sheet lift relative mx-auto w-full max-w-[340px] rounded-[3px] p-3"
          style={{ ...delay(160), "--tilt": `${isRight ? 5 : -5}deg`, "--rest": `${isRight ? 1.2 : -1.2}deg` } as CSSProperties}
        >
          <img
            src={step.image}
            alt={`Эскиз: ${step.title}`}
            width={600}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[2px] object-cover"
          />
          <span aria-hidden className="grain-overlay" />
        </figure>
      </div>
    </li>
  );
}

function Symbolism() {
  return (
    <div className="mt-10">
      <p className="reveal text-center font-mono text-[11px] tracking-[0.2em] text-[#9da7ba] uppercase">
        Цитаты и символика
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {SYMBOLS.map((group, g) => (
          <div key={group.theme} className="reveal glass p-6" style={delay(g * 120)}>
            <h3 className="font-serif text-[1.5rem] text-[#e9dfcb]">{group.theme}</h3>
            <ul className="mt-5 space-y-3">
              {group.quotes.map((q, i) => (
                <li
                  key={q}
                  className="reveal-paper paper-sheet relative rounded-[3px] px-4 py-3 font-serif text-[1.08rem] leading-snug text-[#1a140e] italic"
                  style={{ ...delay(g * 120 + i * 90), "--tilt": `${i % 2 ? 2 : -2}deg`, "--rest": `${i % 2 ? 0.4 : -0.4}deg` } as CSSProperties}
                >
                  <span aria-hidden className="grain-overlay" />«{q}»
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="reveal mt-10 flex flex-wrap items-center justify-center gap-2 text-[13px] text-[#9da7ba]">
        Рубрики канала:
        {RUBRICS.map((r) => (
          <span key={r} className="rounded-full px-3 py-1 text-[#c7d3ea] shadow-[inset_0_0_0_1px_rgba(186,215,247,0.14)]">
            {r}
          </span>
        ))}
      </p>
    </div>
  );
}
