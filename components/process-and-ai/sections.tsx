'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, ArrowDown, ChevronDown, Code2, Sparkles, Search, Layers, CheckCircle2, Compass, Cpu, Activity, User, type LucideIcon } from 'lucide-react'
import type { ProcessAndAi } from '@/content/schema'

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
/** Desktop hero backdrop — soft gradient band behind the headline. */
const HERO_BG_IMAGE = '/process-and-ai/Hero.png'
/** Mobile hero backdrop — warm wash sitting under the copy. */
const HERO_BG_MOBILE = '/process-and-ai/hero-bg-mobile.png'

export function ProcessAiHero({ hero }: { hero: ProcessAndAi['hero'] }) {
  const headlineLines = hero.headlineMain.split('\n').filter(Boolean)

  return (
    // `isolate` keeps the -z-10 backdrop above the section fill and below the copy.
    // Top padding clears the fixed navbar, matching the home hero (pt-32 / md:pt-40).
    <section className="relative isolate w-full overflow-hidden bg-[#FDF8F0] pt-32 pb-16 md:pt-40 md:pb-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 md:hidden"
      >
        <Image
          src={HERO_BG_MOBILE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      >
        <Image
          src={HERO_BG_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative section-shell flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="type-sans-regular text-caption uppercase tracking-[0.12em] text-[#121212]/60 md:text-body-sm md:leading-normal md:tracking-[3px]"
        >
          {hero.badge}
        </motion.p>

        {/* Three-line headline matching Figma: Where Human / Thinking Meets / Intelligent Execution */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-sans-medium mt-6 max-w-[820px] text-[36px] leading-[44px] tracking-[-0.5px] text-[#121212] md:text-hero md:leading-[80px] md:tracking-[-0.8px] min-[900px]:max-[1199.98px]:!leading-[1.2]"
        >
          {headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="type-sans-regular mt-4 max-w-[600px] text-body-lg leading-[24px] text-[#121212]/80 md:max-w-[520px] md:whitespace-pre-line md:text-title md:leading-[160%]"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="/work"
            className="type-sans-semibold inline-flex items-center rounded-full bg-ink px-7 py-4 text-body-sm leading-normal text-white md:text-body"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href="/contact"
            className="type-sans-medium inline-flex items-center gap-2 text-body-sm leading-[21px] text-[#121212]"
          >
            {hero.secondaryCta}
            <ArrowUpRight size={15} className="text-[#3A39FF]" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── COMPARISON SECTION ─────────────────────────────────────────────────────────────
/** Fill for the Phionike card and for the highlighted pills on the white card. */
const PROCESS_BLUE = 'rgba(58,57,255,1)'
/** Process-blue pills on the blue card (Prototype A / B): fill + white 1px ring. */
const BADGE_BLUE = '#2538F5'

type FlowItem = { text: string; badge: boolean; badgeColor?: string }

function ProcessColumn({
  title,
  label,
  rows,
  description,
  variant,
  fromX,
  delay = 0,
}: {
  title: string
  label: string
  rows: readonly FlowItem[][]
  description: string
  variant: 'light' | 'blue'
  fromX: number
  delay?: number
}) {
  const isBlue = variant === 'blue'
  const lastRowIdx = rows.length - 1
  const mobileItems = rows.flat().filter((item) => item.text)
  // Desktop: keep each flow row on one line (Validation must sit with Brief → … → Prototype A).
  const pill =
    'type-sans-regular inline-flex shrink-0 items-center gap-1 rounded-[12px] px-3 py-2 text-[12px] leading-normal whitespace-nowrap max-md:!font-[400] md:gap-1.5 md:px-3.5 md:py-2 md:text-label md:!font-[650]'

  const renderPill = (item: FlowItem) => {
    const accentFill =
      item.badge && item.badgeColor && item.badgeColor !== BADGE_BLUE
        ? item.badgeColor
        : undefined

    if (isBlue) {
      if (item.badge && item.badgeColor === BADGE_BLUE) {
        return (
          <span
            className={`${pill} border border-white text-white`}
            style={{ backgroundColor: item.badgeColor }}
          >
            {item.text}
          </span>
        )
      }
      if (accentFill) {
        return (
          <span className={`${pill} text-white`} style={{ backgroundColor: accentFill }}>
            <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden="true" />
            {item.text}
          </span>
        )
      }
      return <span className={`${pill} bg-white text-[#121212] md:text-ink`}>{item.text}</span>
    }
    if (item.badge) {
      return (
        <span className={`${pill} text-white`} style={{ backgroundColor: PROCESS_BLUE }}>
          {item.text}
        </span>
      )
    }
    return (
      <span className={`${pill} border border-[#E4DED6] bg-white text-[#121212] md:text-ink`}>
        {item.text}
      </span>
    )
  }

  const renderArrow = () => (
    <ArrowRight
      className={`h-4 w-4 shrink-0 ${isBlue ? 'text-white/70' : 'text-[#8A847C]'}`}
      strokeWidth={2.5}
      aria-hidden="true"
    />
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`flex min-w-0 flex-col rounded-[24px] p-5 md:p-7 ${
        isBlue
          ? ''
          : 'border border-[#EDE7DF] bg-white shadow-[0_1px_3px_rgba(17,17,17,0.04)]'
      }`}
      style={isBlue ? { backgroundColor: PROCESS_BLUE } : undefined}
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
        <h3
          className={`type-sans-bold text-[14px] leading-normal tracking-normal uppercase max-md:!font-[750] md:text-title-sm md:!font-[650] ${isBlue ? 'text-white' : 'text-[#666666] md:text-[#121212]'}`}
        >
          {title}
        </h3>
        <span
          className={
            isBlue
              ? 'type-sans-regular text-[12px] leading-normal text-[#fff] max-md:!font-[400] md:text-eyebrow md:!font-[650] font-[550]'
              : 'type-sans-regular text-[12px] leading-normal text-[#666666] max-md:!font-[400] md:text-eyebrow md:!font-[650]'
          }
        >
          {label}
        </span>
      </div>

      {/* Mobile: one wrapping sequence — skip desktop row breaks and spacer cells. */}
      <div className="mt-5 flex flex-wrap items-center gap-2 md:hidden">
        {mobileItems.map((item, i) => (
          <div key={`${item.text}-${i}`} className="flex shrink-0 items-center gap-2">
            {renderPill(item)}
            {i < mobileItems.length - 1 ? renderArrow() : null}
          </div>
        ))}
      </div>

      {/* Desktop rows — nowrap so first-row items (incl. Validation) stay together. */}
      <div className="mt-8 hidden flex-col gap-4 overflow-x-auto md:flex">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-nowrap items-center gap-2.5">
            {row.map((item, itemIdx) => {
              // The flow continues past every step, so a wrapped row normally ends
              // on a connector leading into the next one. When the next row already
              // opens with the intentionally empty item from the content file, that
              // item is the connector — don't draw a second one.
              const isRowEnd = itemIdx === row.length - 1
              const nextRowOpensWithConnector = rows[rowIdx + 1]?.[0]?.text === ''
              const showArrow = !(
                isRowEnd && (rowIdx === lastRowIdx || nextRowOpensWithConnector)
              )

              return (
                <div key={itemIdx} className="flex shrink-0 items-center gap-2.5">
                  {item.text ? renderPill(item) : null}
                  {showArrow ? renderArrow() : null}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* mt-auto keeps both descriptions on the same baseline when one column
          wraps to an extra row. */}
      <div className="mt-auto pt-5">
        <p
          className={`type-sans-regular text-[13px] leading-[18px] tracking-normal ${
            isBlue ? 'text-white/90' : 'text-[#606673] md:text-[#36454f]'
          }`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function ComparisonSection({ section }: { section: ProcessAndAi['comparisonSection'] }) {
  return (
    <section className="section-shell pt-16 pb-16 [--section-pad-x:1rem] md:pt-24 md:pb-20 md:[--section-pad-x:1.5rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="type-sans-regular text-[11px] leading-normal tracking-[2px] uppercase text-[#121212] max-md:!font-[400] md:text-eyebrow md:leading-[16.5px] md:tracking-[3.3px] md:text-[#212121] md:!font-[550]">
          {section.badge}
        </p>
        {/* Mobile 28/36 / -0.5px; desktop Sans Regular/Light Italic 40/52. */}
        <h2 className="type-sans-regular mt-3 max-w-[900px] text-[28px] leading-[36px] tracking-[-0.5px] text-[#121212] md:mt-8 md:text-display-xs md:leading-[52px] md:tracking-normal">
          {section.titleMain}{' '}
          <span className="type-sans-light-italic text-[28px] leading-[36px] text-[#121212]/40 md:block md:text-display-xs md:leading-[52px]">
            {section.titleSub}
          </span>
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-2">
        <ProcessColumn
          title={section.traditionalApproach.title}
          label={section.traditionalApproach.label}
          rows={section.traditionalApproach.rows}
          description={section.traditionalApproach.description}
          variant="light"
          fromX={-20}
        />
        <ProcessColumn
          title={section.phionikeApproach.title}
          label={section.phionikeApproach.label}
          rows={section.phionikeApproach.rows}
          description={section.phionikeApproach.description}
          variant="blue"
          fromX={20}
          delay={0.1}
        />
      </div>
    </section>
  )
}

// ─── PHASES GRID ─────────────────────────────────────────────────────────────
type PhaseCard = ProcessAndAi['phasesSection']['cards'][number]

/** Icon glyphs the content file can reference by name via `card.icon`. */
const PHASE_ICONS = { Search, Sparkles, Layers, CheckCircle2, Code2 } as const

// Card geometry from the design spec: 185×200, 24/20 vertical/horizontal
// padding, 16px gap between the icon tile and the text block, 20px radius.
function PhaseCardTile({
  card,
  fixedSize,
  twoLineDescription,
}: {
  card: PhaseCard
  fixedSize: boolean
  twoLineDescription?: string
}) {
  const Icon = PHASE_ICONS[card.icon as keyof typeof PHASE_ICONS] ?? Layers
  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-[20px] p-5 min-[900px]:px-5 min-[900px]:py-6 ${
        fixedSize ? 'w-[185px] min-h-[200px] shrink-0' : 'w-full'
      }`}
      style={{ backgroundColor: card.bg, color: card.textColor }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white min-[900px]:h-10 min-[900px]:w-10">
        <Icon className="h-4 w-4 min-[900px]:h-5 min-[900px]:w-5" style={{ color: card.bg }} strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5 min-[900px]:block">
        <p className="type-sans-regular text-[12px] leading-[normal] uppercase text-white max-[899.98px]:!font-[400] min-[900px]:text-eyebrow min-[900px]:leading-normal min-[900px]:opacity-70 min-[900px]:!font-[550]">
          {card.id}
        </p>
        <h3 className="type-sans-regular text-[16px] leading-[normal] text-white max-[899.98px]:!font-[400] min-[900px]:mt-1 min-[900px]:text-body-lg min-[900px]:leading-normal min-[900px]:!font-[750]">
          {card.title}
        </h3>
        <p
          className={
            twoLineDescription
              ? 'type-sans-regular mt-1.5 whitespace-pre-line text-[11px] leading-[15px] text-white/90'
              : 'type-sans-regular text-[13px] leading-[18px] text-white/90 min-[900px]:mt-1.5 min-[900px]:text-eyebrow min-[900px]:leading-normal'
          }
        >
          {twoLineDescription ?? card.description}
        </p>
      </div>
    </div>
  )
}

function PhasesFooterNote({ note }: { note: ProcessAndAi['phasesSection']['footerNote'] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-10">
      <div>
        <div className="h-px bg-[#3A39FF]" />
        <div className="mt-2.5 flex items-center gap-1.5 type-sans-bold text-caption uppercase tracking-[0.15em] text-[#3A39FF] md:text-[11px] md:leading-normal">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
          {note.startLabel}
        </div>
      </div>
      <div>
        <div className="h-px bg-[#FF5B23]" />
        <div className="mt-2.5 flex items-center justify-end gap-1.5 type-sans-bold text-caption uppercase tracking-[0.15em] text-[#FF5B23] md:text-[11px] md:leading-normal">
          {note.endLabel}
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

// One row of fixed-width cards linked by arrows, plus the two-tone footer
// rule. Only shown at 1200px+, where there's room for six 185px cards in a row.
// Six 185px cards + five arrows must fit inside the section-shell content box
// (1280px − 2×24px padding = 1232px), so the gap between every item is a
// deliberately tight 4px rather than the section's usual gap-4/gap-6.
function PhasesGridDesktop({ section }: { section: ProcessAndAi['phasesSection'] }) {
  return (
    <div className="hidden min-[1200px]:block">
      <div className="flex items-stretch gap-1">
        {section.cards.map((card, idx) => (
          <Fragment key={card.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
            >
              <PhaseCardTile card={card} fixedSize />
            </motion.div>
            {idx < section.cards.length - 1 && (
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 self-center text-[#3A39FF]"
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </div>
      <PhasesFooterNote note={section.footerNote} />
    </div>
  )
}

// Full-width stacked cards, no connecting arrows or footer rule — matches the
// reference's mobile layout, which drops both once cards no longer sit in a row.
const IPAD_EXPLORE_DESCRIPTION: Record<string, string> = {
  '01': 'We start by understanding your\ngoals, audience, and constraints.',
  '02': 'We use AI to rapidly explore\ndirections and surface the best paths.',
  '03': 'We validate concepts quickly\nwith interactive prototypes.',
}

function PhasesRow({
  cards,
  startIndex,
  twoLine,
}: {
  cards: PhaseCard[]
  startIndex: number
  twoLine?: boolean
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: (startIndex + idx) * 0.06 }}
          className="h-full"
        >
          <PhaseCardTile
            card={card}
            fixedSize={false}
            twoLineDescription={twoLine ? IPAD_EXPLORE_DESCRIPTION[card.id] : undefined}
          />
        </motion.div>
      ))}
    </div>
  )
}

function PhasesLabel({
  label,
  tone,
  align,
}: {
  label: string
  tone: 'start' | 'end'
  align: 'start' | 'end'
}) {
  const isStart = tone === 'start'
  return (
    <div>
      <div className={`h-px ${isStart ? 'bg-[#3A39FF]' : 'bg-[#FF5B23]'}`} />
      <div
        className={`mt-2.5 flex items-center gap-1.5 type-sans-bold text-[11px] uppercase leading-normal tracking-[0.15em] ${
          isStart ? 'text-[#3A39FF]' : 'text-[#FF5B23]'
        } ${align === 'end' ? 'justify-end' : ''}`}
      >
        {align === 'start' && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
        )}
        {label}
        {align === 'end' && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}

// iPad 900–1200: EXPLORE FAST + 3 cards, one down-arrow, DESIGN DEEP + 3 cards.
function PhasesGridIpad({ section }: { section: ProcessAndAi['phasesSection'] }) {
  const row1 = section.cards.slice(0, 3)
  const row2 = section.cards.slice(3, 6)
  return (
    <div className="hidden min-[900px]:max-[1199.98px]:block">
      <PhasesLabel label={section.footerNote.startLabel} tone="start" align="start" />
      <div className="mt-4">
        <PhasesRow cards={row1} startIndex={0} twoLine />
      </div>
      <div className="flex justify-center py-5">
        <ArrowDown className="h-3.5 w-3.5 text-[#3A39FF]" aria-hidden="true" />
      </div>
      <PhasesLabel label={section.footerNote.endLabel} tone="end" align="start" />
      <div className="mt-4">
        <PhasesRow cards={row2} startIndex={3} />
      </div>
    </div>
  )
}

function PhasesGridMobile({ section }: { section: ProcessAndAi['phasesSection'] }) {
  return (
    <div className="flex flex-col gap-4 min-[900px]:hidden">
      {section.cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.05 }}
        >
          <PhaseCardTile card={card} fixedSize={false} />
        </motion.div>
      ))}
    </div>
  )
}

export function PhasesGrid({ section }: { section: ProcessAndAi['phasesSection'] }) {
  return (
    <section className="bg-white">
      <div className="section-shell overflow-x-hidden py-16 [--section-pad-x:1rem] md:py-20 md:[--section-pad-x:1.5rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="type-sans-regular text-center text-[28px] leading-[36px] tracking-[-0.5px] text-[#121212] md:text-left md:text-display-md md:leading-[64px] md:tracking-normal">
            {section.headlineMain}{' '}
            <span className="type-sans-regular text-[28px] leading-[36px] text-[#FF5B23] md:text-display-md md:leading-[64px]">{section.headlineAccent}</span>
          </h2>
        </motion.div>

        <div className="mt-10">
          <PhasesGridDesktop section={section} />
          <PhasesGridIpad section={section} />
          <PhasesGridMobile section={section} />
        </div>
      </div>
    </section>
  )
}

// ─── DUAL PROTOTYPE FRAMEWORK ─────────────────────────────────────────────────────────────
export function DualPrototypeFramework({ framework }: { framework: ProcessAndAi['frameworkSection'] }) {
  // Split "The result: ..." into a bold lead-in + regular remainder to match design.
  // Expecting framework.resultStatement like "The result: Less uncertainty. Less rework. Better outcomes."
  const [resultLead, ...resultRestParts] = framework.resultStatement.split(':')
  const resultRest = resultRestParts.join(':').trim()

  return (
    <section className="section-shell flex flex-col gap-10 border-t-0 bg-[#FFFCF7] pt-16 pb-8 [--section-pad-x:1rem] md:block md:border-t md:border-neutral-200/60 md:pt-20 md:pb-8 md:[--section-pad-x:1.5rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-3 text-center md:mb-16 md:block"
      >
        <span className="type-sans-regular text-[11px] leading-[normal] uppercase tracking-[2px] text-[#121212]/60 max-md:!font-[400] md:text-[11px] md:leading-normal md:tracking-normal md:!font-[650]">
          {framework.badge}
        </span>
        {/* Desktop: single-line title — "Dual Prototype" accent only, per Figma */}
        <h2 className="type-sans-regular mx-auto max-w-3xl text-[28px] leading-[36px] tracking-[-0.5px] text-[#121212] md:mt-4 md:max-w-none md:whitespace-nowrap md:text-display md:leading-normal md:tracking-normal md:text-[#111625]">
          {framework.headlineMain}{' '}
          <span className="type-sans-regular text-[28px] leading-[36px] text-[#FF5B23] md:text-display md:leading-normal">
            {framework.headlineAccent}
            {framework.headlineEnd ? <> {framework.headlineEnd}</> : null}
          </span>
        </h2>
        <p className="type-sans-regular mx-auto max-w-2xl whitespace-normal text-[14px] leading-[20px] text-[#606673] max-md:!font-[400] md:mt-6 md:whitespace-pre-line md:text-body md:leading-[150%] md:!font-[550]">
          {framework.subheadline}
        </p>
      </motion.div>

      {/* Dual Column Grid — stacks on mobile */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 md:mt-16 md:gap-8">
        {/* Prototype A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 rounded-[2rem] border border-neutral-300/60 p-6 md:block md:rounded-[2.5rem] md:p-8"
          style={{ backgroundColor: framework.prototypeA.cardBg }}
        >
          <div className="flex flex-col gap-1.5 md:block">
            <h3 className="type-sans-regular text-[24px] leading-[normal] text-[#111625] max-md:!font-[400] md:text-lead md:leading-normal md:!font-[550]">
              {framework.prototypeA.title}
            </h3>
            <p className="type-sans-regular text-[18px] leading-[normal] max-md:!font-[400] max-md:!text-[#3A39FF] md:mt-1 md:text-title md:!font-[750]" style={{ color: framework.prototypeA.taglineColor }}>
              {framework.prototypeA.tagline}
            </p>
            <p className="type-sans-regular whitespace-normal text-[13px] leading-[18px] text-[#606673] md:mt-3 md:whitespace-pre-line md:text-body-sm md:leading-[140%]">
              {framework.prototypeA.description}
            </p>
          </div>

          {/* Image — lazy-loaded playground mockups */}
          <div className="overflow-hidden rounded-2xl bg-white/40 md:mt-8">
            <Image
              src={framework.prototypeA.image}
              alt="Prototype A"
              width={600}
              height={350}
              loading="lazy"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Mobile-only condensed callouts (replace bullet grid below lg) */}
          {/* {framework.prototypeA.mobileNotes && framework.prototypeA.mobileNotes.length > 0 && (
            <div className="lg:hidden mt-6 space-y-3">
              {framework.prototypeA.mobileNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="rounded-xl px-4 py-3 text-sm text-neutral-800"
                  style={{ backgroundColor: note.bg }}
                >
                  {note.text}
                </div>
              ))}
            </div>
          )} */}

          {/* Two Column Features — desktop/tablet only */}
          <div className="hidden lg:grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-neutral-200/50">
            {/* What Happens */}
            <div>
              <h4 className="type-sans-bold text-body-sm md:text-body-sm md:leading-normal" style={{ color: framework.prototypeA.taglineColor }}>
                What Happens
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeA.whatHappens.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-center gap-2 text-label leading-normal text-[#111625]">
                    <span className="type-sans-bold mb-0.5 leading-none" style={{ color: framework.prototypeA.taglineColor }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Gain */}
            <div>
              <h4 className="type-sans-bold text-body-sm md:text-body-sm md:leading-normal" style={{ color: framework.prototypeA.taglineColor }}>
                What You Gain
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeA.whatYouGain.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-center gap-2 text-label leading-normal text-[#111625]">
                    <span className="type-sans-bold mb-0.5 leading-none" style={{ color: framework.prototypeA.taglineColor }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Prototype B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-5 rounded-[2rem] border border-neutral-300/60 p-6 md:block md:rounded-[2.5rem] md:p-8"
          style={{ backgroundColor: framework.prototypeB.cardBg }}
        >
          <div className="flex flex-col gap-1.5 md:block">
            <h3 className="type-sans-regular text-[24px] leading-[normal] text-[#111625] max-md:!font-[400] md:text-lead md:leading-normal md:!font-[550]">
              {framework.prototypeB.title}
            </h3>
            <p className="type-sans-regular text-[18px] leading-[normal] max-md:!font-[400] max-md:!text-[#FF5B23] md:mt-1 md:text-title md:!font-[750]" style={{ color: framework.prototypeB.taglineColor }}>
              {framework.prototypeB.tagline}
            </p>
            <p className="type-sans-regular whitespace-normal text-[13px] leading-[18px] text-[#606673] md:mt-3 md:whitespace-pre-line md:text-body-sm md:leading-[140%]">
              {framework.prototypeB.description}
            </p>
          </div>

          {/* Image — lazy-loaded playground mockups */}
          <div className="overflow-hidden rounded-2xl bg-white/40 md:mt-8">
            <Image
              src={framework.prototypeB.image}
              alt="Prototype B"
              width={600}
              height={350}
              loading="lazy"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Prototype B shows no callouts and no bullet grid on mobile, per design */}
          <div className="hidden lg:grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-neutral-200/50">
            {/* What Happens */}
            <div>
              <h4 className="type-sans-bold text-body-sm md:text-body-sm md:leading-normal" style={{ color: framework.prototypeB.taglineColor }}>
                What Happens
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeB.whatHappens.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-center gap-2 text-label leading-normal text-[#111625]">
                    <span className="type-sans-bold mb-0.5 leading-none" style={{ color: framework.prototypeB.taglineColor }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Gain */}
            <div>
              <h4 className="type-sans-bold text-body-sm md:text-body-sm md:leading-normal" style={{ color: framework.prototypeB.taglineColor }}>
                What You Gain
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeB.whatYouGain.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-center gap-2 text-label leading-normal text-[#111625]">
                    <span className="type-sans-bold mb-0.5 leading-none" style={{ color: framework.prototypeB.taglineColor }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Result Statement — bold lead-in, regular remainder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 hidden items-start gap-3 pt-6 md:mt-8 md:flex md:items-center md:pt-4"
      >
        <Image
          src="/icons/activity.png"
          alt=""
          width={20}
          height={20}
          className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0"
          aria-hidden="true"
        />
        <p className="text-sm md:text-body-sm md:leading-normal">
          <span className="type-sans-bold text-body-sm text-[#111625]">{resultLead}:</span>{' '}
          <span className="type-sans-medium text-body-sm text-[#606673]">{resultRest}</span>
        </p>
      </motion.div>

      {/* Metrics Bar — boxed, bluish background, left-aligned text */}
      <div className="mt-3 hidden grid-cols-2 gap-4 pt-10 md:mt-3 md:grid md:grid-cols-4 md:gap-6 md:pt-4">
        {framework.metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="text-left bg-[#EEF0FE] rounded-2xl p-5 md:p-6"
          >
            <div className="type-sans-bold text-lead leading-normal text-[#3F3DFA] md:text-title-lg">
              {metric.value}
            </div>
            <div className="type-sans-semibold mt-2 text-eyebrow leading-normal tracking-wider text-[#606673] md:text-[11px] md:tracking-normal">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── METHODOLOGY ACCORDION ─────────────────────────────────────────────────────────────

type FrameworkStep = {
  id: string
  eyebrow: string
  title: string
  description: string
  color: string
  textColor: 'white' | 'dark'
  icon: 'search' | 'compass' | 'cpu' | 'activity'
}

type FrameworkSectionData = {
  badge: string
  headlineMain: string
  headlineItalic: string
  steps: FrameworkStep[]
}

const ICON_MAP: Record<FrameworkStep['icon'], LucideIcon> = {
  search: Search,
  compass: Compass,
  cpu: Cpu,
  activity: Activity,
}

// Default content per the implementation spec — pass `data` to override from CMS.
const DEFAULT_DATA: FrameworkSectionData = {
  badge: 'OUR FRAMEWORK',
  headlineMain: 'Every project follows the',
  headlineItalic: 'same foundation.',
  steps: [
    {
      id: '01',
      eyebrow: '01 . CLARIFY',
      title: 'Understand the right problem.',
      description:
        'Every successful product begins with absolute clarity. We deeply analyze user workflows, map stakeholder objectives, and outline precise paths forward.',
      color: '#3935FF',
      textColor: 'white',
      icon: 'search',
    },
    {
      id: '02',
      eyebrow: '02 . SHAPE',
      title: 'Transform insights into experiences.',
      description:
        'We translate complex functional constraints into simple visual mechanics, designing intuitive user pathways that define exactly how the system breathes.',
      color: '#D2A8F5',
      textColor: 'dark',
      icon: 'compass',
    },
    {
      id: '03',
      eyebrow: '03 . BUILD & ITERATE',
      title: 'Craft, test and continuously improve.',
      description:
        'Moving rapidly from high-end Figma prototypes to structured code-ready layouts. We stress-test interfaces with real users to iteratively refine usability metrics.',
      color: '#FF5728',
      textColor: 'white',
      icon: 'cpu',
    },
    {
      id: '04',
      eyebrow: '04 . SCALE',
      title: 'Create systems for long-term growth.',
      description:
        'Launch is just the beginning. We implement robust design system governance, automate repetitive pipelines, and guide the long-term evolution of product ecosystems.',
      color: '#F8C000',
      textColor: 'dark',
      icon: 'activity',
    },
  ],
}

function FrameworkHeader({ badge, headlineMain, headlineItalic }: Omit<FrameworkSectionData, 'steps'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-3 md:block"
    >
      <span className="type-sans-regular text-[11px] leading-[normal] tracking-[2px] uppercase text-[#121212] max-md:!font-[400] md:text-eyebrow md:leading-[16.5px] md:tracking-[3.3px] md:text-[#212121] md:!font-[550]">
        {badge}
      </span>
      <h2 className="type-sans-regular text-[28px] leading-[36px] tracking-[-0.5px] text-[#121212] md:mt-4 md:whitespace-nowrap md:text-display-xs md:leading-[58px] md:tracking-normal">
        {headlineMain}{' '}
        <span className="type-sans-light-italic text-[28px] leading-[36px] tracking-[-0.5px] text-[#121212]/40 md:text-display-xs md:leading-[58px] md:tracking-normal">{headlineItalic}</span>
      </h2>
    </motion.div>
  )
}

// Only the 2nd and 3rd cards in the stack tilt (1deg / -1deg) — the 1st and
// last stay flush so the fan effect reads as intentional, not accidental drift.
const CARD_ROTATION: Record<number, number> = { 1: 1, 2: -1 }

const MOBILE_CARD_COLORS: Record<string, string> = {
  '01': '#3A39FF',
  '02': '#DCB8FF',
  '03': '#FF5B23',
  '04': '#F2BB06',
}

function FrameworkCard({ step, index }: { step: FrameworkStep; index: number }) {
  const Icon = ICON_MAP[step.icon]
  const isWhiteText = step.textColor === 'white'
  const rotation = CARD_ROTATION[index] ?? 0
  const mobileBg = MOBILE_CARD_COLORS[step.id] ?? step.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={`relative rounded-[23px] p-6 transition-transform duration-300 hover:-translate-y-1 max-md:!rotate-0 max-md:!bg-[var(--card-mobile)] md:rounded-[28px] md:px-10 md:py-10 ${
        index === 0 ? '' : 'mt-4 md:mt-[-18px]'
      } ${rotation ? (rotation > 0 ? 'md:rotate-[1deg]' : 'md:-rotate-[1deg]') : ''}`}
      style={{
        backgroundColor: step.color,
        zIndex: index + 1,
        ['--card-mobile' as string]: mobileBg,
      }}
    >
      <div className={isWhiteText ? 'text-white' : 'text-[#121212] md:text-[#111111]'}>
        {/* Icon: top-left on mobile (in-flow), right side on desktop (absolute) */}
        <div
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 md:absolute md:top-10 md:right-10 md:mb-0 md:h-[84px] md:w-[84px]`}
          style={{ backgroundColor: isWhiteText ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}
        >
          <Icon
            className={isWhiteText ? 'text-white' : 'text-[#121212] md:text-[#111111]'}
            strokeWidth={1.5}
            width={24}
            height={24}
          />
        </div>

        <div className="flex flex-col gap-2 md:block md:pr-28">
          <p className="type-sans-regular text-[14px] leading-[normal] uppercase tracking-[2px] max-md:!font-[400] md:text-title-lg md:leading-normal md:tracking-[4px]">
            {step.eyebrow}
          </p>
          <h3 className="type-sans-regular text-[24px] leading-[30px] max-md:!font-[400] md:mt-3 md:whitespace-nowrap md:text-display-xs md:leading-[48px]">
            {step.title}
          </h3>
          <p className="type-sans-regular max-w-2xl text-[13px] leading-[18px] opacity-90 md:mt-4 md:max-w-[650px] md:text-body-lg md:leading-[22px] md:opacity-80">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function FrameworkCards({ steps }: { steps: FrameworkStep[] }) {
  return (
    <div className="mt-10 flex flex-col md:mt-12">
      {steps.map((step, idx) => (
        <FrameworkCard key={step.id} step={step} index={idx} />
      ))}
    </div>
  )
}

export function MethodologyAccordion({ data = DEFAULT_DATA }: { data?: FrameworkSectionData }) {
  return (
    <section className="border-t-0 bg-[#FFFCF7]">
      <div className="section-shell pt-8 pb-16 [--section-pad-x:1rem] md:pt-8 md:pb-[105px] md:[--section-pad-x:1.5rem]">
        <FrameworkHeader
          badge={data.badge}
          headlineMain={data.headlineMain}
          headlineItalic={data.headlineItalic}
        />
        <FrameworkCards steps={data.steps} />
      </div>
    </section>
  )
}

// ─── AI SYNERGY GRID ─────────────────────────────────────────────────────────────
/** Column fills, in order — cycles if there are ever more than four columns. */
const SYNERGY_FILLS = ['#3A39FF', '#DCB8FF', '#FF5B23', '#F2BB06'] as const

function SynergyColumn({
  column,
  fill,
  idx,
}: {
  column: ProcessAndAi['aiAcceleratesSection']['columns'][number]
  fill: string
  idx: number
}) {
  // Lavender + yellow fills need black type/icons on desktop; mobile Figma uses white on every fill.
  const darkOnFill = fill === '#DCB8FF' || fill === '#F2BB06'
  const fillText = darkOnFill ? 'text-white md:text-[#111111]' : 'text-white'
  const fillMuted = darkOnFill ? 'text-white md:text-[#111111]' : 'text-white'

  const bulleted = (items: string[], textClass: string) => (
    <ul className="mt-2 space-y-0 md:mt-4 md:space-y-4">
      {items.map((item, i) => (
        <li key={i} className={`type-sans-regular flex items-start gap-2 text-[12px] leading-[16px] max-md:!font-[400] md:text-body-sm md:leading-[20px] ${textClass}`}>
          <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-current md:mt-[7px]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="flex flex-col pb-4 md:pb-0"
    >
      <div className="border-b-0 pb-0 md:border-b md:border-[#E4DED6] md:pb-3">
        <h3 className="type-sans-bold text-[16px] leading-[normal] text-[#121212] max-md:!font-[750] md:text-title-lg md:leading-normal md:!font-[650]">{column.step}</h3>
      </div>

      <div className="mt-3 flex flex-col gap-2 md:mt-0 md:gap-0">
        {/* AI Tasks — filled card. Mobile Figma uses white type on every fill. */}
        <div className={`rounded-2xl p-3 md:mt-6 md:p-6 ${fillText}`} style={{ backgroundColor: fill }}>
          <div className={`flex items-center gap-1.5 md:gap-2 ${fillMuted}`}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="type-sans-regular text-[11px] leading-[normal] max-md:!font-[400] md:text-eyebrow md:leading-normal md:!font-[650]">AI TASKS</span>
          </div>
          {bulleted(column.aiTasks, fillMuted)}
        </div>

        {/* Human Role — outlined card, same hue as the fill above */}
        <div
          className="rounded-2xl border p-3 md:mt-4 md:p-6"
          style={{ borderColor: fill }}
        >
          <div
            className="flex items-center gap-1.5 md:gap-2"
            style={{ color: fill }}
          >
            <User className={`h-4 w-4 ${darkOnFill ? 'md:!text-[#111111]' : ''}`} aria-hidden="true" />
            <span className={`type-sans-regular text-[11px] leading-[normal] max-md:!font-[400] md:text-eyebrow md:leading-normal md:!font-[750] ${darkOnFill ? 'md:!text-[#111111]' : ''}`}>HUMAN ROLE</span>
          </div>
          {bulleted(column.humanRole, 'text-[#121212] md:text-ink')}
        </div>
      </div>
    </motion.div>
  )
}

export function AiSynergyGrid({ synergy }: { synergy: ProcessAndAi['aiAcceleratesSection'] }) {
  return (
    <section className="bg-white">
    <div className="section-shell pt-16 pb-8 [--section-pad-x:1rem] md:pt-20 md:pb-8 md:[--section-pad-x:1.5rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-3 md:block"
      >
        <p className="type-sans-regular text-[11px] leading-[normal] tracking-[2px] uppercase text-[#121212] max-md:!font-[400] md:text-eyebrow md:leading-[16.5px] md:tracking-[3.3px] md:text-[#212121] md:!font-[550]">
          {synergy.badge}
        </p>
        <h2 className="type-sans-regular max-w-none text-[28px] leading-[36px] tracking-[-0.5px] text-[#121212] md:mt-4 md:whitespace-nowrap md:text-display md:leading-[58px] md:tracking-[-1.5px]">
          {synergy.headline}
        </h2>
        <p className="type-sans-regular max-w-2xl text-[14px] leading-[20px] text-[#606673] md:mt-4 md:text-body-lg md:leading-[24px] md:text-[#36454f]">
          {synergy.subheadline}
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-6">
        {synergy.columns.map((column, idx) => (
          <SynergyColumn
            key={column.step}
            column={column}
            fill={SYNERGY_FILLS[idx % SYNERGY_FILLS.length]}
            idx={idx}
          />
        ))}
      </div>
    </div>
    </section>
  )
}

// ─── OUTCOMES GRID ─────────────────────────────────────────────────────────────
// Icon PNGs live in public/icons; filenames match the lowercase `icon` key from content.
const OUTCOME_ICON_SRC: Record<string, string> = {
  zap: '/icons/activity.png',
  crosshair: '/icons/crosshair.png',
  shield: '/icons/shield.png',
  eye: '/icons/eye.png',
  layers: '/icons/layers.png',
  users: '/icons/users.png',
}

export function OutcomesGrid({ outcomes }: { outcomes: ProcessAndAi['outcomesSection'] }) {
  return (
    <section className="bg-white pt-8 pb-20 md:pt-8 md:pb-[120px]">
      <div className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="type-sans-medium text-caption leading-[16.5px] tracking-[3.3px] uppercase text-[#212121] md:text-[12px] md:leading-[16.5px]">
          {outcomes.badge}
        </span>
        <h2 className="type-sans-regular mt-4 text-lead leading-[36px] tracking-[-0.5px] text-[#121212] md:mt-5 md:text-[48px] md:leading-[58px] md:tracking-[-1.5px]">
          {outcomes.headline}
        </h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {outcomes.grid.map((item, idx) => {
          const iconSrc = OUTCOME_ICON_SRC[item.icon]
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="flex min-h-0 flex-col justify-between rounded-2xl border border-[#DEDFE0] bg-[#FFFCF7] p-8 md:min-h-[245px] md:rounded-[24px]"
            >
              <div>
                {iconSrc && (
                  <div
                    className="mb-5 flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12"
                    style={{ backgroundColor: item.iconBg ?? 'rgba(58, 57, 255, 0.0784)' }}
                  >
                    <Image
                      src={iconSrc}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <h3 className="type-sans-semibold text-title-md leading-normal text-[#121212] md:text-[22px]">
                  {item.title}
                </h3>
                <p className="type-sans-regular mt-2 text-body-sm leading-[22px] text-[#6B6B6B] md:mt-5 md:text-[14px] md:leading-[22px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
      </div>
    </section>
  )
}

// ─── CTA CLOSURE BLOCK ─────────────────────────────────────────────────────────────
export function CtaClosureBlock({ cta }: { cta: ProcessAndAi['ctaSection'] }) {
  return (
    <section className="section-shell py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden my-12 rounded-[2.5rem] bg-[#FAF6F0] border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-8 p-12"
      >
        {/* Geometric Accents */}
        <div className="w-32 h-32 rounded-3xl absolute -left-8 -bottom-8 bg-[#2538F5] opacity-90 -rotate-12 pointer-events-none" />
        <div className="w-24 h-24 rounded-2xl absolute top-4 right-8 bg-[#E65124] opacity-90 rotate-12 pointer-events-none" />

        {/* Content */}
        <div className="flex-1 relative z-10">
          <span className="type-sans-regular text-caption leading-[16.5px] tracking-[2.75px] uppercase text-[#212121]/60">
            {cta.badge}
          </span>
          <h2 className="type-sans-regular mt-3 max-w-2xl text-lead leading-[36px] text-[#212121] md:text-display-sm md:leading-[51.52px]">
            {cta.headlineMain}
            <br />
            <span className="type-sans-italic text-[#FF5B23]">{cta.headlineAccent}</span>
          </h2>
        </div>

        {/* Action Items */}
        <div className="flex flex-col items-center md:items-end gap-4 relative z-10">
          <Link
            href="/contact"
            className="type-sans-regular inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#111111] px-7 py-3 text-body-sm leading-[21px] text-white shadow-sm transition-all duration-300 hover:bg-neutral-800"
          >
            {cta.buttonText}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${cta.phone}`}
            className="type-sans-regular text-body-sm leading-[21px] text-[#212121] transition-colors hover:text-[#2538F5]"
          >
            {cta.phone}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
