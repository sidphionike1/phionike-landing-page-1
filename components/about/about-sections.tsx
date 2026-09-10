import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AboutPage } from "@/content/schema"
// import {TeamGrid} from "@/components/about/team-grid"
import { TeamGrid } from "./TeamGrid"

// ── Colour helpers ──────────────────────────────────────────────────────────
const ACCENT_HEX: Record<string, string> = {
  cobalt:     "#3d38ff",
  terracotta: "#ff5428",
  lavender:   "#d6a7f5",
  mustard:    "#f9bd00",
}
const TILE_BG: Record<string, string> = {
  cobalt:     "bg-primary",
  terracotta: "bg-accent",
  lavender:   "bg-lavender",
  mustard:    "bg-mustard",
}
const TILE_TEXT: Record<string, string> = {
  cobalt:     "text-white",
  terracotta: "text-white",
  lavender:   "text-foreground",
  mustard:    "text-foreground",
}

// ─── 1. Hero ────────────────────────────────────────────────────────────────
// Left-aligned headline spanning full width, body text left + CTAs right

export interface AboutHeroProps {
  content?: {
    eyebrow?: string;
    headlineParts?: Array<{ text: string; accent?: boolean }>;
    body?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    stripImage?: {
      desktopSrc: string;
      mobileSrc: string;
      alt?: string;
    };
  };
}

export function AboutHero({ content }: AboutHeroProps) {
  // Default values matching your Figma screenshot
  const eyebrow = content?.eyebrow ?? 'ABOUT PHIONIKE';
  const headlineParts = content?.headlineParts ?? [
    { text: 'We design with ' },
    { text: 'purpose.', accent: true },
    { text: ' We build for ' },
    { text: 'impact.', accent: true },
  ];
  const body =
    content?.body ??
    'We partner with ambitious businesses to create products, brands and experiences that solve meaningful problems through strategy, design and technology.';
  const primaryCta = content?.primaryCta ?? {
    label: 'View Our Work',
    href: '#work',
  };
  const secondaryCta = content?.secondaryCta ?? {
    label: 'Let\'s Talk',
    href: '#contact',
  };

  // Separate image sources for desktop and mobile
  const stripImage = content?.stripImage ?? {
    desktopSrc: '/about/hero-strip-desktop.png',
    mobileSrc: '/about/hero-strip-mobile.png',
    alt: 'The Phionike team collaborating',
  };

  return (
    <section className="relative w-full overflow-x-hidden bg-[#faf8f5] pt-20 md:pt-24 font-sans">
      <div className="section-shell">
        <p className="type-sans-regular pt-6 text-eyebrow leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]/60 md:pt-10">
          {eyebrow}
        </p>

        <h1 className="type-sans-regular mt-6 max-w-4xl text-[36px] leading-[46.8px] tracking-[-2px] text-[#212121] md:text-hero md:leading-[105%] md:tracking-[-2px]">
          {headlineParts.map((part, i) =>
            part.accent ? (
              <span key={i} className="text-[#ff5b23]">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-12">
          <p className="type-sans-regular max-w-xl text-body leading-[150%] text-[#36454F]">
            {body}
          </p>

          <div className="flex shrink-0 items-center gap-6">
            <a
              href={primaryCta.href}
              className="type-sans-semibold inline-flex items-center justify-center rounded-full bg-[#1e1e1e] px-7 py-3.5 text-body-sm leading-normal text-white transition-opacity hover:opacity-90"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="type-sans-medium inline-flex items-center gap-1.5 text-body-sm leading-[21px] text-[#262728]"
            >
              {secondaryCta.label}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Full Viewport-Width Image Strip — Height strictly 288px */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 h-[288px] overflow-hidden">
        <picture className="w-full h-full block">
          {/* Desktop Image */}
          <source media="(min-width: 768px)" srcSet={stripImage.desktopSrc} />
          {/* Mobile Fallback Image */}
          <img
            src={stripImage.mobileSrc}
            alt={stripImage.alt ?? 'Hero strip image'}
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>
    </section>
  );
}

// ─── 2. Mosaic Strip ────────────────────────────────────────────────────────
// Full-bleed 2-row grid of square headshot + colour tiles — no max-w container

export function MosaicStrip({ tiles }: { tiles: AboutPage["hero"]["mosaicTiles"] }) {
  // Repeat the array twice to create two visible rows
  const row1 = tiles
  const row2 = [...tiles].reverse()

  return (
    <div className="mt-10 overflow-hidden" aria-hidden="true">
      {[row1, row2].map((row, rowIdx) => (
        <div key={rowIdx} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
          {row.map((tile, i) => (
            <div
              key={`${rowIdx}-${i}`}
              className={`aspect-square overflow-hidden rounded-md ${
                tile.type === "color"
                  ? TILE_BG[tile.value ?? "cobalt"]
                  : "bg-muted"
              }`}
            >
              {tile.type === "photo" && (
                <Image
                  src={tile.src ?? ""}
                  alt=""
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── 3. Values Section ──────────────────────────────────────────────────────
// Centered heading + 3-col grid with title, body, and coloured accent bar

export function ValuesSection({ content }: { content: AboutPage["values"] }) {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="section-shell">
        {/* Centred heading block */}
        <div className="text-center">
          <p className="type-sans-regular text-eyebrow leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]/60">
            {content.eyebrow}
          </p>
          <h2 className="type-sans-regular mt-8 text-faq leading-[42.9px] text-[#3A39FF] md:text-hero md:leading-[78px]">
            {content.headingPlain}
          </h2>
          <h2 className="type-sans-regular mt-5 text-faq leading-[42.9px] text-[#212121]/60 md:text-hero md:leading-[78px]">
            {content.headingAccent}
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {content.items.map((item) => (
            <div key={item.title} className="mt-4 flex flex-col">
              <h3 className="type-vf-regular text-title leading-[28px] text-[#212121]">
                {item.title}
              </h3>
              <p className="type-vf-regular mt-3 flex-1 text-body leading-[22.5px] text-[#212121]/60">
                {item.body}
              </p>
              {/* Coloured accent bar beneath body */}
              <div
                className="mt-4 h-[1px] w-full rounded-full"
                style={{
                  backgroundColor: ACCENT_HEX[item.accentColor],
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 4. Team Section ────────────────────────────────────────────────────────
// Intro block (text with left border + group photo) then bento grid

type Tile = AboutPage["team"]["tiles"][number]

function renderTile(tile: Tile) {
  const colSpan = `md:col-span-${tile.gridSpan.col}`
  const rowSpan = `md:row-span-${tile.gridSpan.row}`

  // ── decorativeBar — full-width thin colour strip ──
  if (tile.kind === "decorativeBar") {
    return (
      <div key={tile.id} className="md:col-span-4 flex items-center" aria-hidden="true">
        <div className={`h-8 w-full rounded-2xl ${TILE_BG[tile.bgColor]}`} />
      </div>
    )
  }

  // ── decorativeFill — solid colour block ──
  if (tile.kind === "decorativeFill") {
    return (
      <div
        key={tile.id}
        className={`${colSpan} ${rowSpan} rounded-2xl ${TILE_BG[tile.bgColor]}`}
        aria-hidden="true"
      />
    )
  }

  // ── member tiles ──
  const member = tile
  const bg = member.bgColor ? TILE_BG[member.bgColor] : "bg-card"
  const fg = member.bgColor ? TILE_TEXT[member.bgColor] : "text-foreground"

  switch (member.tileType) {
    case "photoOnly":
      return (
        <div
          key={member.id}
          className={`${colSpan} ${rowSpan} relative overflow-hidden rounded-2xl bg-muted`}
        >
          <Image
            src={member.photoSrc ?? ""}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </div>
      )

    case "bioText":
      return (
        <div
          key={member.id}
          className={`${colSpan} ${rowSpan} flex flex-col justify-end rounded-2xl p-6 ${bg} ${fg}`}
        >
          <p className="text-sm font-bold leading-snug">{member.name}</p>
          <p className="mt-0.5 text-xs opacity-70">{member.role}</p>
          {member.bio && (
            <p className="mt-3 text-xs leading-relaxed opacity-85">{member.bio}</p>
          )}
        </div>
      )

    case "photoCaption":
      return (
        <div
          key={member.id}
          className={`group ${colSpan} ${rowSpan} relative overflow-hidden rounded-2xl ${member.bgColor ? bg : "bg-muted"}`}
        >
          <Image
            src={member.photoSrc ?? ""}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 50vw, 25vw"
          />
          {/* Always-visible gradient caption */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-12">
            <p className="text-sm font-semibold text-white">{member.name}</p>
            <p className="mt-0.5 text-xs text-white/70">{member.role}</p>
          </div>
        </div>
      )

    case "nameOnly":
      return (
        <div
          key={member.id}
          className={`${colSpan} ${rowSpan} flex flex-col justify-end rounded-2xl p-6 ${bg} ${fg}`}
        >
          <p className="text-sm font-bold">{member.name}</p>
          <p className="mt-0.5 text-xs opacity-70">{member.role}</p>
        </div>
      )

    default:
      return null
  }
}

export function TeamSection({ content }: { content: AboutPage["team"] }) {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#FDF8F0" }}>
      <div className="section-shell">
        {/* Intro: text block (40%) + group photo (60%) */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
          <div className="border-l border-border pl-6 md:pl-8">
            <p className="type-sans-regular text-caption leading-[16.5px] tracking-[3.3px] text-[#FF5B23]">
              {content.eyebrow}
            </p>
            <h2 className="type-sans-regular mt-4 text-faq leading-[53.76px] md:text-display-sm md:leading-[53.76px] text-[#212121]">
              {content.headingDark}
              <br />
              <span className="opacity-60">{content.headingMuted}</span>
            </h2>
          </div>
          <div className="relative h-[200px] md:h-[345px] w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={content.introPhotoSrc}
              alt="The Phionike team"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Bento grid */}
        <TeamGrid />
      </div>
    </section>
  )
}

// ─── 5. Culture Section ─────────────────────────────────────────────────────
// Centred heading + full-width establishing photo + 4 alternating bands
const BAND_BG: Record<string, string> = {
  terracotta: "#ff5428",
  lavender:   "#d6a7f5",
  cobalt:     "#3d38ff",
  mustard:    "#f9bd00",
}
const BAND_TEXT: Record<string, string> = {
  terracotta: "#fff",
  lavender:   "#111",
  cobalt:     "#fff",
  mustard:    "#111",
}

const PLACEHOLDER = (w: number, h: number, text: string) =>
  `https://placehold.co/${w}x${h}/e5e5e5/666666?text=${encodeURIComponent(text)}`;


export function CultureSection({ content }: { content: AboutPage["culture"] }) {
  return (
    <section style={{ backgroundColor: "#FDF8F0" }}>
      <div className="section-shell">
        {/* Heading */}
        <div className="py-16 md:py-20">
          <p className="type-sans-medium text-caption leading-[16.5px] tracking-[3.3px] text-[#212121]/60">
            {content.eyebrow}
          </p>
          <h2 className="type-vf-regular mt-4 text-display-sm leading-[53.76px] text-[#212121] md:text-display-sm md:leading-[53.76px]">
            {content.headingPlain}{" "}
            <em className="type-vf-italic">
              {content.headingItalic}
            </em>
          </h2>
        </div>

        {/* Hero image — hover overlay on desktop, always visible on mobile */}
        <div className="group relative aspect-[21/8] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={content.introPhotoSrc || PLACEHOLDER(1200, 400, "Life at Phionike")}
            alt="Life at Phionike"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1198px) 100vw, 1198px"
          />
          {/* Desktop: overlay on hover */}
          <div className="absolute inset-0 hidden flex-col justify-end bg-black/60 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
            <h3 className="type-vf-medium text-display-sm leading-normal text-white">
              Where curiosity becomes collaboration.
            </h3>
            <p className="type-vf-medium mt-3 max-w-xl text-title leading-normal text-white">
              Every project is powered by people who question, explore and create
              together. We believe the best ideas emerge through open
              conversations, shared ownership and a culture of continuous
              learning.
            </p>
          </div>
          {/* Mobile: always-visible overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-6 md:hidden">
            <h3 className="type-sans-medium text-title leading-normal text-white">
              Where curiosity becomes collaboration.
            </h3>
            <p className="type-sans-regular mt-2 max-w-md text-eyebrow leading-normal text-white/90">
              Every project is powered by people who question, explore and create
              together. We believe the best ideas emerge through open
              conversations, shared ownership and a culture of continuous
              learning.
            </p>
          </div>
        </div>

        {/* 4 alternating bands */}
        <div className="flex flex-col gap-5 pb-20 pt-10">
          {content.bands.map((band, bandIndex) => {
            const photoLeft = band.photoSide === "left"
            const bg = BAND_BG[band.bgColor] ?? "#eee"
            const fg = BAND_TEXT[band.bgColor] ?? "#111"
            const titleWeight =
              bandIndex === 0 ? "type-sans-medium md:type-sans-regular" : "type-sans-regular"

            return (
              <div
                key={band.id}
                className={`grid h-[246px] grid-cols-1 grid-rows-[1fr_3fr] overflow-hidden rounded-3xl md:grid-rows-1 ${
                  photoLeft ? "md:grid-cols-[44fr_56fr]" : "md:grid-cols-[56fr_44fr]"
                }`}
              >
                {/* Text side — order-1 on mobile (top), desktop follows photoSide */}
                <div
                  className={`order-1 flex items-center px-8 py-10 md:px-14 md:py-16 ${
                    photoLeft ? "md:order-2" : "md:order-1"
                  }`}
                  style={{ backgroundColor: bg, color: fg }}
                >
                  {/* photo left → text right-aligned; photo right → text left-aligned */}
                  <div className={cn("w-full", photoLeft ? "md:text-right" : "md:text-left")}>
                    <h3 className={`${titleWeight} text-title leading-tight md:text-display-sm md:leading-normal`}>
                      {band.title}
                    </h3>
                    <p
                      className={cn(
                        "type-sans-regular mt-4 max-w-sm text-eyebrow leading-normal md:text-title md:leading-normal",
                        photoLeft && "md:ml-auto",
                      )}
                    >
                      {band.body}
                    </p>
                  </div>
                </div>

                {/* Photo side — order-2 on mobile (bottom), desktop follows photoSide */}
                <div
                  className={`relative h-full bg-muted ${
                    photoLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={band.photoSrc || PLACEHOLDER(600, 400, band.title)}
                    alt={band.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

