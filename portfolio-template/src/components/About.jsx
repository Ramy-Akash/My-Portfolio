import { useSite } from "../SiteContext.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import SmartImage from "./SmartImage.jsx";

export default function About() {
  const { content, shared } = useSite();
  const { aboutHeading, aboutBio, aboutSectionLabel } = content;
  const { aboutImage } = shared;
  if (!aboutBio?.length) return null;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <SectionHeading number="01" heading={aboutSectionLabel} intro={aboutHeading} />
      <div className="mt-14 grid items-start gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <Reveal>
          <SmartImage
            src={aboutImage}
            alt={content.heroName}
            className="aspect-[4/3] w-full rounded-2xl"
          />
        </Reveal>
        <div className="space-y-6">
          {aboutBio.map((para, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className={`leading-relaxed ${i === 0 ? "text-lg text-ink/80" : "text-ink/60"}`}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
