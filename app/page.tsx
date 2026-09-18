import { Suspense } from "react"
import type { Metadata } from "next"
import { FAQS } from "@/content/faq"
import { getHomePageContent, getGlobalContent } from "@/lib/content"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"
import { ProcessStepCounter } from "@/components/home/process-step-counter"
import { VennDiagramSection } from "@/components/home/venn-diagram-section"
import { PortfolioFilterGrid } from "@/components/home/portfolio-filter-grid"
import { ShowreelSection } from "@/components/home/showreel-section"
import { AIPhilosophyBand, EditorialPhotoBlock, FloatingNavbar, Hero, TrustedByStrip, ValuePropBand, AwardsSection } from "@/components/home/server-sections"
import { FooterCTA, Footer } from "@/components/shared/footer"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { FAQSection } from "@/components/home/faq-section"

export const metadata: Metadata = pageMetadata("home")

export default async function Page() {
  const [content, global] = await Promise.all([getHomePageContent(), getGlobalContent()])
  return <main>
    <JsonLd id="ld-home-webpage" data={webPageJsonLd("home")} />
    <JsonLd id="ld-home-breadcrumb" data={breadcrumbJsonLd("home")} />
    <JsonLd id="ld-faq" data={faqPageJsonLd([...FAQS])} />
    <SiteNavbar content={global.nav} activePage="home" footer={global.footer} />
    <Hero content={content.hero} />
    <ValuePropBand content={content.valueProp} />
    <TrustedByStrip content={content.trustedBy} metrics={content.metrics} />
    <ProcessStepCounter content={content.processSteps} disciplines={content.venn.disciplines} />
    <AIPhilosophyBand content={content.aiBand} />
    <Suspense><VennDiagramSection content={content.venn} /></Suspense>
    <Suspense><PortfolioFilterGrid /></Suspense>
    <AwardsSection />
    <Suspense><FAQSection  /></Suspense>
    {/* <ShowreelSection content={content.showreel} /> */}
    <FooterCTA cta={global.footerCta} />
    <Footer content={global.footer} />
  </main>
}
