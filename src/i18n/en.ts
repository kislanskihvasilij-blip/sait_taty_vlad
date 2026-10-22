import type { SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { post } from "@/data/links";

import { textsEn } from "./texts-en";
import type { Copy } from "./types";

const sketch = (
  id: string,
  title: string,
  description: string,
  file: string,
  postId: number,
): SqueezeSlide => ({
  id,
  title,
  description,
  image: `/works/${file}.webp`,
  imageAlt: `Sketch “${title}”`,
  action: "Open post",
  href: post(postId),
  target: "_blank",
});

export const en: Copy = {
  meta: {
    title: "Vladislav — original tattoo sketches: Tribal, Neotribal, dark botany",
    description:
      "Original tattoo sketches by Vladislav: Tribal, Neotribal, Cyber Tribal, Dark Art and dark botany. Sketchbook drawings, poems and custom designs to order.",
  },
  quote: (text) => `“${text}”`,
  nav: {
    aria: "Main menu",
    brand: "Vladislav",
    works: "Sketches",
    world: "Style",
    path: "Path",
    about: "About",
    thoughts: "Thoughts",
    texts: "Texts",
    channel: "Channel",
    otherLang: "RU",
    switchLang: "Переключить на русский",
    themeLabel: "Theme",
    themeSwitchTo: "switch to",
    themeNames: { shadow: "Shadow", bloom: "Bloom", velvet: "Crimson Velvet" },
  },
  hero: {
    eyebrow: "Tattoo sketches · from the sketchbook",
    titleA: "Empty thoughts",
    titleB: "in the dark",
    quote: "“Every shadow here is an unlived feeling. Every darkness is someone's breath.”",
    intro:
      "I'm Vladislav. I draw tattoo sketches: Tribal, Neotribal, dark botany and crosses overgrown with lilies. It all starts with ink on a beige page.",
    order: "Order a sketch",
    viewWorks: "See the work",
    portraitAlt: "Vladislav — portrait in red rim light",
  },
  works: {
    eyebrow: "Flowers & Sketches",
    title: "Notebook sketches",
    hint: "Use the arrows or swipe. Tap a folded sheet to open it. Each sketch is its own post in the channel.",
    label: "Vladislav's sketches",
    prev: "Previous",
    next: "Next",
    slides: [
      sketch("buddha", "Smoke and Buddha.", "Cutting away not for austerity, but for clarity: a Buddha's outline, a thread of smoke, soft light.", "w04", 37),
      sketch("lilies", "Lilies.", "My lines aren't perfect. They tremble like the hands that drew them — and in that tremor lies the whole truth.", "w06", 41),
      sketch("moon-cross", "Moon Cross.", "Working on a new style: Neotribal and Cyber Tribal from the sketchbook.", "w08", 48),
      sketch("thorn-cross", "Thorn Cross.", "Thorns that turn into stems. Dark Art in pure black.", "w09", 48),
      sketch("neotribal", "Neotribal.", "Tribal, reimagined: heavy shapes and sharp endings.", "w10", 48),
      sketch("lily-blade", "Lily and Blade.", "An experiment in a new style: botany growing through Tribal.", "w11", 51),
      sketch("star-cross", "Star Cross.", "While work comes slowly, I keep developing the style. Soon every drawing will get its own caption.", "w12", 52),
      sketch("loved", "What I Loved.", "I started drawing what I loved. I ended with what I wanted to turn away from.", "w13", 53),
      sketch("form", "Held in Form.", "I thought I had locked him into a form. It turned out he was holding me inside.", "w14", 54),
      sketch("arrow", "Arrow and Roots.", "The arrow pierced her through. But instead of breaking, she grew roots around the wound.", "w15", 55),
      sketch("koi", "Koi and Lotus.", "Longing… what do you know about a fish that strives for a lotus in the sky?", "w17", 57),
      sketch("last-bloom", "The Last Bloom.", "What if death isn't the end of blooming, but its final form?", "w18", 58),
    ],
  },
  styles: {
    eyebrow: "Handwriting",
    title: "The styles I draw in",
    items: [
      { name: "Tribal", note: "Sharp lines, pure black" },
      { name: "Neotribal", note: "Tribal, reimagined" },
      { name: "Cyber Tribal", note: "Cold geometry of thorns" },
      { name: "Dark Art", note: "Darkness as material" },
      { name: "My Botany", note: "Lilies, roses, lotuses" },
      { name: "Dark Academic", note: "Latin, candles, silence" },
    ],
  },
  world: {
    eyebrow: "Dossier of an author's world",
    title: "What grows in the dark",
    direction: [
      "My main direction is Tribal, Neotribal and Cyber Tribal, with a strong pull toward botany. Flowers, leaves, stems, thorns, curls and organic shapes become the basis of the ornament.",
      "I care about more than how it looks. More and more, my work carries a story or a metaphor: a flower held within a limit, a plant inside geometry, growth around a wound, a flower among celestial signs.",
      "The second line is text. I write thoughts, poems and short phrases, so an image isn't built as “a picture here, a caption there”, but as one pair: image + thought.",
    ],
    coreLabel: "Core of the project",
    core: [
      "botany",
      "Tribal / Neotribal",
      "ink · liner · sketchbook",
      "dark symbolism",
      "organic + geometry",
      "growth, wounds, borders, darkness, form",
      "my own thoughts and poems",
    ],
    coreNote: "Dark aesthetics isn't just “a lot of black”. It works when there is contrast.",
    formulaLabel: "The formula that keeps returning",
    formula: [
      { term: "plant", note: "a living, imperfect flower shape" },
      { term: "ornament", note: "Tribal curls, thorns and black masses" },
      { term: "geometry", note: "a cross, a frame, an arrow, an axis or a symbol" },
      { term: "story", note: "the metaphor everything is drawn for" },
    ],
    contrastsLabel: "Tension · move the shadow",
    contrasts: [
      { light: "empty", dark: "dense" },
      { light: "alive", dark: "rigid" },
      { light: "soft", dark: "sharp" },
      { light: "the light field of the page", dark: "the heavy mass of ink" },
    ],
    handNote:
      "I'm not afraid to keep the trace of the hand: sterile cleanliness kills character. The goal is to make the line more confident without killing its life.",
    lessonsLabel: "What I'm learning",
    fromWord: "From",
    toWord: "to",
    lessons: [
      { from: "copying", to: "a language of my own", note: "Take apart why someone else's solution works, then build mine from my own elements." },
      { from: "details", to: "silhouette", note: "Remove the inner lines and the object should still read." },
      { from: "even weight", to: "hierarchy", note: "Different line weight and density create depth and lead the eye." },
      { from: "random complexity", to: "meaningful complexity", note: "A drawing isn't good for its number of details, but because they all serve one idea." },
      { from: "one piece", to: "a series", note: "A style becomes visible when themes and techniques repeat." },
    ],
  },
  path: {
    eyebrow: "Visual archive",
    title: "Path: from sketch to language",
    subtitle: "You don't have to force a style — you can discover it through a series of works.",
    imageAltPrefix: "Sketch: ",
    steps: [
      {
        title: "Early sketch",
        text: "One of my first attempts at Tribal: a flower, a central geometry, curls, and an attempt to build the organic into a decorative structure.",
        meaning: "Point A — everything after is worth comparing to it.",
        image: "/works/w11.webp",
      },
      {
        title: "Flowers in the sketchbook",
        text: "A calm botanical study of several flowers — observing a real plant form.",
        meaning: "The foundation: stylisation convinces when you can feel an understanding of nature behind it.",
        image: "/works/w06.webp",
      },
      {
        title: "Cross, ornament and branching",
        text: "Symmetry, an axis, a central crossing and decorative branches.",
        meaning: "Thinking not only in flowers, but in signs and ornament.",
        image: "/works/w08.webp",
      },
      {
        title: "Geometry + botany",
        text: "Cross geometry, decorative elements and a flower brought into one composition.",
        meaning: "The strongest move — the collision of the rigid and the living.",
        image: "/works/w18.webp",
      },
      {
        title: "Flower and the heavens",
        text: "A flower, a moon, stars, clouds and a dark atmosphere — “a flower that grew up to the heavens and bore fruit for the dark”.",
        meaning: "One of the richest pieces in symbolism.",
        image: "/works/w13.webp",
      },
      {
        title: "Form and flower",
        text: "Geometry, dotted construction lines and a living flower: a rigid scheme against an organic object.",
        meaning: "“I thought I had locked him into a form. It turned out he was holding me inside.”",
        image: "/works/w14.webp",
      },
      {
        title: "Rose with an arrow",
        text: "It was meant to be just a rose. Then the arrow came, and thorny growth around the wound.",
        meaning: "The arrow is trauma, the rose is life, the growth around the wound is what you lived through becoming part of you. Idea first, form second.",
        image: "/works/w15.webp",
      },
    ],
    symbolsLabel: "Quotes and symbolism",
    symbols: [
      {
        theme: "Rose with an arrow",
        quotes: [
          "She didn't pull the arrow out. She grew around it.",
          "What once wounded her became, in time, part of her stem.",
          "The arrow left a wound. The rose turned it into roots.",
          "She bloomed not in spite of the pain. She bloomed from it.",
          "Some wounds never heal. They become part of who we are becoming.",
        ],
      },
      {
        theme: "Borders and form",
        quotes: [
          "I built him borders, and he learned to grow through them.",
          "Even a flower looks for a crack when it's left no room to grow.",
          "The living tries to grow where there was never a place for it.",
          "I thought I had locked him into a form. It turned out he was holding me inside.",
        ],
      },
      {
        theme: "Heavens and darkness",
        quotes: [
          "He reached for the heavens, but bloomed where the light could no longer reach him.",
          "I started drawing what I loved. I ended with what I wanted to turn away from.",
        ],
      },
    ],
    rubricsLabel: "Channel series:",
    rubrics: ["My Botany", "Flowers & Sketches", "Notebook Sketches", "Sketches"],
  },
  about: {
    eyebrow: "About me",
    title: "A shadow is a line too",
    paragraphs: [
      "My name is Vladislav. I draw tattoo sketches in a notebook: black ink, beige paper, no extra strokes. Right now I'm working on a new style where Tribal meets botany — crosses sprout flowers and thorns become stems.",
      "My lines aren't perfect. They tremble like the hands that drew them. And in that tremor lies the whole truth.",
    ],
    captions: [
      "I started drawing what I loved. I ended with what I wanted to turn away from.",
      "The arrow pierced her through. But instead of breaking, she grew roots around the wound.",
      "What if death isn't the end of blooming, but its final form?",
    ],
    photoAlt: "Vladislav on the steps beneath a clock",
  },
  thoughts: {
    eyebrow: "#Quotes · #MyThoughts",
    title: "Per fumum ad lucem",
    subtitle: "Through smoke to light. Latin, Zen and the silence my drawings grow out of.",
    latin: [
      { la: "Simplex sigillum veri", translation: "Simplicity is the seal of truth." },
      { la: "Festina lente", translation: "Make haste slowly." },
      { la: "Ubi fumus, ibi ignis", translation: "Where there's smoke, there's fire." },
      { la: "Per fumum ad lucem", translation: "Through smoke to light." },
    ],
    // Both lines are Vladislav's own English renderings from the channel posts.
    zen: [
      { img: "/works/w05.webp", text: "Karma exists, and it is akin to science. Fate will catch up with you, and no one will refuse victory." },
      { img: "/works/w16.webp", text: "He who knows himself is enlightened; he who conquers himself is mighty." },
    ],
  },
  texts: textsEn,
  order: {
    eyebrow: "Custom sketch",
    titleA: "I'll draw a shadow",
    titleB: "that becomes yours",
    steps: [
      "Message me on Telegram: the idea, placement on the body, size.",
      "We talk through the image and style — Tribal, botany, Dark Art.",
      "I draw the sketch by hand and refine it for you.",
    ],
    cta: "Message on Telegram",
    imageAlt: "Vladislav as an anime-style illustration",
  },
  footer: {
    name: "Empty thoughts in the dark 🥀",
    copyright: "Vladislav · tattoo sketches",
  },
};
