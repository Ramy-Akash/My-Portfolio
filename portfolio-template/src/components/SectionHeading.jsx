import Reveal from "./Reveal.jsx";

/** Consistent editorial section header: numbered kicker + display heading. */
export default function SectionHeading({ number, heading, intro, light = false }) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p
          className={`flex items-center gap-3 text-xs font-medium uppercase tracking-widest2 ${
            light ? "text-white/50" : "text-ink/40"
          }`}
        >
          <span className="text-accent">{number}</span>
          <span className={`h-px w-10 ${light ? "bg-white/20" : "bg-ink/15"}`} />
          {heading}
        </p>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <h2
            className={`mt-6 font-display text-3xl md:text-5xl leading-tight ${
              light ? "text-white" : "text-ink"
            }`}
          >
            {intro}
          </h2>
        </Reveal>
      )}
    </div>
  );
}
