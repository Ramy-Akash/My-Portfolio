import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "../SiteContext.jsx";
import { siteConfig } from "../siteConfig.js";
import Icon from "./Icon.jsx";

function ThemeToggle({ theme, setTheme, label }) {
  const nextTheme = theme === "light" ? "dark" : "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-accent hover:text-accent"
    >
      <Icon name={theme === "light" ? "moon" : "sun"} className="h-4 w-4" />
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { language, setLanguage, theme, setTheme, content } = useSite();
  const navigation = siteConfig.navigation[language];
  const themeLabel = siteConfig.themeLabels[language][theme === "light" ? "dark" : "light"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");

  const scrollToSection = (href) => {
    const targetId = href ? href.replace(/^#/, "") : "";
    if (targetId === "top" || !targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        try {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        } catch (_) {}
      }
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 70;
      const bodyTop = document.body.getBoundingClientRect().top;
      const elemTop = elem.getBoundingClientRect().top;
      const targetY = Math.max(0, elemTop - bodyTop - headerOffset);

      // 1. Smooth scroll to calculated offset
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });

      // 2. Invoke scrollIntoView as secondary browser mechanism
      try {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (_) {}

      // 3. Trigger native location.hash navigation so the browser physically navigates
      // (the exact mechanism that happens when pressing Enter on the URL bar)
      if (window.location.hash === `#${targetId}`) {
        try {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        } catch (_) {}
        setTimeout(() => {
          window.location.hash = targetId;
        }, 10);
      } else {
        window.location.hash = targetId;
      }
    } else {
      window.location.hash = href;
    }
  };

  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
    setTimeout(() => {
      const targetId = href ? href.replace(/^#/, "") : "";
      const elem = document.getElementById(targetId);
      if (elem) {
        const headerOffset = 70;
        const bodyTop = document.body.getBoundingClientRect().top;
        const elemTop = elem.getBoundingClientRect().top;
        const targetY = Math.max(0, elemTop - bodyTop - headerOffset);
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }, 80);
  };

  const handleDesktopNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const controls = (
    <div className="flex items-center gap-2">
      <ThemeToggle theme={theme} setTheme={setTheme} label={themeLabel} />
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={content.ui.languageLabel}
        className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-ink/15 px-3 text-xs font-medium uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
      >
        {content.ui.language}
      </button>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-ink/5 bg-paper/85 py-3 backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8">
        <a
          href="#top"
          onClick={(e) => {
            if (open) setOpen(false);
            handleDesktopNavClick(e, "#top");
          }}
          className="font-display text-xl tracking-tight"
        >
          {siteConfig.siteName}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleDesktopNavClick(e, item.href)}
              className="text-sm text-ink/60 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <button
              type="button"
              onClick={() => setContactOpen((isOpen) => !isOpen)}
              aria-expanded={contactOpen}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm transition-all hover:border-accent hover:bg-accent hover:text-white"
            >
              {content.heroCtaLabel}
              <Icon name="arrow" className={`h-3 w-3 rotate-90 transition-transform ${contactOpen ? "-rotate-90" : ""}`} />
            </button>
            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-56 rounded-xl border border-ink/10 bg-paper p-2 shadow-xl"
                >
                  <a
                    href={`mailto:${siteConfig.shared.contactEmail}`}
                    className="flex items-center gap-3 rounded-lg p-3 text-sm text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <Icon name="mail" className="h-4 w-4 text-accent" />
                    {content.ui.contactEmail}
                  </a>
                  <a
                    href={siteConfig.shared.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <Icon name="whatsapp" className="h-4 w-4 text-accent" />
                    {content.ui.contactWhatsapp}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {controls}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={content.ui.menu}
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-ink/5 bg-paper/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleMobileNavClick(e, item.href)}
                  className="cursor-pointer select-none py-3 font-display text-2xl text-ink/80 touch-manipulation transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${siteConfig.shared.contactEmail}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-3 py-3 text-center text-xs text-paper"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {content.ui.contactEmail}
                </a>
                <a
                  href={siteConfig.shared.whatsappUrl}
                  onClick={() => setOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-3 py-3 text-center text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {content.ui.contactWhatsapp}
                </a>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 border-t border-ink/5 pt-4">{controls}</div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
