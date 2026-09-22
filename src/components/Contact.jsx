import { useSite } from "../SiteContext.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";

export default function Contact() {
  const { content, shared } = useSite();
  const {
    contactHeading,
    contactText,
    contactCtaLabel,
    location,
    socialLinks,
    footerNote,
    contactSectionLabel,
  } = content;
  const { contactEmail } = shared;

  return (
    <footer id="contact" className="border-t border-ink/5">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <SectionHeading number="03" heading={contactSectionLabel} intro={contactHeading} />
        {contactText && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl leading-relaxed text-ink/70">{contactText}</p>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <a
            href={`mailto:${contactEmail}`}
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-accent px-8 py-4 text-sm font-medium text-paper transition-transform hover:scale-[1.03]"
          >
            <Icon name="mail" className="h-5 w-5" />
            {contactCtaLabel || contactEmail}
            <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="mt-20 flex flex-col gap-8 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg">
              {content.heroName}
              <span className="text-accent">.</span>
            </p>
            {location && <p className="mt-1 text-sm text-ink/50">{location}</p>}
          </div>

          {socialLinks?.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/75 transition-all hover:border-accent hover:text-ink"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="text-xs text-ink/50">
            © {new Date().getFullYear()} {content.heroName}. {footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
