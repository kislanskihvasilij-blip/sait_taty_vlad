import { useEffect, useState } from "react";

import { readPref, writePref } from "@/lib/storage";

export type Theme = "shadow" | "bloom";

const STORAGE_KEY = "theme";
/** Browser-bar colour for each theme, matching --canvas. */
const BAR_COLOR: Record<Theme, string> = { shadow: "#05060f", bloom: "#0e0a15" };

const isTheme = (value: string | null): value is Theme => value === "shadow" || value === "bloom";

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

  const toggleTheme = () => setTheme((t) => (t === "shadow" ? "bloom" : "shadow"));
  return { theme, toggleTheme };
}
