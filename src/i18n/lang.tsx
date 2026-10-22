import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { readPref, writePref } from "@/lib/storage";

import { en } from "./en";
import { ru } from "./ru";
import type { Copy, Lang } from "./types";

const COPY: Record<Lang, Copy> = { ru, en };
const STORAGE_KEY = "lang";

const isLang = (value: string | null): value is Lang => value === "ru" || value === "en";

/**
 * Language for the first render: an explicit ?lang= link wins (so an English
 * link can be shared), then the visitor's saved choice, then the browser.
 */
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  const saved = readPref(STORAGE_KEY);
  if (isLang(saved)) return saved;
  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

type LangState = { lang: Lang; copy: Copy; toggleLang: () => void };

const LangContext = createContext<LangState | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const copy = COPY[lang];

  // Keep the document itself in the chosen language: screen readers, the tab
  // title and the description all follow the switch.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
    writePref(STORAGE_KEY, lang);
    // A ?lang= in the address would override the switch on the next reload; keep it in step.
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang") && url.searchParams.get("lang") !== lang) {
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url);
    }
  }, [lang, copy]);

  const value = useMemo<LangState>(
    () => ({ lang, copy, toggleLang: () => setLang((l) => (l === "ru" ? "en" : "ru")) }),
    [lang, copy],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function useLangState(): LangState {
  const state = useContext(LangContext);
  if (!state) throw new Error("useCopy/useLang must be used inside <LangProvider>");
  return state;
}

/** All site text in the current language. */
export const useCopy = (): Copy => useLangState().copy;

/** Current language and the switch. */
export const useLang = (): Pick<LangState, "lang" | "toggleLang"> => {
  const { lang, toggleLang } = useLangState();
  return { lang, toggleLang };
};
