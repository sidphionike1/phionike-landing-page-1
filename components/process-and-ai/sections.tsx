'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, ChevronDown, Zap, BarChart3, Target, Code2, Eye, Sparkles, Search, Layers, CheckCircle2, Compass, Cpu, Activity, User, type LucideIcon } from 'lucide-react'
import type { ProcessAndAi } from '@/content/schema'

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
/** Placeholder backdrop — swap for the final artwork (PNG/WEBP works as-is). */
const HERO_BG_IMAGE = '/process-and-ai/hero-bg-placeholder.svg'

export function ProcessAiHero({ hero }: { hero: ProcessAndAi['hero'] }) {
  return (
    // `isolate` keeps the -z-10 backdrop above the section fill and below the copy.
    // Top padding clears the fixed navbar, matching the home hero (pt-32 / md:pt-40).
    <section className="relative isolate w-full overflow-hidden bg-[rgba(248,245,240,1)] pt-32 pb-32 md:pt-40 md:pb-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
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
          className="type-sans-regular text-caption text-[#121212]/60 md:text-body-sm"
        >
          {hero.badge}
        </motion.p>

        {/* Heading — mobile 36/44; desktop 60/80. The measure keeps the headline on
            three lines (two for the main clause, one for the accent clause). */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-sans-medium mt-6 max-w-[760px] text-[36px] leading-[44px] tracking-[-0.5px] text-[#121212] md:text-hero md:leading-[80px]"
        >
          <span className="block">{hero.headlineMain}</span>
          <span className="block">{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="type-sans-regular mt-4 max-w-[600px] text-body-lg leading-[24px] text-[#121212]/80 md:text-title"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Link
            href="/contact"
            className="type-sans-regular inline-flex items-center rounded-full bg-ink px-7 py-4 text-body-sm text-white"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href="#"
            className="type-sans-semibold inline-flex items-center gap-2 text-body text-[#111111]"
          >
            {hero.secondaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── COMPARISON SECTION ─────────────────────────────────────────────────────────────
/** Fill for the Phionike card and for the highlighted pills on the white card. */
const PROCESS_BLUE = 'rgba(58,57,255,1)'
/** The "process blue" highlight in the content file. It would disappear against
 *  the blue card, so those pills fall back to the plain white treatment there. */
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
  const pill =
    'type-sans-regular inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-eyebrow whitespace-nowrap'

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`flex flex-col rounded-2xl p-7 ${
        isBlue
          ? ''
          : 'border border-[#EDE7DF] bg-white shadow-[0_1px_3px_rgba(17,17,17,0.04)]'
      }`}
      style={isBlue ? { backgroundColor: PROCESS_BLUE } : undefined}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={`type-sans-bold text-body-sm ${isBlue ? 'text-white' : 'text-[#666666]'}`}
        >
          {title}
        </h3>
        <span
          className={`type-sans-semibold whitespace-nowrap ${
            isBlue ? 'text-micro text-white' : 'text-eyebrow text-[#666666]'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Flow rows */}
      <div className="mt-8 flex flex-col gap-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-wrap items-center gap-3">
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
              // On the blue card only a non-blue badge colour can read as a fill.
              const accentFill =
                item.badge && item.badgeColor && item.badgeColor !== BADGE_BLUE
                  ? item.badgeColor
                  : undefined

              return (
                <div key={itemIdx} className="flex items-center gap-3">
                  {item.text &&
                    (isBlue ? (
                      accentFill ? (
                        <span
                          className={`${pill} text-white`}
                          style={{ backgroundColor: accentFill }}
                        >
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                          {item.text}
                        </span>
                      ) : (
                        <span className={`${pill} bg-white text-ink`}>{item.text}</span>
                      )
                    ) : item.badge ? (
                      <span className={`${pill} text-white`} style={{ backgroundColor: PROCESS_BLUE }}>
                        {item.text}
                      </span>
                    ) : (
                      <span className={`${pill} border border-[#E4DED6] bg-white text-ink`}>
                        {item.text}
                      </span>
                    ))}
                  {showArrow && (
                    <ArrowRight
                      className={`h-3.5 w-3.5 shrink-0 ${isBlue ? 'text-white/55' : 'text-[#B4ADA4]'}`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
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
          className={`type-sans-regular border-t pt-4 text-label leading-[18px] ${
            isBlue ? 'border-white/20 text-white' : 'border-[#EDE7DF] text-[#36454f]'
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
    <section className="section-shell pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="type-sans-regular text-caption leading-[16.5px] tracking-[3.3px] text-[#212121]">
          {section.badge}
        </p>
        {/* Mobile lead 28/36; desktop 40/52; italic clause takes its own line from md up. */}
        <h2 className="type-sans-regular mt-8 max-w-[900px] text-lead leading-[36px] tracking-[-0.5px] text-[#121212] md:text-display-xs md:leading-[52px]">
          {section.titleMain}{' '}
          <span className="type-sans-light-italic text-lead text-[#121212]/40 md:block md:text-display-xs">
            {section.titleSub}
          </span>
        </h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
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
function PhaseCardTile({ card, fixedSize }: { card: PhaseCard; fixedSize: boolean }) {
  const Icon = PHASE_ICONS[card.icon as keyof typeof PHASE_ICONS] ?? Layers
  return (
    <div
      className={`flex flex-col gap-4 rounded-[20px] px-5 py-6 ${
        fixedSize ? 'w-[185px] min-h-[200px] shrink-0' : 'w-full'
      }`}
      style={{ backgroundColor: card.bg, color: card.textColor }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
        <Icon className="h-5 w-5" style={{ color: card.bg }} strokeWidth={2} aria-hidden="true" />
      </div>
      <div>
        <p className="type-sans-medium text-eyebrow text-white opacity-70">{card.id}</p>
        <h3 className="type-sans-regular mt-1 text-body-lg leading-tight text-white">{card.title}</h3>
        <p className="type-sans-regular mt-1.5 text-label leading-[18px] text-white/90">{card.description}</p>
      </div>
    </div>
  )
}

function PhasesFooterNote({ note }: { note: ProcessAndAi['phasesSection']['footerNote'] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-10">
      <div>
        <div className="h-px bg-[#3A39FF]" />
        <div className="mt-2.5 flex items-center gap-1.5 type-sans-bold text-caption uppercase tracking-[0.15em] text-[#3A39FF]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
          {note.startLabel}
        </div>
      </div>
      <div>
        <div className="h-px bg-[#FF5B23]" />
        <div className="mt-2.5 flex items-center justify-end gap-1.5 type-sans-bold text-caption uppercase tracking-[0.15em] text-[#FF5B23]">
          {note.endLabel}
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

// One row of fixed-width cards linked by arrows, plus the two-tone footer
// rule. Only shown at lg+, where there's room for six 185px cards in a row.
// Six 185px cards + five arrows must fit inside the section-shell content box
// (1280px − 2×24px padding = 1232px), so the gap between every item is a
// deliberately tight 4px rather than the section's usual gap-4/gap-6.
function PhasesGridDesktop({ section }: { section: ProcessAndAi['phasesSection'] }) {
  return (
    <div className="hidden lg:block">
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
function PhasesGridMobile({ section }: { section: ProcessAndAi['phasesSection'] }) {
  return (
    <div className="flex flex-col gap-4 lg:hidden">
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
    <section className="section-shell overflow-x-hidden py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="type-sans-regular text-lead leading-[36px] tracking-[-0.5px] text-[#121212] md:text-display-md md:leading-[64px]">
          {section.headlineMain}{' '}
          <span className="type-sans-regular text-lead text-[#FF5B23] md:text-display-md">{section.headlineAccent}</span>
        </h2>
      </motion.div>

      <div className="mt-10">
        <PhasesGridDesktop section={section} />
        <PhasesGridMobile section={section} />
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
    <section className="section-shell border-t border-neutral-200/60 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-16"
      >
        <span className="type-sans-regular text-caption uppercase tracking-[0.2em] text-[#121212]/60">
          {framework.badge}
        </span>
        <h2 className="type-sans-regular mt-4 mx-auto max-w-3xl text-lead leading-[36px] tracking-[-0.5px] text-[#111625] md:text-display md:leading-[1.15]">
          {framework.headlineMain}{' '}
          <span className="type-sans-regular text-lead text-[#FF5B23] md:text-display">{framework.headlineAccent}</span>
        </h2>
        <p className="type-sans-regular mx-auto mt-4 max-w-2xl text-body-sm leading-[20px] text-[#606673] md:mt-6 md:text-body">
          {framework.subheadline}
        </p>
      </motion.div>

      {/* Dual Column Grid — stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-16">
        {/* Prototype A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-neutral-300/60 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8"
          style={{ backgroundColor: framework.prototypeA.cardBg }}
        >
          <h3 className="type-sans-regular text-title-lg text-[#111625] md:text-lead">
            {framework.prototypeA.title}
          </h3>
          <p className="type-sans-regular mt-1 text-title-sm md:text-title" style={{ color: framework.prototypeA.taglineColor }}>
            {framework.prototypeA.tagline}
          </p>
          <p className="type-sans-regular mt-3 text-label leading-[18px] text-[#606673]">
            {framework.prototypeA.description}
          </p>

          {/* Image */}
          <div className="mt-6 md:mt-8 rounded-2xl overflow-hidden bg-neutral-200/50 h-48 md:h-56 flex items-center justify-center">
            <Image
              src={framework.prototypeA.image}
              alt="Prototype A"
              width={600}
              height={350}
              className="w-full h-full object-cover"
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
              <h4 className="type-sans-bold text-body-sm" style={{ color: framework.prototypeA.taglineColor }}>
                What Happens
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeA.whatHappens.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-start gap-2 text-label text-[#111625]">
                    <span className="font-bold mt-0.5" style={{ color: framework.prototypeA.taglineColor }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Gain */}
            <div>
              <h4 className="type-sans-bold text-body-sm" style={{ color: framework.prototypeA.taglineColor }}>
                What You Gain
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeA.whatYouGain.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-start gap-2 text-label text-[#111625]">
                    <span className="font-bold mt-0.5" style={{ color: framework.prototypeA.taglineColor }}>›</span>
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
          className="border border-neutral-300/60 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8"
          style={{ backgroundColor: framework.prototypeB.cardBg }}
        >
          <h3 className="type-sans-regular text-title-lg text-[#111625] md:text-lead">
            {framework.prototypeB.title}
          </h3>
          <p className="type-sans-regular mt-1 text-title-sm md:text-title" style={{ color: framework.prototypeB.taglineColor }}>
            {framework.prototypeB.tagline}
          </p>
          <p className="type-sans-regular mt-3 text-label leading-[18px] text-[#606673]">
            {framework.prototypeB.description}
          </p>

          {/* Image */}
          <div className="mt-6 md:mt-8 rounded-2xl overflow-hidden bg-neutral-200/50 h-48 md:h-56 flex items-center justify-center">
            <Image
              src={framework.prototypeB.image}
              alt="Prototype B"
              width={600}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Prototype B shows no callouts and no bullet grid on mobile, per design */}
          <div className="hidden lg:grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-neutral-200/50">
            {/* What Happens */}
            <div>
              <h4 className="type-sans-bold text-body-sm" style={{ color: framework.prototypeB.taglineColor }}>
                What Happens
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeB.whatHappens.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-start gap-2 text-label text-[#111625]">
                    <span className="font-bold mt-0.5" style={{ color: framework.prototypeB.taglineColor }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Gain */}
            <div>
              <h4 className="type-sans-bold text-body-sm" style={{ color: framework.prototypeB.taglineColor }}>
                What You Gain
              </h4>
              <ul className="mt-4 space-y-2">
                {framework.prototypeB.whatYouGain.map((item, idx) => (
                  <li key={idx} className="type-sans-medium flex items-start gap-2 text-label text-[#111625]">
                    <span className="font-bold mt-0.5" style={{ color: framework.prototypeB.taglineColor }}>›</span>
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
        className="mt-10 md:mt-12 pt-6 md:pt-8 flex items-start md:items-center gap-3"
      >
        <svg className="w-5 h-5 text-[#2538F5] flex-shrink-0 mt-0.5 md:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <p className="text-sm md:text-base leading-relaxed">
          <span className="type-sans-bold text-body-sm text-[#111625]">{resultLead}:</span>{' '}
          <span className="type-sans-medium text-body-sm text-[#606673]">{resultRest}</span>
        </p>
      </motion.div>

      {/* Metrics Bar — boxed, bluish background, left-aligned text */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-10 md:pt-12 mt-6">
        {framework.metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="text-left bg-[#EEF0FE] rounded-2xl p-5 md:p-6"
          >
            <div className="type-sans-bold text-lead text-[#3F3DFA]">
              {metric.value}
            </div>
            <div className="type-sans-semibold mt-2 text-eyebrow uppercase tracking-wider text-[#606673]">
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
    >
      <span className="type-sans-regular text-caption leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]">
        {badge}
      </span>
      <h2 className="type-sans-regular mt-4 text-lead leading-[36px] text-[#121212] md:text-[40px] md:leading-[58px]">
        {headlineMain}{' '}
        <span className="type-sans-light-italic text-lead text-[#121212]/40 md:text-[40px]">{headlineItalic}</span>
      </h2>
    </motion.div>
  )
}

// Only the 2nd and 3rd cards in the stack tilt (1deg / -1deg) — the 1st and
// last stay flush so the fan effect reads as intentional, not accidental drift.
const CARD_ROTATION: Record<number, number> = { 1: 1, 2: -1 }

function FrameworkCard({ step, index }: { step: FrameworkStep; index: number }) {
  const Icon = ICON_MAP[step.icon]
  const isWhiteText = step.textColor === 'white'
  const rotation = CARD_ROTATION[index] ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={`relative rounded-[23px] md:rounded-[28px] p-6 md:px-10 md:py-10 transition-transform duration-300 hover:-translate-y-1 ${
        index === 0 ? '' : 'mt-4 md:mt-[-18px]'
      }`}
      style={{ backgroundColor: step.color, zIndex: index + 1 }}
    >
      <div className={isWhiteText ? 'text-white' : 'text-[#111111]'}>
        {/* Icon: top-left on mobile (in-flow), right side on desktop (absolute) */}
        <div
          className={`flex items-center justify-center rounded-full mb-5 md:mb-0 md:absolute md:top-10 md:right-10
            w-14 h-14 md:w-[84px] md:h-[84px] transition-transform duration-300`}
          style={{ backgroundColor: isWhiteText ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}
        >
          <Icon
            className={isWhiteText ? 'text-white' : 'text-[#111111]'}
            strokeWidth={1.5}
            width={24}
            height={24}
          />
        </div>

        <div className="md:pr-28">
          <p className="type-sans-regular text-body-sm uppercase tracking-[2px] md:text-title-lg">
            {step.eyebrow}
          </p>
          <h3 className="type-sans-regular mt-2 text-title-lg leading-[30px] md:mt-3 md:text-display-xs md:leading-[48px]">
            {step.title}
          </h3>
          <p
            className="type-sans-regular mt-3 max-w-2xl text-label leading-[18px] opacity-80 md:mt-4 md:max-w-[650px] md:text-body-lg md:leading-[22px]"
          >
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function FrameworkCards({ steps }: { steps: FrameworkStep[] }) {
  return (
    <div className="flex flex-col mt-12">
      {steps.map((step, idx) => (
        <FrameworkCard key={step.id} step={step} index={idx} />
      ))}
    </div>
  )
}

export function MethodologyAccordion({ data = DEFAULT_DATA }: { data?: FrameworkSectionData }) {
  return (
    <section className="bg-[#FAF8F4] border-t border-neutral-200/60">
      <div className="section-shell py-16 md:py-[105px]">
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
  const bulleted = (items: string[], textClass: string) => (
    <ul className="mt-3 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className={`type-sans-regular flex items-start gap-2 text-eyebrow leading-[16px] ${textClass}`}>
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current" aria-hidden="true" />
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
      className="flex flex-col"
    >
      <div className="pb-3 border-b border-[#E4DED6]">
        <h3 className="type-sans-bold text-body-lg text-[#121212] md:text-title-lg">{column.step}</h3>
      </div>

      {/* AI Tasks — filled card */}
      <div className="mt-6 rounded-2xl p-6 text-white" style={{ backgroundColor: fill }}>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="type-sans-regular text-caption">AI TASKS</span>
        </div>
        {bulleted(column.aiTasks, 'text-white')}
      </div>

      {/* Human Role — outlined card, same hue as the fill above */}
      <div
        className="mt-4 rounded-2xl border p-6"
        style={{ borderColor: fill }}
      >
        <div className="flex items-center gap-2" style={{ color: fill }}>
          <User className="h-4 w-4" aria-hidden="true" />
          <span className="type-sans-regular text-caption">HUMAN ROLE</span>
        </div>
        {bulleted(column.humanRole, 'text-ink')}
      </div>
    </motion.div>
  )
}

export function AiSynergyGrid({ synergy }: { synergy: ProcessAndAi['aiAcceleratesSection'] }) {
  return (
    <section className="section-shell py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="type-sans-regular text-caption leading-[16.5px] tracking-[3.3px] text-[#212121]">
          {synergy.badge}
        </p>
        <h2 className="type-sans-regular mt-4 max-w-3xl text-lead leading-[36px] tracking-[-0.5px] text-[#121212] md:text-display md:leading-[58px] md:tracking-[-1.5px]">
          {synergy.headline}
        </h2>
        <p className="type-sans-regular mt-4 max-w-2xl text-body-sm leading-[20px] text-[#36454f]">
          {synergy.subheadline}
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {synergy.columns.map((column, idx) => (
          <SynergyColumn
            key={column.step}
            column={column}
            fill={SYNERGY_FILLS[idx % SYNERGY_FILLS.length]}
            idx={idx}
          />
        ))}
      </div>
    </section>
  )
}

// ─── OUTCOMES GRID ─────────────────────────────────────────────────────────────
const iconMap = {
  Zap,
  BarChart3,
  Target,
  Code2,
  Eye,
  Sparkles,
}

export function OutcomesGrid({ outcomes }: { outcomes: ProcessAndAi['outcomesSection'] }) {
  return (
    <section className="section-shell py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="type-sans-regular text-caption leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]">
          {outcomes.badge}
        </span>
        <h2 className="type-sans-regular mt-4 text-lead leading-[36px] tracking-[-0.5px] text-[#121212] md:text-display md:leading-[58px] md:tracking-[-1.5px]">
          {outcomes.headline}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {outcomes.grid.map((item, idx) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap]
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="bg-white border border-neutral-200/80 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-sm"
            >
              <div>
                {IconComponent && (
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#2538F5] mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}
                <h3 className="type-sans-semibold text-title-md text-[#121212]">{item.title}</h3>
                <p className="type-sans-regular mt-2 text-body-sm leading-[22px] text-[#6b6b6b]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
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
            className="type-sans-medium inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#111111] px-7 py-3 text-body-sm leading-[21px] text-white shadow-sm transition-all duration-300 hover:bg-neutral-800"
          >
            {cta.buttonText}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${cta.phone}`}
            className="type-sans-medium text-body-sm leading-[21px] text-[#212121] transition-colors hover:text-[#2538F5]"
          >
            {cta.phone}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
