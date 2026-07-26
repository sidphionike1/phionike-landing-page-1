import { ArrowRight, Circle, Minus, } from "lucide-react"
import type { WorkPage, ProcessStep } from "@/content/schema"
import { motion } from "framer-motion";


// ─── DisciplineList ──────────────────────────────────────────────────────────
// Staircase diagonal badges within 4-column guide layout

// top % within each column's h-72 container, ordered clarify→scale
const STAIR_TOP = ["80%", "55%", "30%", "5%"]

export function DisciplineList({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Heading block */}
        <p className="eyebrow text-muted-foreground">Where We Create Impact</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight md:text-5xl">
          Not every product needs the same help
        </h2>
        <p className="mt-2 text-lg italic text-muted-foreground">
          we meet you where you are
        </p>

        {/* 4-column staircase grid */}
        <div className="hidden md:grid mt-10 grid grid-cols-4 divide-x divide-border border-t border-border">
          {steps.map((step, i) => (
            <div key={step.id} className="relative h-72">
              <div
                className="absolute left-3 flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-foreground"
                style={{ top: STAIR_TOP[i] }}
              >
                {/* Mustard asterisk icon */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6h10M2.05 2.05l7.9 7.9M9.95 2.05l-7.9 7.9" stroke="#F2A93B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {step.vennLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── OutcomesStatement ───────────────────────────────────────────────────────

const stats = [
  {
    value: "300M+",
    label: "PEOPLE REACHED",
  },
  {
    value: "20+",
    label: "INDUSTRIES SERVED",
  },
  {
    value: "2.5M+",
    label: "MONTHLY ACTIVE USERS",
  },
  {
    value: "8+",
    label: "YEARS OF CRAFT",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};