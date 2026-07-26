'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, ChevronDown, Zap, BarChart3, Target, Code2, Eye, Sparkles } from 'lucide-react'
import type { ProcessAndAi } from '@/content/schema'

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
export function ProcessAiHero({ hero }: { hero: ProcessAndAi['hero'] }) {
  return (
    <section className="relative w-full pt-20 pb-24 px-6 overflow-hidden">
      {/* Mesh Gradient Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-orange-300/30 to-indigo-400/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center flex flex-col items-center relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/80 border border-neutral-200/80 shadow-sm"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
            {hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight text-[#111111] max-w-4xl"
        >
          {hero.headlineMain}{' '}
          <span className="text-[#E65124]">{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base md:text-lg text-neutral-600 mt-6 leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Link
            href="/contact"
            className="bg-[#111111] text-white hover:bg-neutral-800 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 shadow-sm inline-flex items-center gap-2"
          >
            {hero.primaryCta}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="#"
            className="text-[#111111] hover:text-[#2538F5] text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            {hero.secondaryCta}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── COMPARISON SECTION ─────────────────────────────────────────────────────────────
export function ComparisonSection({ section }: { section: ProcessAndAi['comparisonSection'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 border-t border-neutral-200/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
          {section.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#111111] mt-4 max-w-3xl">
          {section.titleMain}{' '}
          <span className="text-[#E65124]">{section.titleSub}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Traditional Approach */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 border border-neutral-200 rounded-3xl p-8 shadow-sm"
        >
          <h3 className="text-lg font-mono font-bold text-[#111111] mb-6">
            {section.traditionalApproach.title}
          </h3>
          <div className="space-y-3">
            {section.traditionalApproach.nodes.map((node, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neutral-400" />
                <span className="text-sm text-neutral-600">{node}</span>
                {idx < section.traditionalApproach.nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-neutral-300 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phionike AI Approach */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#EAE8FC]/60 border border-[#2538F5]/30 rounded-3xl p-8 shadow-md"
        >
          <h3 className="text-lg font-mono font-bold text-[#2538F5] mb-6">
            {section.phionikeApproach.title}
          </h3>
          <div className="space-y-3">
            {section.phionikeApproach.nodes.map((node, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="px-2 py-1 rounded-full bg-[#2538F5]/10 text-[#2538F5]">
                  <span className="text-xs font-semibold">{idx + 1}</span>
                </div>
                <span className="text-sm text-[#111111] font-medium">{node}</span>
                {idx < section.phionikeApproach.nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#2538F5]/30 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── PHASES GRID ─────────────────────────────────────────────────────────────
export function PhasesGrid({ section }: { section: ProcessAndAi['phasesSection'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#111111]">
          {section.headlineMain}{' '}
          <span className="text-[#E65124]">{section.headlineAccent}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-12">
        {section.cards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="min-h-[260px] p-6 rounded-2xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-sm"
            style={{ backgroundColor: card.bg, color: card.textColor }}
          >
            <div className="text-2xl font-mono font-bold opacity-80">
              {card.id}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">{card.title}</h3>
              <p className="text-sm mt-2 opacity-90 leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── DUAL PROTOTYPE FRAMEWORK ─────────────────────────────────────────────────────────────
export function DualPrototypeFramework({ framework }: { framework: ProcessAndAi['frameworkSection'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 border-t border-neutral-200/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
          {framework.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#111111] mt-4 max-w-3xl mx-auto">
          {framework.headlineMain}{' '}
          <span className="text-[#E65124]">{framework.headlineAccent}</span>
        </h2>
        <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
          {framework.subheadline}
        </p>
      </motion.div>

      {/* Dual Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Prototype A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FAF6F0] border border-neutral-300/80 rounded-[2.5rem] p-8 space-y-6"
        >
          <span className="inline-block text-xs font-mono font-semibold tracking-wider text-[#2538F5] bg-[#2538F5]/10 px-3 py-1.5 rounded-full">
            {framework.prototypeA.badge}
          </span>
          <div>
            <h3 className="text-2xl font-bold text-[#111111]">
              {framework.prototypeA.title}
            </h3>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              {framework.prototypeA.description}
            </p>
          </div>
          <div className="bg-neutral-200/50 rounded-2xl w-full h-48 flex items-center justify-center text-neutral-400">
            <Image
              src={framework.prototypeA.image}
              alt="Rapid UX Exploration"
              width={600}
              height={350}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {framework.prototypeA.features.map((feature) => (
              <span
                key={feature}
                className="text-xs bg-[#2538F5]/10 text-[#2538F5] px-3 py-1.5 rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Prototype B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#111111] text-white rounded-[2.5rem] p-8 space-y-6"
        >
          <span className="inline-block text-xs font-mono font-semibold tracking-wider text-[#E65124] bg-[#E65124]/10 px-3 py-1.5 rounded-full">
            {framework.prototypeB.badge}
          </span>
          <div>
            <h3 className="text-2xl font-bold">
              {framework.prototypeB.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              {framework.prototypeB.description}
            </p>
          </div>
          <div className="bg-neutral-800 rounded-2xl w-full h-48 flex items-center justify-center text-neutral-600">
            <Image
              src={framework.prototypeB.image}
              alt="Production Codebase"
              width={600}
              height={350}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {framework.prototypeB.features.map((feature) => (
              <span
                key={feature}
                className="text-xs bg-[#E65124]/10 text-[#E65124] px-3 py-1.5 rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-neutral-200 mt-12">
        {framework.metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-[#2538F5]">
              {metric.value}
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-600 mt-2">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── METHODOLOGY ACCORDION ─────────────────────────────────────────────────────────────
export function MethodologyAccordion({ accordion }: { accordion: ProcessAndAi['accordionSection'] }) {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 border-t border-neutral-200/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
          {accordion.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#111111] mt-4">
          {accordion.headlineMain}{' '}
          <span className="text-[#E65124]">{accordion.headlineSub}</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-4 mt-12">
        {accordion.steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            onClick={() => setActiveStep(activeStep === idx ? -1 : idx)}
            className="rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 cursor-pointer overflow-hidden"
            style={{ backgroundColor: step.color }}
          >
            <div className="flex-1 text-white">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-mono font-bold opacity-60">{step.id}</span>
                <div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-sm mt-1 opacity-90">{step.subtitle}</p>
                </div>
              </div>
              {activeStep === idx && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="text-sm mt-4 opacity-90 leading-relaxed max-w-2xl"
                >
                  {step.description}
                </motion.p>
              )}
            </div>
            <div className="ml-auto mt-4 md:mt-0">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: activeStep === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-white opacity-60" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── AI SYNERGY GRID ─────────────────────────────────────────────────────────────
export function AiSynergyGrid({ synergy }: { synergy: ProcessAndAi['aiAcceleratesSection'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 border-t border-neutral-200/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
          {synergy.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#111111] mt-4 max-w-3xl mx-auto">
          {synergy.headline}
        </h2>
        <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
          {synergy.subheadline}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {synergy.columns.map((column, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] mb-4">
                {column.step}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#111111] mb-1">AI Role</span>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {column.aiRole}
                  </p>
                </div>
                <div className="flex flex-col pt-3 border-t border-neutral-200">
                  <span className="text-xs font-semibold text-[#111111] mb-1">Human Role</span>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {column.humanRole}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
          {outcomes.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#111111] mt-4">
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
                <h3 className="text-xl font-bold text-[#111111]">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mt-2">
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
    <section className="max-w-7xl mx-auto px-6 py-8">
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
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E65124]">
            {cta.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mt-3 max-w-2xl">
            {cta.headlineMain}
            <br />
            <span className="text-[#E65124]">{cta.headlineAccent}</span>
          </h2>
        </div>

        {/* Action Items */}
        <div className="flex flex-col items-center md:items-end gap-4 relative z-10">
          <Link
            href="/contact"
            className="bg-[#111111] text-white hover:bg-neutral-800 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 shadow-sm inline-flex items-center gap-2 whitespace-nowrap"
          >
            {cta.buttonText}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${cta.phone}`}
            className="text-[#111111] hover:text-[#2538F5] text-sm font-medium transition-colors"
          >
            {cta.phone}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
