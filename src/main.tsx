import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts are self-hosted: no third-party request before text can render (Google
// Fonts is also unreliable from Russia). Only Latin + Cyrillic of the weights
// the site uses; each file downloads only when its characters appear.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/cyrillic-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/cyrillic-500.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/cyrillic-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/cyrillic-500.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/cyrillic-400-italic.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/cyrillic-400.css";
import "@fontsource/unifrakturmaguntia/latin-400.css";

import App from "./App";
import { applyTheme, readStoredTheme } from "./hooks/use-theme";
import { LangProvider, loadInitialCopy } from "./i18n/lang";
import "./index.css";

// Reveal animations start hidden only when this class is present.
document.documentElement.classList.add("js");
// Apply the saved theme before the first paint, so a reload never flashes the other one.
applyTheme(readStoredTheme());

// The language is settled before the first render. For English this waits for
// its chunk; until then the static HTML version of the page stays on screen.
void loadInitialCopy().then((initial) => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LangProvider initial={initial}>
        <App />
      </LangProvider>
    </StrictMode>,
  );
});
