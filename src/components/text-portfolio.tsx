import { useId, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ChevronDown, Feather, Megaphone } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  TEXT_GROUPS,
  TEXT_WORKS,
  TEXTS_INTRO,
  type TextGroup,
  type TextWork,
} from "@/data/texts";

const GROUP_ICONS: Record<TextGroup, typeof Feather> = {
  author: Feather,
  commercial: Megaphone,
};

/** Bodies longer than this many entries start folded under a fade. */
const FOLD_AFTER = 18;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The text portfolio: an index of works on the left and a sheet of paper on
 * the right that the chosen text is set on. Switching works lays a fresh sheet
 * down out of the shadow.
 */
export function TextPortfolio() {
  const [activeId, setActiveId] = useState(TEXT_WORKS[0].id);
  const ids = useId();
  const active = TEXT_WORKS.find((w) => w.id === activeId) ?? TEXT_WORKS[0];
  const index = TEXT_WORKS.indexOf(active);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number | undefined> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    const by = moves[event.key];
    if (by === undefined) return;
    event.preventDefault();
    const next = TEXT_WORKS[(index + by + TEXT_WORKS.length) % TEXT_WORKS.length];
    setActiveId(next.id);
    document.getElementById(`${ids}-tab-${next.id}`)?.focus();
  };

  return (
    <section id="texts" className="relative mx-auto max-w-[1200px] px-4 pt-[120px]">
      <p className="eyebrow reveal">Тексты · стихи · копирайтинг</p>
      <h2
        className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] font-medium"
        style={delay(120)}
      >
        Слова, написанные тенью
      </h2>
      <p className="reveal mx-auto mt-5 max-w-[640px] text-center leading-relaxed text-[#c7d3ea]" style={delay(200)}>
        {TEXTS_INTRO}
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
        <div
          role="tablist"
          aria-label="Текстовые работы"
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
          className="reveal flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:sticky lg:top-28 lg:flex-col lg:self-start lg:overflow-visible lg:pb-0"
          style={delay(260)}
        >
          {(Object.keys(TEXT_GROUPS) as TextGroup[]).map((group) => (
            <IndexGroup
              key={group}
              group={group}
              activeId={active.id}
              ids={ids}
              onSelect={setActiveId}
            />
          ))}
        </div>

        <div id={`${ids}-panel`} role="tabpanel" aria-labelledby={`${ids}-tab-${active.id}`} className="min-w-0">
          <Sheet key={active.id} work={active} />
        </div>
      </div>
    </section>
  );
}

function IndexGroup({
  group,
  activeId,
  ids,
  onSelect,
}: {
  group: TextGroup;
  activeId: string;
  ids: string;
  onSelect: (id: string) => void;
}) {
  const Icon = GROUP_ICONS[group];
  const works = TEXT_WORKS.filter((w) => w.group === group);

  return (
    <div className="contents lg:block">
      <p className="hidden items-center gap-2 px-1 pb-3 font-mono text-[11px] tracking-[0.18em] text-[#9da7ba] uppercase lg:flex [&:not(:first-child)]:mt-6">
        <Icon className="size-3.5" strokeWidth={1.5} /> {TEXT_GROUPS[group]}
      </p>
      {works.map((work) => {
        const selected = work.id === activeId;
        return (
          <button
            key={work.id}
            id={`${ids}-tab-${work.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${ids}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(work.id)}
            className={cn(
              "group relative flex min-h-12 w-[220px] shrink-0 cursor-pointer flex-col items-start rounded-xl px-4 py-3 text-left transition outline-none lg:mb-1.5 lg:w-full",
              "focus-visible:ring-2 focus-visible:ring-[#663af3]",
              selected
                ? "bg-[rgba(214,199,168,0.1)] shadow-[inset_0_0_0_1px_rgba(214,199,168,0.28)]"
                : "shadow-[inset_0_0_0_1px_rgba(186,215,247,0.08)] hover:bg-[rgba(186,214,247,0.05)]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-3 bottom-3 left-0 w-[2px] rounded-full bg-[#d6c7a8] transition-opacity",
                selected ? "opacity-100" : "opacity-0",
              )}
            />
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#9da7ba] uppercase">
              {work.label} · {work.genre}
            </span>
            <span
              className={cn(
                "mt-1 line-clamp-2 font-serif text-[1.15rem] leading-tight transition-colors",
                selected ? "text-[#e9dfcb]" : "text-[#c7d3ea] group-hover:text-[#d8ecf8]",
              )}
            >
              {work.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Sheet({ work }: { work: TextWork }) {
  const foldable = work.body.length > FOLD_AFTER;
  const [isOpen, setIsOpen] = useState(!foldable);
  const isSlogan = work.body.length === 1 && !work.isPoem;

  return (
    <article className="sheet-in paper-sheet relative overflow-hidden rounded-[3px] px-6 py-10 sm:px-12 sm:py-14">
      <span aria-hidden className="grain-overlay" />
      {/* Faint ruled margin, as on a notebook page. */}
      <span aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-[rgba(179,18,43,0.18)] sm:left-8" />

      <header className="relative">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#6b5a40] uppercase">
          {work.label} · {work.genre}
        </p>
        <h3
          className={cn(
            "mt-3 font-serif leading-[1.05] text-[#1a140e]",
            isSlogan ? "text-[clamp(1.9rem,4vw,3rem)]" : "text-[clamp(1.9rem,3.6vw,2.8rem)]",
            work.isPoem && "italic",
          )}
        >
          {work.isPoem ? `«${work.title}»` : work.title}
        </h3>
      </header>

      <div className="relative mt-8">
        <div
          className={cn(
            "relative overflow-hidden transition-[max-height] duration-700 ease-out",
            isOpen ? "max-h-[6000px]" : "max-h-[460px]",
          )}
        >
          <Body work={work} isSlogan={isSlogan} />
          {!isOpen && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#e9dfcb] to-transparent"
            />
          )}
        </div>
        {foldable && (
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#1a140e] px-5 py-2.5 text-sm font-medium text-[#e9dfcb] transition hover:bg-[#2a2118]"
          >
            {isOpen ? "Свернуть" : "Читать целиком"}
            <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
          </button>
        )}
      </div>

      <footer className="relative mt-10 grid gap-6 border-t border-dashed border-[rgba(80,60,30,0.3)] pt-8 md:grid-cols-2">
        <Note title="Задача">{work.task}</Note>
        {work.takeaway && <Note title="Что это показывает для коммерческих текстов">{work.takeaway}</Note>}
      </footer>
    </article>
  );
}

function Body({ work, isSlogan }: { work: TextWork; isSlogan: boolean }) {
  if (isSlogan) {
    return <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] text-[#4a3b28] italic">{work.body[0]}</p>;
  }

  if (!work.isPoem) {
    return (
      <div className="max-w-[62ch] space-y-3 text-[15.5px] leading-[1.75] text-[#2a2118] sm:text-[16.5px]">
        {work.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  // Poem: stanzas separated by "" entries.
  const stanzas = work.body.reduce<string[][]>(
    (acc, line) => (line === "" ? [...acc, []] : [...acc.slice(0, -1), [...acc[acc.length - 1], line]]),
    [[]],
  );

  return (
    <div className="space-y-6 font-serif text-[1.2rem] leading-[1.55] text-[#2a2118] sm:text-[1.32rem]">
      {stanzas.map((stanza, i) => (
        <p key={i}>
          {stanza.map((line, j) => (
            <span key={j} className="block">
              {line}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function Note({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.2em] text-[#8a2a2a] uppercase">{title}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-[#4a3b28]">{children}</p>
    </div>
  );
}
