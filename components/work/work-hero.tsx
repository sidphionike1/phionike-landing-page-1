"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { WorkPage } from "@/content/schema"

const TAG_CONFIG: Record<string, { bg: string; text: string; h: string }> = {
  terracotta: { bg: "#F2A93B", text: "#fff",  h: "h-[190px]" },
  mustard:    { bg: "#E65124", text: "#111",  h: "h-[130px]" },
  cobalt:     { bg: "#2538F5", text: "#fff",  h: "h-[130px]" },
  lavender:   { bg: "#DCB8FF", text: "#111",  h: "h-[190px]" },
}

export function WorkHero({ content }: { content: WorkPage["hero"] }) {
  const [left1, left2, right1, right2] = content.decorativeTags

  return (
    <section className="relative overflow-hidden bg-background pb-14 pt-34 md:pt-40 md:pb-28">
      {/* ── Mobile tags (horizontal pills, right side, staggered) ─── */}
      <div
        className="absolute right-0 top-34 -mx-6 flex flex-col items-end gap-12 pr-6 md:hidden"
        aria-hidden="true"
      >
        {content.decorativeTags.map((tag) => {
          if (!tag) return null
          const cfg = TAG_CONFIG[tag.color] ?? TAG_CONFIG.cobalt
          return (
            <div
              key={tag.label}
              className="flex items-center justify-center rounded-l-xl px-5 py-2.5"
              style={{ backgroundColor: cfg.bg }}
            >
              <span
                className="type-sans-medium whitespace-nowrap text-eyebrow"
                style={{ color: "white" }}
              >
                {tag.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Left desktop tags (vertical, bottom-aligned) ──────────── */}
      <div
        className="absolute bottom-0 left-0 hidden items-end gap-3 pl-[120px] md:flex"
        aria-hidden="true"
      >
        {[left1, left2].map((tag) => {
          if (!tag) return null
          const cfg = TAG_CONFIG[tag.color] ?? TAG_CONFIG.cobalt
          return (
            <div
              key={tag.label}
              className={`flex w-[140px] text-white text-2xl ${cfg.h} items-end pl-5 justify-start rounded-t-2xl pb-5`}
              style={{ backgroundColor: cfg.bg }}
            >
              <span
                className="whitespace-nowrap text-title font-bold uppercase tracking-[0.2em]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", color: "white" }}
              >
                {tag.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Right desktop tags (vertical, bottom-aligned) ─────────── */}
      <div
        className="absolute bottom-0 right-0 hidden items-end gap-3 pr-[120px] md:flex"
        aria-hidden="true"
      >
        {[right1, right2].map((tag) => {
          if (!tag) return null
          const cfg = TAG_CONFIG[tag.color] ?? TAG_CONFIG.cobalt
          return (
            <div
              key={tag.label}
              className={`flex w-[140px] ${cfg.h} items-end justify-start pl-5 rounded-t-2xl pb-5`}
              style={{ backgroundColor: cfg.bg }}
            >
              <span
                className="whitespace-nowrap text-title font-bold uppercase tracking-[0.2em]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", color: "white" }}
              >
                {tag.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Content: left on mobile, centered on desktop ──────────── */}
      <div className="relative z-10 section-shell [--section-max:56rem] text-left md:text-center">
        <p className="type-sans-medium text-eyebrow leading-normal tracking-[3.3px] uppercase text-[#212121]/60">
          {content.eyebrow}
        </p>
        <h1 className="type-sans-medium mt-5 w-[60%] text-display-xs leading-normal tracking-[-0.8px] text-[#212121] md:w-full md:text-hero md:leading-[105%] md:tracking-[-3px]">
          {content.headline}
        </h1>

        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-center md:gap-5">
          <a
            href={content.primaryCta.href}
            className="type-sans-medium inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-body-sm leading-[21px] text-white"
          >
            {content.primaryCta.label}
          </a>

          <a
            href={content.secondaryCta.href}
            className="type-sans-semibold inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-body-sm leading-normal text-[#121212] transition-colors hover:bg-foreground/5 md:border-0 md:bg-transparent md:px-0 md:py-0 md:hover:bg-transparent"
          >
            {content.secondaryCta.label}
            <ArrowUpRight size={16} className="md:hidden" />
            <ArrowRight size={14} className="hidden md:inline" />
          </a>
        </div>
      </div>
    </section>
  )
}