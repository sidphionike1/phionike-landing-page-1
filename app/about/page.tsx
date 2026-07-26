import type { Metadata } from "next"
import { getGlobalContent, getAboutPageContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { AboutHero, MosaicStrip, ValuesSection, TeamSection, CultureSection } from "@/components/about/about-sections"
import { FooterCTA, Footer } from "@/components/shared/footer"

export const metadata: Metadata = {
  title: "About — Phionike",
  description: "We design with purpose. We build for impact. Meet the team behind the products you love.",
}

export default async function AboutPage() {
  const [global, about] = await Promise.all([getGlobalContent(), getAboutPageContent()])

  return (
    <main>
      <SiteNavbar content={global.nav} activePage="about" />
      <AboutHero content={about.hero} />
      <ValuesSection content={about.values} />
      <TeamSection content={about.team} />
      <CultureSection content={about.culture} />
      <FooterCTA cta={global.footerCta} />
      <Footer content={global.footer} />
    </main>
  )
}
