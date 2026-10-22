import { useEffect, useState } from "react";

import { readPref, writePref } from "@/lib/storage";

/** In the order the switch cycles through them. */
export const THEMES = ["shadow", "bloom", "velvet"] as const;
export type Theme = (typeof THEMES)[number];

const STORAGE_KEY = "theme";
/** Browser-bar colour for each theme, matching --canvas. */
const BAR_COLOR: Record<Theme, string> = { shadow: "#05060f", bloom: "#0e0a15", velvet: "#0d0405" };

const isTheme = (value: string | null): value is Theme =>
  (THEMES as readonly string[]).includes(value ?? "");

const nextOf = (theme: Theme): Theme => THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

export function readStoredTheme(): Theme {
  const saved = readPref(STORAGE_KEY);
  return isTheme(saved) ? saved : "shadow";
}

/** Puts the theme on <html>; CSS swaps every colour token from there. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", BAR_COLOR[theme]);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    writePref(STORAGE_KEY, theme);
  }, [theme]);

  const cycleTheme = () => setTheme(nextOf);
  return { theme, nextTheme: nextOf(theme), cycleTheme };
}
