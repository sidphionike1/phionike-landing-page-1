import { Suspense } from "react"
import type { Metadata } from "next"
import { getGlobalContent, getWorkPageContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { PortfolioFilterGrid } from "@/components/home/portfolio-filter-grid"
import { WorkHero, DisciplineList, OutcomesStatement } from "@/components/work/work-sections"
import { TestimonialsGrid } from "@/components/work/testimonials-grid"
import { WorkFooterCTA, WorkFooter } from "@/components/work/work-footer"

export const metadata: Metadata = {
  title: "Our Work — Phionike",
  description: "Case studies across healthcare, fintech, SaaS, and more. Every project begins with a challenge.",
}

export default async function WorkPage() {
  const [global, work] = await Promise.all([getGlobalContent(), getWorkPageContent()])

  return (
    <main>
      <SiteNavbar content={global.nav} />
      <WorkHero content={work.hero} />
      <Suspense>
        <PortfolioFilterGrid content={work.portfolio} compact />
      </Suspense>
      <DisciplineList steps={global.processSteps} />
      <OutcomesStatement content={work.outcomesStatement} />
      <TestimonialsGrid content={work.testimonials} />
      <WorkFooterCTA cta={global.footerCta} />
      <WorkFooter content={global.footer} />
    </main>
  )
}
