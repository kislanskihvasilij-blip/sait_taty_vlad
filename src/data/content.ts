import type { SqueezeSlide } from "@/components/ui/carousel-squeeze";

export const CHANNEL = "https://t.me/ten_sens";
const post = (id: number) => `${CHANNEL}/${id}`;

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
  imageAlt: `Эскиз «${title}»`,
  action: "Открыть пост",
  href: post(postId),
  target: "_blank",
});

// Sketches from the channel, in the order they were posted.
export const WORKS: SqueezeSlide[] = [
  sketch("buddha", "Дым и Будда.", "Отсекать не ради аскезы, а ради ясности: очертания Будды, струйка дыма, мягкий свет.", "w04", 37),
  sketch("lilies", "Лилии.", "Мои линии не идеальны. Они дрожат, как руки, что их рисовали, — и в этой дрожи вся правда.", "w06", 41),
  sketch("moon-cross", "Лунный крест.", "Работа над новым стилем: Neotribal и CyberTribal из блокнота.", "w08", 48),
  sketch("thorn-cross", "Терновый крест.", "Шипы, которые становятся стеблями. Dark Art в чистом чёрном.", "w09", 48),
  sketch("neotribal", "Neotribal.", "Трайбл, переосмысленный заново: тяжёлые формы и острые окончания.", "w10", 48),
  sketch("lily-blade", "Лилия и клинок.", "Эксперимент с новым стилем: ботаника, проросшая сквозь трайбл.", "w11", 51),
  sketch("star-cross", "Звёздный крест.", "Пока работы идут медленно — развиваю стиль. Скоро у каждого рисунка будет своя подпись.", "w12", 52),
  sketch("loved", "То, что любил.", "Я начал рисовать то, что любил. Закончил тем, от чего хотел отвернуться.", "w13", 53),
  sketch("form", "Заключённый в форму.", "Я думал, что заключил его в форму. Оказалось — это он держал меня внутри.", "w14", 54),
  sketch("arrow", "Стрела и корни.", "Стрела пронзила её насквозь. Но вместо того чтобы сломаться, она пустила корни вокруг раны.", "w15", 55),
  sketch("koi", "Рыба и лотос.", "Стремление… что вы знаете о рыбе, что стремится к лотосу среди неба?", "w17", 57),
  sketch("last-bloom", "Последнее цветение.", "Что, если смерть — не конец цветения, а его последняя форма?", "w18", 58),
];

export const STYLES = [
  { name: "Trible", note: "Острые линии, чистый чёрный" },
  { name: "Neotribal", note: "Трайбл, переосмысленный заново" },
  { name: "CyberTribal", note: "Холодная геометрия шипов" },
  { name: "Dark Art", note: "Тьма как материал" },
  { name: "Моя ботаника", note: "Лилии, розы, лотосы" },
  { name: "Dark Academic", note: "Латынь, свечи, тишина" },
] as const;

export const LATIN = [
  { la: "Simplex sigillum veri", ru: "Простота — печать истины." },
  { la: "Festina lente", ru: "Спеши медленно." },
  { la: "Ubi fumus, ibi ignis", ru: "Где дым, там и огонь." },
  { la: "Per fumum ad lucem", ru: "Через дым — к свету." },
] as const;

export const CAPTIONS = [
  "Я начал рисовать то, что любил. Закончил тем, от чего хотел отвернуться.",
  "Стрела пронзила её насквозь. Но вместо того чтобы сломаться, она пустила корни вокруг раны.",
  "Что, если смерть — не конец цветения, а его последняя форма?",
] as const;
