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

export const metadata: Metadata = {
  title: "Process & AI — Phionike",
  description: "Where human thinking meets intelligent execution. Our AI-powered design process delivers faster, smarter, and more human-centered products.",
}

export default async function ProcessAndAiPage() {
  const [global, content] = await Promise.all([
    getGlobalContent(),
    getProcessAndAiContent(),
  ])

  return (
    <main>
      <SiteNavbar content={global.nav} activePage="process" />
      <ProcessAiHero hero={content.hero} />
      <ComparisonSection section={content.comparisonSection} />
      <PhasesGrid section={content.phasesSection} />
      <DualPrototypeFramework framework={content.frameworkSection} />
      <MethodologyAccordion accordion={content.accordionSection} />
      <AiSynergyGrid synergy={content.aiAcceleratesSection} />
      <OutcomesGrid outcomes={content.outcomesSection} />
      <FooterCTA cta={global.footerCta} />
      <Footer content={global.footer} />
    </main>
  )
}
