import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { readPref, writePref } from "@/lib/storage";

import { ru } from "./ru";
import type { Copy, Lang } from "./types";

const STORAGE_KEY = "lang";

// Russian is the site's main audience and ships in the main bundle. English is
// its own chunk, fetched only by visitors who need it.
const loaded: Partial<Record<Lang, Copy>> = { ru };

async function loadCopy(lang: Lang): Promise<Copy> {
  const cached = loaded[lang];
  if (cached) return cached;
  const { en } = await import("./en");
  loaded.en = en;
  return en;
}

/** Warm the English chunk when the visitor reaches for the switch. */
export function prefetchLang(lang: Lang): void {
  if (!loaded[lang]) void loadCopy(lang).catch(() => undefined);
}

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

export type InitialCopy = { lang: Lang; copy: Copy };

/**
 * Resolves the first language before the app renders. If the English chunk
 * cannot be fetched (offline, blocked), the site opens in Russian instead of
 * not opening at all.
 */
export async function loadInitialCopy(): Promise<InitialCopy> {
  const lang = initialLang();
  try {
    return { lang, copy: await loadCopy(lang) };
  } catch {
    return { lang: "ru", copy: ru };
  }
}

type LangState = { lang: Lang; copy: Copy; toggleLang: () => void };

const LangContext = createContext<LangState | null>(null);

export function LangProvider({ initial, children }: { initial: InitialCopy; children: ReactNode }) {
  const [state, setState] = useState<InitialCopy>(initial);
  const { lang, copy } = state;

  // Keep the document itself in the chosen language: screen readers, the tab
  // title and the description all follow the switch.
  useEffect(() => {
    document.documentElement.lang = lang;
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

  const toggleLang = useCallback(() => {
    const next: Lang = lang === "ru" ? "en" : "ru";
    // If the chunk fails to arrive the page simply stays in the current language;
    // the next click tries again.
    loadCopy(next)
      .then((nextCopy) => setState({ lang: next, copy: nextCopy }))
      .catch(() => undefined);
  }, [lang]);

  const value = useMemo<LangState>(() => ({ lang, copy, toggleLang }), [lang, copy, toggleLang]);

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
