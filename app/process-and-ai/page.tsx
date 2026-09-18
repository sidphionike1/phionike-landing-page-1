import type { Metadata } from "next"
import { getGlobalContent, getProcessAndAiContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { FooterCTA, Footer } from "@/components/shared/footer"
import {
  ProcessAiHero,
  ComparisonSection,
  PhasesGrid,
  DualPrototypeFramework,
  MethodologyAccordion,
  AiSynergyGrid,
  OutcomesGrid,
  CtaClosureBlock,
} from "@/components/process-and-ai/sections"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("processAndAi")

export default async function ProcessAndAiPage() {
  const [global, content] = await Promise.all([
    getGlobalContent(),
    getProcessAndAiContent(),
  ])

  return (
    <main>
      <JsonLd id="ld-process-webpage" data={webPageJsonLd("processAndAi")} />
      <JsonLd id="ld-process-breadcrumb" data={breadcrumbJsonLd("processAndAi")} />
      <SiteNavbar content={global.nav} activePage="process-and-ai" footer={global.footer} />
      <ProcessAiHero hero={content.hero} />
      <ComparisonSection section={content.comparisonSection} />
      <PhasesGrid section={content.phasesSection} />
      <DualPrototypeFramework framework={content.frameworkSection} />
      <MethodologyAccordion />
      <AiSynergyGrid synergy={content.aiAcceleratesSection} />
      <OutcomesGrid outcomes={content.outcomesSection} />
      <FooterCTA cta={global.footerCta} typography="work" />
      <Footer content={global.footer} />
    </main>
  )
}
