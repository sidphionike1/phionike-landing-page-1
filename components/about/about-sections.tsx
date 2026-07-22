import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { AboutPage } from "@/content/schema"

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

export function AboutHero({ content }: { content: AboutPage["hero"] }) {
  return (
    <section className="bg-background px-5 pb-0 pt-20 md:px-6 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-muted-foreground">{content.eyebrow}</p>

        {/* Headline — multi-colour spans */}
        <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
          {content.headlineParts.map((part, i) =>
            part.accent ? (
              <span key={i} className="text-accent">{part.text}</span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </h1>

        {/* Body + CTAs — two-column row */}
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            {content.body}
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex items-center gap-1.5 text-sm text-foreground/70"
            >
              {content.secondaryCta.label}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
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
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Centred heading block */}
        <div className="text-center">
          <p className="eyebrow text-muted-foreground">{content.eyebrow}</p>
          <h2 className="mt-5 text-5xl font-medium text-primary md:text-6xl">
            {content.headingPlain}
          </h2>
          <h2 className="mt-1 text-5xl font-medium text-muted-foreground md:text-6xl">
            {content.headingAccent}
          </h2>
        </div>

        {/* Values grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {content.items.map((item) => (
            <div key={item.title} className="flex flex-col">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
              {/* Coloured accent bar beneath body */}
              <div
                className="mt-5 h-0.5 w-10 rounded-full"
                style={{ backgroundColor: ACCENT_HEX[item.accentColor] }}
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
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Intro: text block (left border) + group photo */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="border-l-2 border-border pl-6">
            <p className="eyebrow text-accent">{content.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              {content.headingDark}
              <br />
              <span className="text-muted-foreground">{content.headingMuted}</span>
            </h2>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
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
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
          {content.tiles.map((tile) => renderTile(tile))}
        </div>
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

export function CultureSection({ content }: { content: AboutPage["culture"] }) {
  return (
    <section className="bg-background">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
        <p className="eyebrow text-muted-foreground">{content.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
          {content.headingPlain}{" "}
          <em className="font-serif font-normal italic">{content.headingItalic}</em>
        </h2>
      </div>

      {/* Establishing photo — full bleed */}
      <div className="relative aspect-[21/8] w-full overflow-hidden bg-muted">
        <Image
          src={content.introPhotoSrc}
          alt="Life at Phionike"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 4 alternating bands — rounded floating cards */}
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 pb-20 pt-10 md:px-6">
        {content.bands.map((band) => {
          const photoLeft = band.photoSide === "left"
          const bg = BAND_BG[band.bgColor] ?? "#eee"
          const fg = BAND_TEXT[band.bgColor] ?? "#111"

          return (
            <div
              key={band.id}
              className="grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-2"
            >
              {/* Photo side */}
              <div
                className={`relative aspect-[4/3] bg-muted md:aspect-auto md:min-h-[320px] ${photoLeft ? "md:order-1" : "md:order-2"}`}
              >
                <Image
                  src={band.photoSrc}
                  alt={band.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              {/* Text side */}
              <div
                className={`flex items-center px-10 py-12 md:px-14 md:py-16 ${photoLeft ? "md:order-2" : "md:order-1"}`}
                style={{ backgroundColor: bg, color: fg }}
              >
                <div className={photoLeft ? "" : "md:text-center"}>
                  <h3 className="text-2xl font-semibold md:text-3xl">{band.title}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-90 md:text-base">
                    {band.body}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
