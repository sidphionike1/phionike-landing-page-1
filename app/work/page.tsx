import { Suspense } from "react"
import type { Metadata } from "next"
import { getGlobalContent, getWorkPageContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { PortfolioFilterGrid } from "@/components/home/portfolio-filter-grid"
import { DisciplineList } from "@/components/work/work-sections"
import { TestimonialsGrid } from "@/components/work/testimonials-grid"
import { FooterCTA, Footer } from "@/components/shared/footer"
import OutcomesStatement from "@/components/work/outcomes-statement"
import { WorkHero } from "@/components/work/work-hero"

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
      <FooterCTA cta={global.footerCta} />
      <Footer content={global.footer} />
    </main>
  )
}
