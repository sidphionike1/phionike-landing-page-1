import type { Metadata } from "next"
import { getGlobalContent, getServicesPageContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { Capabilities, SectorGrid, ServicesHero } from "@/components/services/services-sections"
import { FooterCTA, Footer } from "@/components/shared/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("services")

export default async function ServicesPage() {
  const [global, services] = await Promise.all([
    getGlobalContent(),
    getServicesPageContent(),
  ])
  return (
    <main>
      <JsonLd id="ld-services-webpage" data={webPageJsonLd("services")} />
      <JsonLd id="ld-services-breadcrumb" data={breadcrumbJsonLd("services")} />
      <SiteNavbar content={global.nav} activePage="services" footer={global.footer} />
      <ServicesHero content={services.hero} steps={global.processSteps} />
      <Capabilities
        intro={services.capabilitiesIntro}
        steps={global.processSteps}
        strips={services.photoStrips}
      />
      <SectorGrid content={services.sectorGrid} />
      <FooterCTA cta={global.footerCta} typography="services" />
      <Footer content={global.footer} />
    </main>
  )
}
