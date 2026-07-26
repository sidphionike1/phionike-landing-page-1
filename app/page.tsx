import { Suspense } from "react"
import { getHomePageContent, getGlobalContent } from "@/lib/content"
import { ProcessStepCounter } from "@/components/home/process-step-counter"
import { VennDiagramSection } from "@/components/home/venn-diagram-section"
import { PortfolioFilterGrid } from "@/components/home/portfolio-filter-grid"
import { ShowreelSection } from "@/components/home/showreel-section"
import { AIPhilosophyBand, EditorialPhotoBlock, FloatingNavbar, Hero, TrustedByStrip, ValuePropBand, AwardsSection } from "@/components/home/server-sections"
import { FooterCTA, Footer } from "@/components/shared/footer"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { FAQSection } from "@/components/home/faq-section"


export default async function Page() {
  const [content, global] = await Promise.all([getHomePageContent(), getGlobalContent()])
  return <main>
    <SiteNavbar content={global.nav} activePage="home" />
    <Hero content={content.hero} />
    <ValuePropBand content={content.valueProp} />
    <TrustedByStrip content={content.trustedBy} metrics={content.metrics} />
    <ProcessStepCounter content={content.processSteps} disciplines={content.venn.disciplines} />
    <AIPhilosophyBand content={content.aiBand} />
    <Suspense><VennDiagramSection content={content.venn} /></Suspense>
    <Suspense><PortfolioFilterGrid content={content.portfolio} /></Suspense>
    <AwardsSection content={content.awards} />
    <Suspense><FAQSection content={content.faq} /></Suspense>
    <ShowreelSection content={content.showreel} />
    <FooterCTA cta={global.footerCta} />
    <Footer content={global.footer} />
  </main>
}
