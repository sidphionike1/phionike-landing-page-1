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
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("work")

export default async function WorkPage() {
  const [global, work] = await Promise.all([getGlobalContent(), getWorkPageContent()])

  return (
    <main>
      <JsonLd id="ld-work-webpage" data={webPageJsonLd("work")} />
      <JsonLd id="ld-work-breadcrumb" data={breadcrumbJsonLd("work")} />
      <SiteNavbar content={global.nav} activePage="work" footer={global.footer} />
      <WorkHero content={work.hero} />
      <Suspense>
        <PortfolioFilterGrid showSeeAllWork={false} />
      </Suspense>
      <DisciplineList steps={global.processSteps} />
      <OutcomesStatement />
      <TestimonialsGrid content={work.testimonials} />
      <FooterCTA cta={global.footerCta} typography="work" />
      <Footer content={global.footer} />
    </main>
  )
}
