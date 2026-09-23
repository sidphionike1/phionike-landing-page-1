"use client";

import { useEffect, useState } from "react";
import type { HomePage } from "@/content/schema";
import { asset } from "@/lib/asset";

interface CaseStudyProject {
  title: string;
  description: string;
  image: string;
}

interface CaseStudyPile {
  id: string;
  bgColor: string;
  projects: CaseStudyProject[];
}

const VENN_YELLOW = "#f5c842";

const VENN_EXT = "png";

const VENN_STAGE_BY_DISCIPLINE: Record<string, string> = {
  discover: `/venn/discover-and-define.${VENN_EXT}`,
  build: `/venn/built-from-0-1.${VENN_EXT}`,
  redesign: `/venn/redesign-and-reposistion.${VENN_EXT}`,
  scale: `/venn/scale-and-partner.${VENN_EXT}`,
};

// Resting state (nothing selected): all chips blurred. This is still the older
// export, and unlike the four above it has the discipline pills baked in.
const VENN_STAGE_REST = "/venn/none-selected.png";

// Every layer that gets mounted for the cross-fade.
const VENN_LAYERS = [
  VENN_STAGE_REST,
  ...Object.values(VENN_STAGE_BY_DISCIPLINE),
];

// Intrinsic frame shared by every export (775 × 471, and the PNGs are 4× that).
const VENN_ASPECT = "775 / 471";

const ACTIVE_PILES: Record<string, CaseStudyPile> = {
  discover: {
    id: "discover",
    bgColor: VENN_YELLOW,
    projects: [
      {
        title: "Wavelength",
        description:
          "A talent platform connecting biotech leaders, candidates, founders, and opportunities.",
        image: "/venn/description_image/Wavelength.png",
      },
    ],
  },
  build: {
    id: "build",
    bgColor: VENN_YELLOW,
    projects: [
      {
        title: "Res Ai",
        description:
          "A talent platform connecting biotech leaders, candidates, founders, and opportunities.",
        image: "/venn/description_image/Res-ai.png",
      },
      {
        title: "Oren - Smart Ring App",
        description:
          "Great design isn't defined by the number of screens delivered. It's measured by the experiences it creates and the value it brings to businesses.",
        image: "/venn/description_image/Oren.png",
      },
    ],
  },
  redesign: {
    id: "redesign",
    bgColor: VENN_YELLOW,
    projects: [
      {
        title: "ICP",
        description:
          "A research platform enabling users to purchase reports or commission custom research.",
        image: "/venn/description_image/ICP.png",
      },
      {
        title: "Vetbuddy",
        description:
          "A cloud-based software package for veterinary clinic management.",
        image: "/venn/description_image/Vetbuddy.png",
      },
    ],
  },
  scale: {
    id: "scale",
    bgColor: VENN_YELLOW,
    projects: [
      {
        title: "Brandintelle",
        description:
          "A talent platform connecting biotech leaders, candidates, founders, and opportunities.",
        image: "/venn/description_image/Brandintelle.png",
      },
    ],
  },
};

export function VennDiagramSection({ content }: { content: HomePage["venn"] }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);

  const selectDiscipline = (id: string) => {
    setSelectedDiscipline((current) => (current === id ? null : id));
  };

  const caseStudies: Record<string, CaseStudyPile> = ACTIVE_PILES;

  const activeCaseStudy = selectedDiscipline
    ? caseStudies[selectedDiscipline]
    : null;

  const activeProject =
    activeCaseStudy?.projects[
      Math.min(projectIndex, activeCaseStudy.projects.length - 1)
    ] ?? null;

  const isDefault = !selectedDiscipline;

  useEffect(() => {
    setProjectIndex(0);
  }, [selectedDiscipline]);

  // Which venn stage to show, looked up by discipline name rather than by index.
  const activeVennImage =
    (selectedDiscipline && VENN_STAGE_BY_DISCIPLINE[selectedDiscipline]) ||
    VENN_STAGE_REST;

  return (
    <section className="bg-background py-16 md:py-28">
      <div className="section-shell">
        {/* Eyebrow + Heading */}
        <p className="type-sans-medium text-caption leading-[16.5px] tracking-[3.3px] text-[#212121]">
          {content.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl">
          <span className="type-sans-regular block text-heading leading-[120%] text-[#212121] md:text-display-xs md:leading-[47.84px]">
            {content.heading}
          </span>
          <em className="type-sans-light-italic block whitespace-pre-line text-heading leading-[120%] text-[#212121]/60 md:whitespace-normal md:text-display-xs md:leading-[47.84px]">
            {content.subheading}
          </em>
        </h2>

        {/* 6:4 Grid */}
        <div className="mt-6 grid gap-6 md:mt-14 md:grid-cols-[6fr_4fr] md:items-stretch md:gap-8">
          {/* LEFT — Venn Diagram
              Mobile: size to the stage aspect ratio so we don't leave empty
              whitespace under the ovals (min-h-[420px] was the culprit). */}
          <div className="relative aspect-[775/471] w-full md:aspect-auto md:min-h-[520px]">
            {/* Dynamic background image layer — the Venn Diagram Stage exports.
                Each stage already contains both tinted ovals plus the sector
                chips, so the CSS gradient ovals that used to live here are no
                longer needed and are kept commented out below for reference. */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
              {VENN_LAYERS.map((src) => (
                <img
                  key={src}
                  src={asset(src)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
                  style={{
                    aspectRatio: VENN_ASPECT,
                    opacity: src === activeVennImage ? 1 : 0,
                  }}
                />
              ))}

              {/*
              <div
                className="absolute left-0 top-1/2 h-[85%] w-[62%] -translate-y-1/2 rounded-[5rem] transition-colors duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #ffe8e0 0%, #fff0ea 50%, #ffe4d6 100%)",
                }}
              />
              <div
                className="absolute right-0 top-1/2 h-[85%] w-[62%] -translate-y-1/2 rounded-[5rem] transition-colors duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #e8e4ff 0%, #f0edff 50%, #e4e0ff 100%)",
                }}
              />
              {activeCaseStudy && (
                <div
                  className="absolute inset-0 opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${activeCaseStudy.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
              */}
            </div>

            {/* Discipline buttons — centered */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 md:gap-4">
              {content.disciplines.map((d, index) => {
                const isActive = selectedDiscipline === d.id;
                const isInactive = selectedDiscipline && !isActive;

                const offsetClass =
                  index === 1
                    ? "relative md:right-[100px]"
                    : index === 2
                      ? "relative md:left-[100px]"
                      : "";

                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => selectDiscipline(d.id)}
                    className={`type-sans-medium whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] leading-[16px] transition-all duration-300 md:px-7 md:py-3 md:text-body-sm md:leading-[19.5px] ${offsetClass} ${
                      isDefault
                        ? "bg-foreground text-white hover:scale-105"
                        : isActive
                          ? "scale-[1.02] bg-foreground text-white shadow-lg"
                          : "bg-foreground/40 text-white/80 backdrop-blur-sm hover:bg-foreground/60"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Dynamic content */}
          <div
            className="relative flex min-h-0 flex-col justify-between overflow-hidden transition-colors duration-500 md:min-h-[520px]"
            style={{
              backgroundColor: activeCaseStudy
                ? activeCaseStudy.bgColor
                : "transparent",
            }}
          >
            {isDefault ? (
              /* Default state — original implementation */
              <div className="flex h-full flex-col justify-center px-0 py-0 md:px-6 md:py-8">
                <p className="type-sans-medium max-w-lg text-title leading-normal text-[#444242]">
                  {content.supportCopy}
                </p>
                <div className="mt-6 border-t border-border pt-6 md:mt-10 md:pt-8">
                  {content.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-4 py-2"
                    >
                      <span
                        className={`size-3 shrink-0 ${
                          i === 0
                            ? "bg-foreground"
                            : i === 1
                              ? "border border-border"
                              : "bg-border"
                        }`}
                      />
                      <span className="type-sans-italic text-body-sm leading-[18px] text-[#212121]/60">
                        {stat.value} {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={content.cta.href}
                  className="type-sans-medium mt-6 inline-flex w-fit self-center items-center gap-2 border-b border-[#111111] pb-1 text-label leading-[19.5px] text-[#111111] transition-opacity hover:opacity-70 md:mt-10 md:w-full md:self-auto"
                >
                  {content.cta.label}
                  {/* <ArrowUpRight size={14} /> */}
                </a>
              </div>
            ) : activeCaseStudy && activeProject ? (
              /* Selected state — active pile project card */
              <div className="flex h-full flex-col px-5 py-6 md:px-8 md:py-8">
                <div className="shrink-0">
                  <h3
                    className="type-sans-regular text-[24px] leading-[38.4px] text-[#141414]"
                  >
                    {activeProject.title}
                  </h3>
                  <p className="type-sans-regular mt-1 max-w-[95%] text-[14px] leading-[19.6px] text-[#212121]">
                    {activeProject.description}
                  </p>
                </div>

                <div className="mt-5 flex min-h-0 flex-1 items-center justify-center md:mt-6">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-white p-3 md:rounded-[1.5rem] md:p-4">
                    <img
                      src={asset(activeProject.image)}
                      alt={activeProject.title}
                      className="h-auto max-h-[240px] w-full object-contain md:max-h-[320px]"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    aria-label="Previous project"
                    disabled={activeCaseStudy.projects.length < 2}
                    onClick={() =>
                      setProjectIndex(
                        (i) =>
                          (i - 1 + activeCaseStudy.projects.length) %
                          activeCaseStudy.projects.length,
                      )
                    }
                    className="text-[#141414] transition-opacity hover:opacity-60 disabled:pointer-events-none"
                  >
                    {/* <ArrowLeft size={18} strokeWidth={1.5} /> */}
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    disabled={activeCaseStudy.projects.length < 2}
                    onClick={() =>
                      setProjectIndex(
                        (i) => (i + 1) % activeCaseStudy.projects.length,
                      )
                    }
                    className="text-[#141414] transition-opacity hover:opacity-60 disabled:pointer-events-none"
                  >
                    {/* <ArrowRight size={18} strokeWidth={1.5} /> */}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}