import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { CSSProperties } from "react"
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
    { text: '\nWe build for ' },
    { text: 'impact.', accent: true },
  ];
  const body =
    content?.body ??
    'We partner with ambitious businesses to create products, brands and experiences that solve meaningful problems\nthrough strategy, design and technology.';
  const secondaryCta = content?.primaryCta ?? {
    label: "Let's Talk",
    href: '/contact',
  };
  const primaryCta = content?.secondaryCta ?? {
    label: 'View Our Work',
    href: '/work',
  };

  // Separate image sources for desktop and mobile
  const stripImage = content?.stripImage ?? {
    desktopSrc: '/about/hero-strip-desktop.png',
    mobileSrc: '/about/hero-strip-mobile.png',
    alt: 'The Phionike team collaborating',
  };

  const firstLine = headlineParts.slice(0, 2)
  const restLines = headlineParts.slice(2)

  const renderPart = (
    part: { text: string; accent?: boolean },
    i: number,
    className: string,
  ) =>
    part.accent ? (
      <span key={i} className={className}>
        {part.text}
      </span>
    ) : (
      <span key={i}>{part.text}</span>
    )

  return (
    <section className="relative w-full overflow-x-hidden bg-[#FDF8F0] pt-32 font-sans md:pt-40">
      {/* Mobile: tighter gutters so “We design with purpose.” stays one line */}
      <div className="section-shell [--section-pad-x:0.75rem] md:[--section-pad-x:1.5rem]">
        <p className="type-sans-regular text-eyebrow leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]/60">
          {eyebrow}
        </p>

        <h1 className="mt-6 max-w-4xl whitespace-pre-line font-vf text-[36px] font-normal leading-[46.8px] tracking-[-2px] text-[#212121] md:font-sans md:text-hero md:leading-[105%] md:tracking-[-2px]">
          <span className="whitespace-nowrap md:whitespace-normal">
            {firstLine.map((part, i) =>
              renderPart(part, i, "text-[#ff5b23]"),
            )}
          </span>
          {restLines.map((part, i) =>
            renderPart(part, i + firstLine.length, "text-[#ff5b23]"),
          )}
        </h1>

        {/* Body left + CTAs right — top-aligned to match Figma */}
        <div className="mt-8 flex flex-col gap-8 pb-14 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-10 md:pb-16">
          <p className="max-w-xl whitespace-normal font-vf text-body font-normal leading-[150%] text-[#36454F] md:max-w-[860px] md:whitespace-pre-line md:font-sans">
            {body}
          </p>

          <div className="flex shrink-0 items-center gap-6">
            <a
              href={primaryCta.href}
              className="type-sans-semibold inline-flex items-center justify-center gap-2 rounded-full bg-[#1e1e1e] px-7 py-4 text-body-sm leading-normal text-white transition-opacity hover:opacity-90"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="type-sans-medium inline-flex items-center gap-2 text-body-sm leading-[21px] text-[#262728]"
            >
              {secondaryCta.label}
              <ArrowUpRight size={15} className="text-[#FF5B23]" />
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
    <section className="bg-[#FFFCF7] py-[60px] md:py-32">
      <div className="section-shell [--section-pad-x:1.25rem] md:[--section-pad-x:1.5rem]">
        {/* Centred heading block */}
        <div className="text-center">
          <p className="type-sans-regular text-eyebrow leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]/60">
            {content.eyebrow}
          </p>
          <h2 className="type-sans-regular mt-[18px] text-[33px] leading-[42.9px] md:mt-8 md:text-hero md:leading-[64px]">
            <span className="text-[#3A39FF]">{content.headingPlain} </span>
            <span className="block text-[#212121]/60">{content.headingAccent}</span>
          </h2>
        </div>

        <div className="mt-[60px] grid grid-cols-1 gap-x-8 gap-y-5 md:mt-20 md:grid-cols-3 md:gap-y-12">
          {content.items.map((item) => (
            <div key={item.title} className="flex flex-col md:mt-4">
              <h3 className="type-sans-regular text-title leading-[28px] text-[#212121] md:font-vf">
                {item.title}
              </h3>
              <p className="type-sans-regular mt-3 flex-1 text-body leading-[22.5px] text-[#212121]/60 md:font-vf">
                {item.body}
              </p>
              {/* Coloured accent bar beneath body */}
              <div
                className="mt-6 h-[1px] w-full rounded-full md:mt-4"
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
    <section className="bg-[#FDF8F0] py-20 md:py-28">
      <div className="section-shell">
        {/* Intro: text block (40%) + group photo (60%) */}
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-[2fr_3fr] md:gap-12">
          <div className="flex items-start gap-[30px] md:block md:border-l md:border-border md:pl-8">
            <span
              aria-hidden="true"
              className="mt-1 h-[150px] w-px shrink-0 bg-border md:hidden"
            />
            <div>
              <p className="type-sans-regular text-[11px] leading-[16.5px] tracking-[3.3px] uppercase text-[#FF5B23] md:text-caption">
                {content.eyebrow}
              </p>
              <h2 className="type-sans-regular mt-5 text-[33px] leading-[53.76px] text-[#212121] md:mt-4 md:text-display-sm md:leading-[53.76px]">
                <span className="block">{content.headingDark}</span>
                <span className="mt-1.5 block opacity-60 md:mt-0">
                  {content.headingMuted}
                </span>
              </h2>
            </div>
          </div>
          <div className="relative h-[175px] w-full overflow-hidden rounded-2xl bg-muted md:h-[345px]">
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
const MOBILE_BAND_BG: Record<string, string> = {
  terracotta: "#FF5B23",
  lavender:   "#DCB8FF",
  cobalt:     "#3A39FF",
  mustard:    "#F2BB06",
}
const MOBILE_BAND_TEXT: Record<string, string> = {
  terracotta: "#fff",
  lavender:   "#212121",
  cobalt:     "#fff",
  mustard:    "#212121",
}

const PLACEHOLDER = (w: number, h: number, text: string) =>
  `https://placehold.co/${w}x${h}/e5e5e5/666666?text=${encodeURIComponent(text)}`;


export function CultureSection({ content }: { content: AboutPage["culture"] }) {
  return (
    <section className="bg-[#FFFCF7]">
      <div className="section-shell [--section-pad-x:1.25rem] md:[--section-pad-x:1.5rem]">
        {/* Heading */}
        <div className="pt-[60px] pb-0 md:py-20">
          <p className="type-sans-medium text-[11px] leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]/60 md:text-caption">
            {content.eyebrow}
          </p>
          <h2 className="type-vf-regular mt-5 text-[44.8px] leading-[53.76px] text-[#212121] md:mt-4 md:text-display-sm md:leading-[53.76px]">
            <span className="max-md:block">{content.headingPlain}</span>
            <em className="type-vf-italic max-md:mt-0 max-md:block">
              <span className="md:hidden">
                a balance of rigor
                <br />
                and play
              </span>
              <span className="hidden md:inline"> {content.headingItalic}</span>
            </em>
          </h2>
        </div>

        {/* Hero image — darken on hover; orange bar grows 0→20px (desktop) */}
        <div className="group relative isolate mt-[41px] h-[226px] w-full overflow-hidden rounded-[30px] bg-muted md:mt-0 md:aspect-[21/8] md:h-auto md:rounded-2xl">
          <Image
            src={content.introPhotoSrc || PLACEHOLDER(1200, 400, "Life at Phionike")}
            alt="Life at Phionike"
            fill
            className="object-cover"
            sizes="(max-width: 1198px) 100vw, 1198px"
          />
          {/* Desktop: darken + orange edge + copy on hover — no scale */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-0 bg-[#FF5B24] transition-[width] duration-500 ease-out group-hover:w-5 md:block"
          />
          <div className="absolute inset-0 hidden flex-col justify-center bg-black/0 py-8 pr-8 pl-[100px] transition-colors duration-500 group-hover:bg-black/40 md:flex">
            <div className="max-w-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h3 className="type-vf-medium text-display-sm leading-normal text-white">
                Where curiosity becomes
                <br />
                collaboration.
              </h3>
              <p className="type-vf-medium mt-3 text-title leading-normal text-white">
                Every project is powered by people who question, explore and create
                together. We believe the best ideas emerge through open
                conversations, shared ownership and a culture of continuous
                learning.
              </p>
            </div>
          </div>
          {/* Mobile: always-visible overlay + fixed orange accent bar */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 z-10 w-[15px] bg-[#FF5B23] md:hidden"
          />
          <div className="absolute inset-0 flex flex-col justify-start bg-black/[0.53] pt-[52px] pr-6 pl-[31px] md:hidden">
            <h3 className="type-sans-medium text-left text-[20px] leading-[normal] text-white">
              Where curiosity becomes collaboration.
            </h3>
            <p className="type-sans-medium mt-3 text-left text-[12px] leading-[normal] text-white">
              Every project is powered by people who question, explore and create
              together. We believe the best ideas emerge through open
              conversations, shared ownership and a culture of continuous
              learning.
            </p>
          </div>
        </div>

        {/* 4 alternating bands — mobile: 50/50 side-by-side; desktop unchanged */}
        <div className="flex flex-col gap-4 pb-20 pt-4 md:gap-5 md:pt-10">
          {content.bands.map((band, index) => {
            const photoLeftDesktop = band.photoSide === "left"
            // Mobile Figma: Learn/Grow = text|image; Build/Care = image|text
            const photoLeftMobile = index % 2 === 1
            const bg = BAND_BG[band.bgColor] ?? "#eee"
            const fg = BAND_TEXT[band.bgColor] ?? "#111"
            const mobileBg = MOBILE_BAND_BG[band.bgColor] ?? bg
            const mobileFg = MOBILE_BAND_TEXT[band.bgColor] ?? fg

            return (
              <div
                key={band.id}
                className={cn(
                  "grid h-[176px] overflow-hidden rounded-[30px] md:h-[246px] md:grid-rows-1 md:rounded-3xl",
                  photoLeftMobile
                    ? "grid-cols-[minmax(0,140px)_minmax(220px,1fr)]"
                    : "grid-cols-[minmax(220px,1fr)_minmax(0,140px)]",
                  photoLeftDesktop
                    ? "md:grid-cols-[44fr_56fr]"
                    : "md:grid-cols-[56fr_44fr]",
                )}
              >
                <div
                  className={cn(
                    "flex min-h-0 min-w-[220px] items-start overflow-hidden px-5 pt-[33px] text-left md:min-w-0 md:items-center md:px-16 md:py-[4.5rem]",
                    photoLeftMobile ? "order-2" : "order-1",
                    photoLeftDesktop ? "md:order-2" : "md:order-1",
                    "[background-color:var(--band-bg)] [color:var(--band-fg)] md:[background-color:var(--band-bg-md)] md:[color:var(--band-fg-md)]",
                  )}
                  style={{
                    "--band-bg": mobileBg,
                    "--band-fg": mobileFg,
                    "--band-bg-md": bg,
                    "--band-fg-md": fg,
                  } as CSSProperties}
                >
                  <div
                    className={cn(
                      "w-full text-left md:max-w-none",
                      photoLeftDesktop ? "md:text-left" : "md:text-right",
                    )}
                  >
                    <h3 className="type-sans-regular text-[20px] leading-[1.15] md:text-display-sm md:leading-normal">
                      {band.title}
                    </h3>
                    <p
                      className={cn(
                        "type-sans-regular mt-2.5 text-[12px] leading-[1.2] md:mt-3.5 md:max-w-sm md:text-body-sm md:leading-[150%]",
                        photoLeftDesktop && "md:mr-auto",
                        !photoLeftDesktop && "md:ml-[40px] md:inline-block",
                      )}
                    >
                      {band.body}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "relative h-full min-w-0 overflow-hidden bg-muted",
                    photoLeftMobile ? "order-1" : "order-2",
                    photoLeftDesktop ? "md:order-1" : "md:order-2",
                  )}
                >
                  <Image
                    src={band.photoSrc || PLACEHOLDER(600, 400, band.title)}
                    alt={band.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 50vw"
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

