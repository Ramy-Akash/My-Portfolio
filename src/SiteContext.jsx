import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { siteConfig } from "./siteConfig.js";

const SiteContext = createContext(null);

function readPreference(key, allowed, fallback) {
  const value = window.localStorage.getItem(key);
  return allowed.includes(value) ? value : fallback;
}

export function SiteProvider({ children }) {
  const [language, setLanguage] = useState(() => readPreference("aura-language", ["en", "ar"], "en"));
  const [theme, setTheme] = useState(() => readPreference("aura-theme", ["light", "dark"], "dark"));
  const content = siteConfig[language];

  useEffect(() => {
    window.localStorage.setItem("aura-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    const palette = siteConfig.theme[theme];
    const root = document.documentElement;
    Object.entries(palette).forEach(([name, value]) => {
      const hex = value.replace("#", "");
      const full = hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;
      const number = parseInt(full, 16);
      root.style.setProperty(`--${name}`, `${(number >> 16) & 255} ${(number >> 8) & 255} ${number & 255}`);
    });
    root.dataset.theme = theme;
    window.localStorage.setItem("aura-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = `${siteConfig.siteName} — ${content.heroTitle}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", content.metaDescription);
    if (siteConfig.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = siteConfig.favicon;
    }
  }, [content]);

  const value = useMemo(
    () => ({ language, setLanguage, theme, setTheme, content, shared: siteConfig.shared }),
    [language, theme, content]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}