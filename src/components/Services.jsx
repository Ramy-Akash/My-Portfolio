import { useSite } from "../SiteContext.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";

export default function Services() {
  const { content } = useSite();
  const { servicesHeading, servicesIntro, services, servicesSectionLabel } = content;
  if (!services?.length) return null;

  return (
    <section id="services" className="bg-ink/[0.02] scroll-mt-20 md:scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <SectionHeading number="02" heading={servicesSectionLabel} intro={servicesIntro} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="group h-full rounded-2xl bg-paper p-8 border border-ink/10 transition-all hover:border-ink/20 hover:bg-ink/[0.02] md:p-10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-accent transition-colors group-hover:border-accent">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
