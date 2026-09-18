import type { Metadata } from "next"
import { getGlobalContent, getAboutPageContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { AboutHero, MosaicStrip, ValuesSection, TeamSection, CultureSection } from "@/components/about/about-sections"
import { FooterCTA, Footer } from "@/components/shared/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("about")

export default async function AboutPage() {
  const [global, about] = await Promise.all([getGlobalContent(), getAboutPageContent()])

  return (
    <main>
      <JsonLd id="ld-about-webpage" data={webPageJsonLd("about")} />
      <JsonLd id="ld-about-breadcrumb" data={breadcrumbJsonLd("about")} />
      <SiteNavbar content={global.nav} activePage="about" footer={global.footer} />
      <AboutHero content={about.hero} />
      <ValuesSection content={about.values} />
      <TeamSection content={about.team} />
      <CultureSection content={about.culture} />
      <FooterCTA cta={global.footerCta} typography="about" />
      <Footer content={global.footer} />
    </main>
  )
}
