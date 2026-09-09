"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { HomePage } from "@/content/schema";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  image: string;
}


const VENN_EXT = "png"

const VENN_STAGE_BY_DISCIPLINE: Record<string, string> = {
  discover: `/venn/discover-and-define.${VENN_EXT}`,
  build: `/venn/built-from-0-1.${VENN_EXT}`,
  redesign: `/venn/redesign-and-reposistion.${VENN_EXT}`,
  scale: `/venn/scale-and-partner.${VENN_EXT}`,
}

// Resting state (nothing selected): all chips blurred. This is still the older
// export, and unlike the four above it has the discipline pills baked in.
const VENN_STAGE_REST = "/venn/none-selected.png"

// Every layer that gets mounted for the cross-fade.
const VENN_LAYERS = [
  VENN_STAGE_REST,
  ...Object.values(VENN_STAGE_BY_DISCIPLINE),
]

// Intrinsic frame shared by every export (775 × 471, and the PNGs are 4× that).
const VENN_ASPECT = "775 / 471"

export function VennDiagramSection({ content }: { content: HomePage["venn"] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const selectedDiscipline = params.get("discipline");
  const selectedSector = params.get("sector");

  const select = (kind: "discipline" | "sector", id: string) => {
    const next = new URLSearchParams(params.toString());
    const current = next.get(kind);
    if (current === id) {
      next.delete(kind);
    } else {
      next.set(kind, id);
    }
    router.replace(`?${next.toString()}#work`, { scroll: false });
  };

  // Extended case-study data (add to your CMS / content schema)
  // @ts-ignore
  const caseStudies: Record<string, CaseStudy> = content.caseStudies ?? {
    discover: {
      id: "discover",
      title: "Oren",
      subtitle:
        "Designing a seamless wellness experience for a next-generation smart ring ecosystem.",
      bgColor: "#f5c842",
      image: VENN_STAGE_BY_DISCIPLINE.discover,
    },
    build: {
      id: "build",
      title: "Aurelia",
      subtitle:
        "Building a zero-to-one fintech platform that simplified cross-border payments for SMBs.",
      bgColor: "#c8e6c9",
      image: VENN_STAGE_BY_DISCIPLINE.build,
    },
    redesign: {
      id: "redesign",
      title: "Meridian",
      subtitle:
        "Redesigning a legacy healthcare portal into a patient-first digital experience.",
      bgColor: "#e1bee7",
      image: VENN_STAGE_BY_DISCIPLINE.redesign,
    },
    scale: {
      id: "scale",
      title: "Nexus",
      subtitle:
        "Scaling a marketplace platform to serve 2M+ users across 15 countries.",
      bgColor: "#b3e5fc",
      image: VENN_STAGE_BY_DISCIPLINE.scale,
    },
  };

  const activeCaseStudy = selectedDiscipline
    ? caseStudies[selectedDiscipline]
    : null;

  const isDefault = !selectedDiscipline;

  // Which venn stage to show, looked up by discipline name rather than by index.
  const activeVennImage =
    (selectedDiscipline && VENN_STAGE_BY_DISCIPLINE[selectedDiscipline]) ||
    VENN_STAGE_REST;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Eyebrow + Heading */}
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {content.eyebrow}
        </p>
        <h2 className="section-heading mt-3 max-w-3xl">
          {content.heading}
          <em className="section-heading-italic block">
            {content.subheading}
          </em>
        </h2>

        {/* 6:4 Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-[6fr_4fr] md:items-stretch">
          {/* LEFT — Venn Diagram */}
          <div className="relative min-h-[420px] md:min-h-[520px]">
            {/* Dynamic background image layer — the Venn Diagram Stage exports.
                Each stage already contains both tinted ovals plus the sector
                chips, so the CSS gradient ovals that used to live here are no
                longer needed and are kept commented out below for reference. */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
              {VENN_LAYERS.map((src) => (
                <img
                  key={src}
                  src={src}
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
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
              {content.disciplines.map((d) => {
                const isActive = selectedDiscipline === d.id;
                const isInactive = selectedDiscipline && !isActive;

                return (
                  <button
                    key={d.id}
                    onClick={() => select("discipline", d.id)}
                    className={`rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 ${
                      isDefault
                        ? "bg-foreground text-background hover:scale-105"
                        : isActive
                          ? "scale-[1.02] bg-foreground text-background shadow-lg"
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
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden transition-colors duration-500 md:min-h-[520px]"
            style={{
              backgroundColor: activeCaseStudy
                ? activeCaseStudy.bgColor
                : "transparent",
            }}
          >
            {isDefault ? (
              /* Default state — original implementation */
              <div className="flex h-full flex-col justify-center px-2 py-8 md:px-6">
                <p className="max-w-lg text-[22px] leading-snug text-foreground">
                  {content.supportCopy}
                </p>
                <div className="mt-10 border-t border-border pt-8">
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
                      <span className="text-lg font-medium">{stat.value}</span>
                      <span className="italic text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={content.cta.href}
                  className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm text-foreground transition-opacity hover:opacity-70"
                >
                  {content.cta.label}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            ) : activeCaseStudy ? (
              /* Selected state — case study card */
              <div className="flex h-full flex-col p-8 text-[#1a1a1a]">
                <div className="flex-1">
                  {/* Placeholder image area */}
                  <div className="mb-6 flex h-[260px] w-full items-center justify-center overflow-hidden bg-black/5">
                    <img
                      src={activeCaseStudy.image}
                      alt={activeCaseStudy.title}
                      // contain, not cover: these are diagram exports, so
                      // cropping them to fill a 260px box mangles the artwork
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        // Fallback placeholder
                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.innerHTML = `<span class="text-sm text-black/30 font-medium">${activeCaseStudy.title} Preview</span>`;
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-[36px] font-medium leading-[1.1]">
                    {activeCaseStudy.title}
                  </h3>
                  <p className="mt-3 max-w-[90%] text-lg leading-relaxed opacity-80">
                    {activeCaseStudy.subtitle}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}