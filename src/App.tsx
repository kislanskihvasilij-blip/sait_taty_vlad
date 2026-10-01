import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Feather,
  Flame,
  Flower2,
  Hexagon,
  MoveDown,
  PenTool,
  Send,
  Skull,
} from "lucide-react";

import { PaperDrift } from "@/components/paper-drift";
import { WorksWheel } from "@/components/ui/works-wheel";
import { CAPTIONS, CHANNEL, LATIN, STYLES, WORKS } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";

const STYLE_ICONS = [PenTool, Hexagon, Flame, Skull, Flower2, Feather];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass flex w-full max-w-[900px] items-center justify-between gap-4 !rounded-full px-5 py-2.5">
        <a href="#top" className="font-display text-lg tracking-wide text-[#d8ecf8]">
          Владислав<span className="text-[#b3122b]">.</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-[#c7d3ea] md:flex">
          <a href="#works" className="transition hover:text-white">Эскизы</a>
          <a href="#styles" className="transition hover:text-white">Стили</a>
          <a href="#about" className="transition hover:text-white">Обо мне</a>
          <a href="#thoughts" className="transition hover:text-white">Мысли</a>
        </div>
        <a href={CHANNEL} target="_blank" rel="noreferrer" className="pill flex items-center gap-2 px-4 py-1.5 text-sm font-medium">
          <Send className="size-3.5" /> Канал
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-16">
      <div aria-hidden className="blueprint-grid absolute inset-0" />
      <div aria-hidden className="spotlight absolute inset-x-0 -top-20 h-[90vh]" />
      <PaperDrift />
      <div aria-hidden className="shadow-sweep" />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 md:grid-cols-[1.15fr_1fr]">
        <div className="text-center md:text-left">
          <p className="eyebrow reveal md:!justify-start md:before:hidden">Тату-эскизы · наброски из блокнота</p>
          <h1 className="font-display text-skywash reveal mt-6 text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.95] font-medium" style={delay(120)}>
            Пустые мысли <em className="font-normal">во&nbsp;тьме</em>
          </h1>
          <p className="reveal mx-auto mt-8 max-w-[520px] font-serif text-[1.35rem] leading-snug text-[#c7d3ea] italic md:mx-0" style={delay(260)}>
            «Каждая тень здесь — непережитое чувство. Каждая тьма — чей-то вдох».
          </p>
          <p className="reveal mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-[#9da7ba] md:mx-0" style={delay(360)}>
            Владислав рисует эскизы для татуировок: трайбл, неотрайбл, тёмная ботаника и
            кресты, проросшие лилиями. Всё начинается с чернил на бежевом листе.
          </p>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-3 md:justify-start" style={delay(460)}>
            <a href={CHANNEL} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#663af3] px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(102,58,243,0.45)] transition hover:bg-[#7550f5]">
              Заказать эскиз <ArrowUpRight className="size-4" />
            </a>
            <a href="#works" className="pill flex items-center gap-2 px-6 py-3 text-sm font-medium">
              Смотреть работы <MoveDown className="size-4" />
            </a>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-[440px]" style={delay(200)}>
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(179,18,43,0.28),transparent_65%)] blur-2xl" />
          <figure className="relative overflow-hidden rounded-2xl shadow-[inset_0_1px_1px_rgba(216,236,248,0.2),0_40px_80px_-20px_rgba(0,0,0,0.9)] [animation:breathe_7s_ease-in-out_infinite]">
            <img src="/photos/red.webp" alt="Владислав — портрет в красном контровом свете" className="aspect-[4/5] w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-transparent" />
            <span aria-hidden className="grain-overlay !opacity-25 !mix-blend-overlay" />
            <figcaption className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.2em] text-[#c7d3ea] uppercase">
              @ten_sens
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Works() {
  return (
    <section id="works" className="relative">
      <div className="mx-auto max-w-[1200px] px-4 pt-[120px] text-center">
        <p className="eyebrow reveal">Flowers &amp; Sketches</p>
        <h2 className="font-display text-skywash reveal mt-5 text-[clamp(2.4rem,5vw,3.6rem)] font-medium" style={delay(120)}>
          Колесо эскизов
        </h2>
        <p className="reveal mx-auto mt-4 max-w-[560px] text-[#c7d3ea]" style={delay(220)}>
          Прокрутите колесо мышью, перетащите или листайте стрелками. Каждый лист — отдельный пост в канале.
        </p>
      </div>
      {/* Shorter on phones: the stage captures vertical drags, so leave room around it to scroll past. */}
      <div className="relative mt-6 h-[100svh] min-h-[560px] max-md:h-[76svh] max-md:min-h-[480px]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(214,199,168,0.08),transparent_70%)]" />
        <WorksWheel items={WORKS} label="Эскизы '26" action="Открыть" />
      </div>
    </section>
  );
}

function Styles() {
  return (
    <section id="styles" className="relative mx-auto max-w-[1200px] px-4 pt-[120px]">
      <p className="eyebrow reveal">Почерк</p>
      <h2 className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.5vw,3.2rem)] font-medium" style={delay(120)}>
        Стили, в которых я рисую
      </h2>
      <div className="relative mt-14 grid grid-cols-2 gap-4 md:grid-cols-6">
        <div aria-hidden className="absolute top-8 right-[8%] left-[8%] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(186,215,247,0.18),transparent)] md:block" />
        {STYLES.map((s, i) => {
          const Icon = STYLE_ICONS[i];
          return (
            <div key={s.name} className="reveal relative flex flex-col items-center text-center" style={delay(i * 90)}>
              <span className="glass relative grid size-16 place-items-center !rounded-full bg-[#05060f]">
                <Icon className="size-6 text-[#d1e4fa]" strokeWidth={1.5} />
              </span>
              <span className="mt-4 text-sm font-medium text-[#d1e4fa]">{s.name}</span>
              <span className="mt-1 text-xs text-[#9da7ba]">{s.note}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pt-[120px] md:grid-cols-2">
      <div className="reveal relative" >
        <figure className="relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9)]">
          <img src="/photos/clock.webp" alt="Владислав на ступенях под часами" className="aspect-[2/3] max-h-[720px] w-full object-cover object-top" loading="lazy" />
          <div aria-hidden className="shadow-sweep !opacity-70" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-[#05060f]/40" />
        </figure>
      </div>
      <div>
        <p className="eyebrow reveal md:!justify-start md:before:hidden">Обо мне</p>
        <h2 className="font-display text-skywash reveal mt-5 text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] font-medium" style={delay(120)}>
          Тень — это тоже линия
        </h2>
        <p className="reveal mt-6 text-[16px] leading-relaxed text-[#c7d3ea]" style={delay(200)}>
          Меня зовут Владислав. Я рисую тату-эскизы в блокноте: чёрные чернила, бежевая бумага,
          никаких лишних штрихов. Сейчас работаю над новым стилем на стыке трайбла и ботаники —
          кресты прорастают цветами, а шипы становятся стеблями.
        </p>
        <p className="reveal mt-4 text-[16px] leading-relaxed text-[#9da7ba]" style={delay(260)}>
          Мои линии не идеальны. Они дрожат, как руки, что их рисовали. И в этой дрожи — вся правда.
        </p>
        <div className="mt-10 space-y-4">
          {CAPTIONS.map((c, i) => (
            <blockquote
              key={c}
              className="reveal-paper paper-sheet lift relative rounded-[3px] px-6 py-5 font-serif text-[1.15rem] leading-snug italic"
              style={{ ...delay(i * 140), "--tilt": `${i % 2 ? 3 : -3}deg`, "--rest": `${i % 2 ? 0.6 : -0.6}deg` } as CSSProperties}
            >
              <span aria-hidden className="grain-overlay" />
              «{c}»
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Thoughts() {
  return (
    <section id="thoughts" className="relative overflow-hidden pt-[120px]">
      <div className="mx-auto max-w-[1200px] px-4">
        <p className="eyebrow reveal">#Цитаты · #Мои_Мысли</p>
        <h2 className="font-display text-skywash reveal mt-5 text-center text-[clamp(2.2rem,4.5vw,3.2rem)] font-medium" style={delay(120)}>
          Per fumum ad lucem
        </h2>
        <p className="reveal mx-auto mt-4 max-w-[560px] text-center text-[#c7d3ea]" style={delay(200)}>
          Через дым — к свету. Латынь, дзен и тишина, из которых вырастают рисунки.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LATIN.map((q, i) => (
            <article
              key={q.la}
              className="reveal-paper paper-sheet lift relative flex min-h-[220px] flex-col justify-between rounded-[3px] p-6"
              style={{ ...delay(i * 120), "--tilt": `${(i % 2 ? 1 : -1) * (3 + i)}deg`, "--rest": `${(i % 2 ? 1 : -1) * 1.2}deg` } as CSSProperties}
            >
              <span aria-hidden className="grain-overlay" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#6b5a40]">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-fraktur text-[1.7rem] leading-tight text-[#1a140e]">{q.la}</p>
              <p className="font-serif text-lg text-[#4a3b28] italic">{q.ru}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { img: "/works/w05.jpg", ru: "Карма существует, и она подобна науке. Судьба настигнет тебя, и никто не откажется от победы." },
            { img: "/works/w16.jpg", ru: "Знающий себя — просветлён; побеждающий себя — силён." },
          ].map((z, i) => (
            <figure key={z.img} className="glass reveal group relative overflow-hidden p-0" style={delay(i * 150)}>
              <img src={z.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover opacity-80 transition duration-[1.6s] group-hover:scale-105 group-hover:opacity-100" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/40 to-transparent" />
              <figcaption className="absolute inset-x-6 bottom-6 font-serif text-xl leading-snug text-[#d8ecf8] italic">
                — {z.ru}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Commission() {
  return (
    <section id="order" className="relative mx-auto max-w-[1200px] px-4 py-[120px]">
      <div className="glass reveal relative grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[360px]">
          <img src="/photos/officer.webp" alt="Образ Владислава в стиле аниме-иллюстрации" loading="lazy" className="absolute inset-0 size-full object-cover object-top" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent to-[#05060f] max-md:bg-gradient-to-t" />
        </div>
        <div className="relative p-8 md:p-12">
          <PaperDrift />
          <p className="eyebrow !justify-start before:hidden">Индивидуальный эскиз</p>
          <h2 className="font-display text-skywash mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-medium">
            Нарисую тень, <br /> которая станет вашей
          </h2>
          <ol className="mt-8 space-y-4 text-[15px] text-[#c7d3ea]">
            {[
              "Напишите в Telegram: идея, место на теле, размер.",
              "Обсуждаем образ и стиль — трайбл, ботаника, dark art.",
              "Рисую эскиз от руки и дорабатываю под вас.",
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-mono text-xs text-[#9da7ba]">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <a href={CHANNEL} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#663af3] px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(102,58,243,0.45)] transition hover:bg-[#7550f5]">
            <Send className="size-4" /> Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[rgba(186,215,247,0.08)] px-4 py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-sm text-[#9da7ba] md:flex-row">
        <span className="font-display text-base text-[#c7d3ea]">Пустые мысли во тьме 🥀</span>
        <span className="font-mono text-xs tracking-[0.15em] uppercase">© {new Date().getFullYear()} Владислав · тату-эскизы</span>
        <a href={CHANNEL} target="_blank" rel="noreferrer" className="flicker hover:text-white">t.me/ten_sens</a>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <div aria-hidden className="page-grain" />
      <Nav />
      <main>
        <Hero />
        <Works />
        <Styles />
        <About />
        <Thoughts />
        <Commission />
      </main>
      <Footer />
    </>
  );
}
