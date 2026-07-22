import type { Metadata } from "next"
import { Suspense } from "react"
import { getGlobalContent, getWorkPageContent } from "@/lib/content"
import { SiteFooter, SiteNavbar } from "@/components/shared/site-chrome"
import { PortfolioFilterGrid } from "@/components/home/portfolio-filter-grid"
import { WorkHero, DisciplineList, OutcomesStatement, TestimonialCards } from "@/components/work/work-sections"

export const metadata: Metadata = {
  title: "Our Work — Phionike",
  description: "Explore our case studies and projects across industries. See how we partner with startups and enterprises to solve meaningful challenges.",
}

export default async function WorkPage() {
  const [global, work] = await Promise.all([
    getGlobalContent(),
    getWorkPageContent(),
  ])

  // Transform work portfolio items to match PortfolioFilterGrid expected format
  const portfolioContent = {
    ...work.portfolio,
    items: work.portfolio.items,
  }

  return (
    <main>
      <SiteNavbar content={global.nav} />
      <WorkHero content={work.hero} />
      <Suspense>
        <PortfolioFilterGrid content={portfolioContent as any} />
      </Suspense>
      <DisciplineList steps={global.processSteps} />
      <OutcomesStatement content={work.outcomesStatement} />
      <TestimonialCards content={work.testimonials} />
      <SiteFooter cta={global.footerCta} content={global.footer} />
    </main>
  )
}
