"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import type { HomePage } from "@/content/schema"

export function ShowreelSection({ content }: { content: HomePage["showreel"] }) {
  const [playing, setPlaying] = useState(false)

  // NOTE: Add these fields to your schema if not present:
  //   year: string   (e.g. "2026")
  //   posterUrl: string
  const year = (content as any).year ?? "2026"
  const posterUrl = (content as any).posterUrl ?? "/showreel/poster.png"

  return (
    <section className="bg-[#FAF8F2] py-16 md:py-20 lg:py-24">
      {/* Mobile: 90% width | Tablet: 20px padding | Desktop: 1198px max */}
      <div className="mx-auto w-[90%] md:w-auto md:px-5 lg:max-w-[1198px] lg:px-0">
        
        {/* ── Header ── */}
        <div className="mb-6 flex items-center justify-between border-b border-[#d4cfc5] pb-4 md:mb-8 md:pb-5">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-[#1a1a1a] md:text-[13px]">
              {content.title}
            </span>
            <span className="hidden h-3.5 w-px bg-[#1a1a1a]/25 sm:block md:h-4" />
            <span className="text-[11px] font-normal tracking-[0.08em] text-[#1a1a1a] md:text-[13px]">
              {year}
            </span>
          </div>
          <span className="text-[11px] font-normal tracking-[0.08em] text-[#1a1a1a] tabular-nums md:text-[13px]">
            {content.duration}
          </span>
        </div>

        {/* ── Video / Poster ── */}
        <div className="relative aspect-video w-full overflow-hidden bg-white">
          {playing ? (
            <iframe
              src={content.videoUrl}
              title={content.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={posterUrl}
                alt={`${content.title} poster`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1198px) 100vw, 1198px"
                priority
              />
              <button
                onClick={() => setPlaying(true)}
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a1a1a]/15 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white md:h-20 md:w-20"
                aria-label={`Play ${content.title}`}
              >
                <Play className="ml-0.5 h-5 w-5 text-[#1a1a1a] md:h-6 md:w-6" fill="currentColor" />
              </button>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 flex flex-col items-start gap-5 border-t border-[#d4cfc5] pt-6 md:mt-8 md:flex-row md:items-start md:justify-between md:gap-8 md:pt-8">
          <div className="max-w-[640px] border-l-[1.5px] border-[#1a1a1a] pl-5 md:pl-6">
            <p className="text-sm italic leading-[1.7] text-[#1a1a1a] md:text-[15px]">
              {content.caption}
            </p>
          </div>
          <a
            href={content.cta.href}
            className="inline-flex items-center gap-2 text-sm text-[#1a1a1a] transition-opacity duration-200 hover:opacity-60 md:whitespace-nowrap md:pt-1 md:text-[15px]"
          >
            {content.cta.label}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.8858 4.91303C19.884 4.41725 19.4816 4.01629 18.9858 4.01629L11.1532 4.01629C10.6562 4.01629 10.2532 4.41923 10.2532 4.91629C10.2532 5.41334 10.6562 5.81629 11.1532 5.81629L16.8161 5.81629L4.29345 18.3642C3.94233 18.7161 3.94291 19.2859 4.29473 19.637C4.64656 19.9882 5.21641 19.9876 5.56752 19.6358L18.0936 7.08434L18.1142 12.7805C18.116 13.2775 18.5204 13.679 19.0175 13.6772C19.5145 13.6754 19.916 13.271 19.9142 12.774L19.8858 4.91303Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}