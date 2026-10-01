import type { WorksWheelItem } from "@/components/ui/works-wheel";

export const CHANNEL = "https://t.me/ten_sens";
const post = (id: number) => `${CHANNEL}/${id}`;

// Sketches from the channel, in the order they were posted.
export const WORKS: WorksWheelItem[] = [
  { title: "Дым и Будда", image: "/works/w04.jpg", href: post(37) },
  { title: "Лилии", image: "/works/w06.jpg", href: post(41) },
  { title: "Лунный крест", image: "/works/w08.jpg", href: post(48) },
  { title: "Терновый крест", image: "/works/w09.jpg", href: post(48) },
  { title: "Neotribal", image: "/works/w10.jpg", href: post(48) },
  { title: "Лилия и клинок", image: "/works/w11.jpg", href: post(51) },
  { title: "Звёздный крест", image: "/works/w12.jpg", href: post(52) },
  { title: "То, что любил", image: "/works/w13.jpg", href: post(53) },
  { title: "Заключённый в форму", image: "/works/w14.jpg", href: post(54) },
  { title: "Стрела и корни", image: "/works/w15.jpg", href: post(55) },
  { title: "Рыба и лотос", image: "/works/w17.jpg", href: post(57) },
  { title: "Последнее цветение", image: "/works/w18.jpg", href: post(58) },
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
