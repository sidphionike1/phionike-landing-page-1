import type { Metadata } from "next"
import { getGlobalContent, getServicesPageContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { Capabilities, SectorGrid, ServicesHero } from "@/components/services/services-sections"
import { FooterCTA, Footer } from "@/components/shared/footer"
export const metadata:Metadata={title:"Services — Phionike",description:"Research, strategy, design and technology services for lasting product impact."}
export default async function ServicesPage(){const [global,services]=await Promise.all([getGlobalContent(),getServicesPageContent()]);return <main><SiteNavbar content={global.nav}/><ServicesHero content={services.hero} steps={global.processSteps}/><Capabilities intro={services.capabilitiesIntro} steps={global.processSteps} strips={services.photoStrips}/><SectorGrid content={services.sectorGrid}/><FooterCTA cta={global.footerCta}/><Footer content={global.footer}/></main>}
