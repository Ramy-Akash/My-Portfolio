import { useSite } from "../SiteContext.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import SmartImage from "./SmartImage.jsx";

export default function Testimonials() {
  const { content } = useSite();
  const { testimonialsHeading, testimonials, testimonialsSectionLabel } = content;
  if (!testimonials?.length) return null;

  return (
    <section id="testimonials" className="border-y border-ink/5 bg-ink/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <SectionHeading number="04" heading={testimonialsSectionLabel} intro={testimonialsHeading} />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-ink/8 bg-paper p-8">
                <span className="font-display text-5xl leading-none text-accent">“</span>
                <blockquote className="mt-3 flex-1 leading-relaxed text-ink/70">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <SmartImage
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-ink/45">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
