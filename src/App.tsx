import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Feather,
  Flame,
  Flower2,
  Hexagon,
  Moon,
  MoveDown,
  PenTool,
  Send,
  Skull,
} from "lucide-react";

import { AuthorWorld } from "@/components/author-world";
import { PaperDrift } from "@/components/paper-drift";
import { TextPortfolio } from "@/components/text-portfolio";
import { WorkPath } from "@/components/work-path";
import { SqueezeCarousel } from "@/components/ui/carousel-squeeze";
import { CHANNEL, PROFILE } from "@/data/links";
import { useReveal } from "@/hooks/use-reveal";
import { useTheme } from "@/hooks/use-theme";
import { useCopy, useLang } from "@/i18n/lang";

const STYLE_ICONS = [PenTool, Hexagon, Flame, Skull, Flower2, Feather];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const SECTION_LINKS = ["works", "world", "path", "about", "thoughts", "texts"] as const;
/** The phone menu has room for five; «Мысли» is reachable by scrolling. */
const MOBILE_LINKS = ["works", "world", "path", "about", "texts"] as const;

const CTA =
  "flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(var(--accent-rgb),0.45)] transition hover:bg-accent-hover";

function Switches() {
  const { nav } = useCopy();
  const { toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const isBloom = theme === "bloom";
  const ThemeIcon = isBloom ? Moon : Flower2;
  const themeLabel = isBloom ? nav.themeToShadow : nav.themeToBloom;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLang}
        aria-label={nav.switchLang}
        title={nav.switchLang}
        className="pill grid min-h-10 min-w-10 cursor-pointer place-items-center px-2.5 font-mono text-xs tracking-[0.12em]"
      >
        {nav.otherLang}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        aria-pressed={isBloom}
        title={themeLabel}
        className="pill grid size-10 cursor-pointer place-items-center"
      >
        <ThemeIcon className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  );
}

function Nav() {
  const { nav } = useCopy();
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label={nav.aria} className="glass flex w-full max-w-[960px] flex-wrap items-center justify-between gap-x-4 gap-y-1 !rounded-[22px] px-5 py-2.5 lg:!rounded-full">
        <a href="#top" className="font-display text-lg tracking-wide text-ice">
          {nav.brand}<span className="text-blood">.</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-mist lg:flex">
          {SECTION_LINKS.map((id) => (
            <a key={id} href={`#${id}`} className="transition hover:text-white">{nav[id]}</a>
          ))}
        </div>
        <div className="order-last flex w-full justify-between pb-1 text-[12.5px] text-mist lg:hidden">
          {MOBILE_LINKS.map((id) => (
            <a key={id} href={`#${id}`} className="py-1.5">{nav[id]}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Switches />
          <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="pill flex min-h-10 items-center gap-2 px-4 py-2 text-sm font-medium max-sm:hidden">
            <Send className="size-3.5" /> {nav.channel}
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const { hero } = useCopy();
  return (
    <section id="top" className="relative flex min-h-screen min-h-[100svh] items-center overflow-hidden px-4 pt-32 pb-16">
      <div aria-hidden className="blueprint-grid absolute inset-0" />
      <div aria-hidden className="spotlight absolute inset-x-0 -top-20 h-[90vh]" />
      <PaperDrift />
      <div aria-hidden className="shadow-sweep" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 md:grid-cols-[1.15fr_1fr]">
        <div className="text-center md:text-left">
          <p className="eyebrow reveal md:!justify-start md:before:hidden">{hero.eyebrow}</p>
          <h1 className="font-display text-skywash reveal mt-6 text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.95] font-medium" style={delay(120)}>
            {hero.titleA} <em className="font-normal">{hero.titleB}</em>
          </h1>
          <p className="reveal mx-auto mt-8 max-w-[520px] font-serif text-[1.35rem] leading-snug text-mist italic md:mx-0" style={delay(260)}>
            {hero.quote}
          </p>
          <p className="reveal mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-fog md:mx-0" style={delay(360)}>
            {hero.intro}
          </p>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-3 md:justify-start" style={delay(460)}>
            <a href={PROFILE} target="_blank" rel="noopener noreferrer" className={CTA}>
              {hero.order} <ArrowUpRight className="size-4" />
            </a>
            <a href="#works" className="pill flex items-center gap-2 px-6 py-3 text-sm font-medium">
              {hero.viewWorks} <MoveDown className="size-4" />
            </a>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-[440px]" style={delay(200)}>
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(var(--blood-rgb),0.28),transparent_65%)] blur-2xl" />
          <figure className="breathe relative overflow-hidden rounded-2xl shadow-[inset_0_1px_1px_rgba(var(--hair-rgb),0.2),0_40px_80px_-20px_rgba(0,0,0,0.9)]">
            <img src="/photos/red.webp" alt={hero.portraitAlt} width={1086} height={1448} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent" />
            <span aria-hidden className="grain-overlay !opacity-25 !mix-blend-overlay" />
            <figcaption className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.2em] text-mist uppercase">
              @ten_sens
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Works() {
  const { works } = useCopy();
  return (
    <section id="works" className="relative mx-auto max-w-[1200px] px-4 pt-[120px]">
      <div className="text-center">
        <p className="eyebrow reveal">{works.eyebrow}</p>
        <h2 className="font-display text-skywash reveal mt-5 text-[clamp(2.4rem,5vw,3.6rem)] font-medium" style={delay(120)}>
          {works.title}
        </h2>
        <p className="reveal mx-auto mt-4 max-w-[560px] text-mist" style={delay(220)}>
          {works.hint}
        </p>
      </div>
      <div className="reveal relative mt-12" style={delay(300)}>
        <div aria-hidden className="pointer-events-none absolute -inset-x-10 -inset-y-16 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(var(--paper-rgb),0.07),transparent_70%)]" />
        <SqueezeCarousel
          slides={works.slides}
          label={works.label}
          prevLabel={works.prev}
          nextLabel={works.next}
          fit="contain"
          gap={14}
          radius={4}
        />
      </div>
    </section>
  );
}

function Styles() {
  const { styles } = useCopy();
  return (
    <section id="styles" className="relative mx-auto max-w-[1200px] px-4 pt-[120px]">
      <p className="eyebrow reveal">{styles.eyebrow}</p>
      <h2 className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.5vw,3.2rem)] font-medium" style={delay(120)}>
        {styles.title}
      </h2>
      <div className="relative mt-14 grid grid-cols-2 gap-4 md:grid-cols-6">
        <div aria-hidden className="absolute top-8 right-[8%] left-[8%] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(var(--hair-rgb),0.18),transparent)] md:block" />
        {styles.items.map((s, i) => {
          const Icon = STYLE_ICONS[i];
          return (
            <div key={s.name} className="reveal relative flex flex-col items-center text-center" style={delay(i * 90)}>
              <span className="glass relative grid size-16 place-items-center !rounded-full bg-canvas">
                <Icon className="size-6 text-frost" strokeWidth={1.5} />
              </span>
              <span className="mt-4 text-sm font-medium text-frost">{s.name}</span>
              <span className="mt-1 text-xs text-fog">{s.note}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  const { about, quote } = useCopy();
  return (
    <section id="about" className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pt-[120px] md:grid-cols-2">
      <div className="reveal relative">
        <figure className="relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9)]">
          <img src="/photos/clock.webp" alt={about.photoAlt} width={1024} height={1536} className="aspect-[2/3] max-h-[720px] w-full object-cover object-top" loading="lazy" />
          <div aria-hidden className="shadow-sweep !opacity-70" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/40" />
        </figure>
      </div>
      <div>
        <p className="eyebrow reveal md:!justify-start md:before:hidden">{about.eyebrow}</p>
        <h2 className="font-display text-skywash reveal mt-5 text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] font-medium" style={delay(120)}>
          {about.title}
        </h2>
        <p className="reveal mt-6 text-[16px] leading-relaxed text-mist" style={delay(200)}>
          {about.paragraphs[0]}
        </p>
        <p className="reveal mt-4 text-[16px] leading-relaxed text-fog" style={delay(260)}>
          {about.paragraphs[1]}
        </p>
        <div className="mt-10 space-y-4">
          {about.captions.map((c, i) => (
            <blockquote
              key={c}
              className="reveal-paper paper-sheet lift relative rounded-[3px] px-6 py-5 font-serif text-[1.15rem] leading-snug italic"
              style={{ ...delay(i * 140), "--tilt": `${i % 2 ? 3 : -3}deg`, "--rest": `${i % 2 ? 0.6 : -0.6}deg` } as CSSProperties}
            >
              <span aria-hidden className="grain-overlay" />
              {quote(c)}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Thoughts() {
  const { thoughts } = useCopy();
  return (
    <section id="thoughts" className="relative overflow-hidden pt-[120px]">
      <div className="mx-auto max-w-[1200px] px-4">
        <p className="eyebrow reveal">{thoughts.eyebrow}</p>
        <h2 className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.5vw,3.2rem)] font-medium" style={delay(120)}>
          {thoughts.title}
        </h2>
        <p className="reveal mx-auto mt-4 max-w-[560px] text-center text-mist" style={delay(200)}>
          {thoughts.subtitle}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {thoughts.latin.map((q, i) => (
            <article
              key={q.la}
              className="reveal-paper paper-sheet lift relative flex min-h-[220px] flex-col justify-between rounded-[3px] p-6"
              style={{ ...delay(i * 120), "--tilt": `${(i % 2 ? 1 : -1) * (3 + i)}deg`, "--rest": `${(i % 2 ? 1 : -1) * 1.2}deg` } as CSSProperties}
            >
              <span aria-hidden className="grain-overlay" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-fraktur text-[1.7rem] leading-tight text-ink">{q.la}</p>
              <p className="font-serif text-lg text-ink-soft italic">{q.translation}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {thoughts.zen.map((z, i) => (
            <figure key={z.img} className="glass reveal group relative overflow-hidden p-0" style={delay(i * 150)}>
              <img src={z.img} alt="" width={800} height={800} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover opacity-80 transition duration-[1.6s] group-hover:scale-105 group-hover:opacity-100" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-4 font-serif text-base leading-snug text-ice italic sm:inset-x-6 sm:bottom-6 sm:text-xl">
                — {z.text}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Commission() {
  const { order } = useCopy();
  return (
    <section id="order" className="relative mx-auto max-w-[1200px] px-4 py-[120px]">
      <div className="glass reveal relative grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[360px]">
          <img src="/photos/officer.webp" alt={order.imageAlt} width={533} height={800} loading="lazy" className="absolute inset-0 size-full object-cover object-top" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent to-canvas max-md:bg-gradient-to-t" />
        </div>
        <div className="relative p-8 md:p-12">
          <p className="eyebrow !justify-start before:hidden">{order.eyebrow}</p>
          <h2 className="font-display text-skywash mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-medium">
            {order.titleA} <br /> {order.titleB}
          </h2>
          <ol className="mt-8 space-y-4 text-[15px] text-mist">
            {order.steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-mono text-xs text-fog">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <a href={PROFILE} target="_blank" rel="noopener noreferrer" className={`mt-10 inline-flex ${CTA}`}>
            <Send className="size-4" /> {order.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { footer } = useCopy();
  return (
    <footer className="border-t border-[rgba(var(--hair-rgb),0.08)] px-4 py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-sm text-fog md:flex-row">
        <span className="font-display text-base text-mist">{footer.name}</span>
        <span className="font-mono text-xs tracking-[0.15em] uppercase">© {new Date().getFullYear()} {footer.copyright}</span>
        <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="flicker inline-block py-3 hover:text-white">@DraculaVMP</a>
      </div>
    </footer>
  );
}

export default function App() {
  const { lang } = useLang();
  useReveal(lang);
  return (
    <>
      <div aria-hidden className="page-grain" />
      <Nav />
      <main>
        <Hero />
        <Works />
        <Styles />
        <AuthorWorld />
        <WorkPath />
        <About />
        <Thoughts />
        <TextPortfolio />
        <Commission />
      </main>
      <Footer />
    </>
  );
}
