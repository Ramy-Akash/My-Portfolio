import { motion } from "framer-motion";
import { useSite } from "../SiteContext.jsx";
import SmartImage from "./SmartImage.jsx";
import Icon from "./Icon.jsx";

const fade = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] },
});

export default function Hero() {
  const { content, shared } = useSite();
  const {
    heroKicker,
    heroName,
    heroTitle,
    heroSubtitle,
    heroCtaLabel,
    heroSecondaryCtaLabel,
    heroStats,
  } = content;
  const { profilePic, contactEmail, heroSecondaryUrl } = shared;

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
      {/* soft accent wash */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pb-28 md:pt-44 lg:px-8">
        <div>
          {heroKicker && (
            <motion.p
              {...fade(0)}
              className="text-xs font-medium uppercase tracking-widest2 text-ink/40"
            >
              {heroKicker}
            </motion.p>
          )}
          <motion.h1
            {...fade(0.1)}
            className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl"
          >
            {heroName}
            <span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="mt-5 font-display text-xl italic text-ink/70 md:text-2xl"
          >
            {heroTitle}
          </motion.p>
          <motion.p {...fade(0.3)} className="mt-6 max-w-xl leading-relaxed text-ink/60">
            {heroSubtitle}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all hover:bg-accent"
            >
              {heroCtaLabel}
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {heroSecondaryCtaLabel && (
              <a
                href={heroSecondaryUrl}
                className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-7 py-3.5 text-sm transition-colors hover:border-ink"
              >
                {heroSecondaryCtaLabel}
              </a>
            )}
          </motion.div>

          {heroStats?.length > 0 && (
            <motion.dl {...fade(0.55)} className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl text-ink">{s.value}</dd>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-ink/40">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative mx-auto w-full max-w-sm md:max-w-none"
        >
          <div className="absolute -inset-3 rounded-[2rem] border border-accent/30" />
          <SmartImage
            src={profilePic}
            alt={heroName}
            eager
            className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl shadow-ink/20"
          />
        </motion.div>
      </div>
    </section>
  );
}
