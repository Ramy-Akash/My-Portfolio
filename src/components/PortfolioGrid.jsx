import { useSite } from "../SiteContext.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import SmartImage from "./SmartImage.jsx";
import Icon from "./Icon.jsx";

function ProjectCard({ project }) {
  const inner = (
    <div className="group relative overflow-hidden rounded-2xl">
      <SmartImage
        src={project.image}
        alt={project.title}
        className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-7">
        <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
          <p className="text-xs uppercase tracking-widest text-accent">{project.category}</p>
          <div className="mt-1 flex items-center justify-between gap-4">
            <h3 className="font-display text-2xl text-white">{project.title}</h3>
            {project.url && <Icon name="arrow" className="h-5 w-5 shrink-0 text-white" />}
          </div>
          {project.tags?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Always-visible caption on touch/small screens */}
      <div className="mt-3 flex items-baseline justify-between md:hidden">
        <h3 className="font-display text-lg">{project.title}</h3>
        <p className="text-xs uppercase tracking-widest text-ink/40">{project.category}</p>
      </div>
    </div>
  );

  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={project.title}>
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function PortfolioGrid() {
  const { content, shared } = useSite();
  const { portfolioHeading, portfolioIntro, projects, portfolioSectionLabel } = content;
  const localizedProjects = projects.map((project, index) => ({ ...shared.projects[index], ...project }));
  if (!projects?.length) return null;

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <SectionHeading number="03" heading={portfolioSectionLabel} intro={portfolioIntro} />
      <div className="mt-16 grid gap-10 sm:grid-cols-2 md:gap-8">
        {localizedProjects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 0.1}
            className={i % 2 === 1 ? "md:mt-16" : ""}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
