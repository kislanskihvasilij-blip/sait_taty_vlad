import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { applyTheme, readStoredTheme } from "./hooks/use-theme";
import { LangProvider } from "./i18n/lang";
import "./index.css";

// Reveal animations start hidden only when this class is present.
document.documentElement.classList.add("js");
// Apply the saved theme before the first paint, so a reload never flashes the other one.
applyTheme(readStoredTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
