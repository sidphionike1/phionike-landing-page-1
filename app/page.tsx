import { Suspense } from "react"
import { getHomePageContent } from "@/lib/content"
import { ProcessStepCounter } from "@/components/home/process-step-counter"
import { VennDiagramSection } from "@/components/home/venn-diagram-section"
import { PortfolioFilterGrid } from "@/components/home/portfolio-filter-grid"
import { ShowreelSection } from "@/components/home/showreel-section"
import { AIPhilosophyBand, EditorialPhotoBlock, FloatingNavbar, FooterCTA, Hero, TrustedByStrip, ValuePropBand } from "@/components/home/server-sections"

export default async function Page() {
  const content = await getHomePageContent()
  return <main>
    <FloatingNavbar content={content.nav} />
    <Hero content={content.hero} />
    <ValuePropBand content={content.valueProp} />
    <TrustedByStrip content={content.trustedBy} metrics={content.metrics} />
    <ProcessStepCounter content={content.processSteps} disciplines={content.venn.disciplines} />
    <AIPhilosophyBand content={content.aiBand} />
    <Suspense><VennDiagramSection content={content.venn} /></Suspense>
    <Suspense><PortfolioFilterGrid content={content.portfolio} /></Suspense>
    <ShowreelSection content={content.showreel} />
    <EditorialPhotoBlock content={content.editorial} />
    <FooterCTA cta={content.footerCta} content={content.footer} />
  </main>
}
