import type { Metadata } from 'next'
import Image from 'next/image'
import { getGlobalContent } from '@/lib/content'
import { SiteNavbar } from '@/components/shared/site-chrome'
import { FooterCTA, Footer } from '@/components/shared/footer'
import { ContactForm } from '@/components/contact/contact-form'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata('contact')

export default async function ContactPage() {
  const global = await getGlobalContent()
  return (
    <main>
      <JsonLd id="ld-contact-webpage" data={webPageJsonLd('contact')} />
      <JsonLd id="ld-contact-breadcrumb" data={breadcrumbJsonLd('contact')} />
      <SiteNavbar content={global.nav} activePage="contact" footer={global.footer} />
      <section className="bg-[url('/contact-us/hero-mob.png')] bg-[length:100%_auto] bg-center bg-no-repeat pb-10 pt-[104px] md:bg-none md:bg-background md:pb-28 md:pt-56">
        <div className="section-shell grid items-start gap-10 [--section-pad-x:1.25rem] md:grid-cols-[1.15fr_0.85fr] md:items-stretch md:[--section-pad-x:1.5rem]">
          <div className="relative isolate flex flex-col gap-4">
            <Image
              src="/contact-us/hero-desktop.png"
              alt=""
              fill
              aria-hidden="true"
              className="pointer-events-none hidden object-contain object-left md:block"
              sizes="50vw"
              priority
            />
            <p className="relative type-sans-regular text-[12px] leading-[normal] tracking-[3px] uppercase text-[#3A39FF] max-md:!font-[400] md:text-[12px] md:leading-[normal] md:tracking-[3px] md:text-[#3A39FF] md:!font-[400]">
              Say hello
            </p>
            <h1 className="relative type-sans-regular max-w-4xl text-[44px] leading-[48px] tracking-[-1.5px] text-[#212121] max-md:!font-[400] md:text-[44px] md:leading-[48px] md:tracking-[-1.5px] md:text-[#212121] md:!font-[400]">
              Based in Mumbai,<br />working globally.
            </h1>
            <p className="relative type-sans-regular max-w-3xl text-[15px] leading-[23px] text-[#212121]/60 max-md:!font-[400] md:text-[15px] md:leading-[23px] md:tracking-normal md:text-[#212121]/60">
              We partner with ambitious founders and teams worldwide{' '}
              <br className="hidden md:block" />
              to design products that define industries.
            </p>
          </div>
          <div className="hidden md:block">
            <ContactForm idPrefix="desktop-" />
          </div>
        </div>
      </section>

      <section className="bg-white pt-10 pb-12 md:hidden">
        <div className="section-shell [--section-pad-x:1.25rem]">
          <ContactForm idPrefix="mobile-" />
        </div>
      </section>
      <FooterCTA cta={global.footerCta} />
      <Footer content={global.footer} />
    </main>
  )
}
