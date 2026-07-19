"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Check, Orbit } from "lucide-react"
import type { HomePage } from "@/content/schema"

type Props = { content: HomePage["processSteps"]; disciplines: HomePage["venn"]["disciplines"] }

export function ProcessStepCounter({ content, disciplines }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(content.steps.length - 1, Math.floor(v * content.steps.length))))
  useEffect(() => setActive(0), [])

  return <section ref={sectionRef} className="bg-background py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-5 md:px-6">
      <div className="md:hidden">
        <p className="text-6xl font-medium tracking-tight">{content.mobileEyebrowNumber}</p>
        <h2 className="mt-4 max-w-xs text-2xl leading-tight text-muted-foreground">{content.mobileHeading}</h2>
        <div className="mt-10 flex flex-col">
          {disciplines.map((item, index) => <article key={item.id} className={`min-h-28 rounded-[2rem] p-8 ${index > 0 ? "-mt-5" : ""} ${index === 0 ? "bg-primary text-primary-foreground" : index === 1 ? "bg-lavender text-foreground" : index === 2 ? "bg-accent text-accent-foreground" : "bg-mustard text-foreground"}`}>
            <h3 className="flex items-center gap-3 text-2xl"><Orbit size={22} />{item.mobileLabel}</h3>
            {index === 3 && <div className="mt-4"><p className="text-xs uppercase tracking-[.16em]">{content.mobileHeading}</p><ul className="mt-4 flex flex-col gap-2 text-sm">{content.steps.map(step => <li key={step.id} className="flex items-center gap-2"><Check size={14}/>{step.subheading}</li>)}</ul></div>}
          </article>)}
        </div>
      </div>
      <div className="hidden min-h-[150vh] grid-cols-12 gap-12 md:grid">
        <div className="sticky top-32 col-span-5 h-fit">
          <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
            <p className="text-9xl font-semibold tracking-tighter">{content.steps[active]?.number}</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">{content.steps[active]?.heading}</h2>
            <p className="mt-3 max-w-sm text-muted-foreground">{content.steps[active]?.caption}</p>
          </motion.div></AnimatePresence>
        </div>
        <div className="col-span-7 flex flex-col gap-10">{content.steps.map((step, i) => <article key={step.id} className={`min-h-96 rounded-[2.5rem] p-12 ${i === 0 ? "bg-primary text-primary-foreground" : i === 1 ? "bg-lavender" : "bg-accent text-accent-foreground"}`}><span className="text-sm">{step.number}</span><h3 className="mt-20 text-5xl tracking-tight">{step.subheading}</h3><p className="mt-4 max-w-md text-lg opacity-75">{step.caption}</p></article>)}</div>
      </div>
    </div>
  </section>
}
