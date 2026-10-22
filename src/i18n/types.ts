import type { SqueezeSlide } from "@/components/ui/carousel-squeeze";
import type { Theme } from "@/hooks/use-theme";

export type Lang = "ru" | "en";

export type TextGroup = "author" | "commercial";

export interface TextWork {
  id: string;
  group: TextGroup;
  /** «Пример 1» / "Sample 1". */
  label: string;
  /** Kind of text, shown above the title. */
  genre: string;
  title: string;
  task: string;
  /** Poem: one entry per line, "" marks a stanza break. Prose: one entry per paragraph. */
  body: string[];
  isPoem: boolean;
  /** «Что это показывает для коммерческих текстов». */
  takeaway?: string;
}

export interface TextsCopy {
  eyebrow: string;
  title: string;
  intro: string;
  tablist: string;
  groups: Record<TextGroup, string>;
  works: TextWork[];
  readMore: string;
  collapse: string;
  taskLabel: string;
  takeawayLabel: string;
  /** Shown on every sheet when the texts are a translation. */
  translationNote?: string;
}

export interface PathStep {
  title: string;
  text: string;
  meaning: string;
  /** Sketch from /public/works. */
  image: string;
}

/** Every piece of text on the site, in one language. */
export interface Copy {
  meta: { title: string; description: string };
  /** Wraps a quotation in the language's own quote marks. */
  quote: (text: string) => string;
  nav: {
    aria: string;
    /** Name in the logo. */
    brand: string;
    works: string;
    world: string;
    path: string;
    about: string;
    thoughts: string;
    texts: string;
    channel: string;
    /** Short code of the language the switch leads to. */
    otherLang: string;
    switchLang: string;
    /** «Тема» — prefix of the switch's label. */
    themeLabel: string;
    /** Verb for the switch: «включить» / "switch to". */
    themeSwitchTo: string;
    themeNames: Record<Theme, string>;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    quote: string;
    intro: string;
    order: string;
    viewWorks: string;
    portraitAlt: string;
  };
  works: {
    eyebrow: string;
    title: string;
    hint: string;
    label: string;
    prev: string;
    next: string;
    slides: SqueezeSlide[];
  };
  styles: {
    eyebrow: string;
    title: string;
    items: { name: string; note: string }[];
  };
  world: {
    eyebrow: string;
    title: string;
    direction: string[];
    coreLabel: string;
    core: string[];
    coreNote: string;
    formulaLabel: string;
    formula: { term: string; note: string }[];
    contrastsLabel: string;
    contrasts: { light: string; dark: string }[];
    handNote: string;
    lessonsLabel: string;
    fromWord: string;
    toWord: string;
    lessons: { from: string; to: string; note: string }[];
  };
  path: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageAltPrefix: string;
    steps: PathStep[];
    symbolsLabel: string;
    symbols: { theme: string; quotes: string[] }[];
    rubricsLabel: string;
    rubrics: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    captions: string[];
    photoAlt: string;
  };
  thoughts: {
    eyebrow: string;
    title: string;
    subtitle: string;
    latin: { la: string; translation: string }[];
    zen: { img: string; text: string }[];
  };
  texts: TextsCopy;
  order: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    steps: string[];
    cta: string;
    imageAlt: string;
  };
  footer: { name: string; copyright: string };
}
