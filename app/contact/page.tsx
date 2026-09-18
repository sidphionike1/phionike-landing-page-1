import type { Metadata } from 'next'
import Image from 'next/image'
import { getGlobalContent } from '@/lib/content'
import { SiteNavbar } from '@/components/shared/site-chrome'
import { FooterCTA, Footer } from '@/components/shared/footer'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact — Phionike',
  description: 'Start a conversation with Phionike about your next product, brand, or experience.',
}

export default async function ContactPage() {
  const global = await getGlobalContent()
  return (
    <main>
      <SiteNavbar content={global.nav} activePage="contact" footer={global.footer} />
      <section className="bg-[url('/contact-us/hero-mob.png')] bg-[length:100%_auto] bg-center bg-no-repeat pb-10 pt-[104px] md:bg-none md:bg-background md:pb-28 md:pt-56">
        <div className="section-shell grid items-center gap-10 [--section-pad-x:1.25rem] md:[--section-pad-x:1.5rem] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-4">
            <p className="type-sans-regular text-[12px] leading-[normal] tracking-[3px] uppercase text-[#3A39FF] max-md:!font-[400] md:text-[12px] md:leading-[normal] md:tracking-[3px] md:text-[#3A39FF] md:!font-[400]">
              Say hello
            </p>
            <h1 className="type-sans-regular max-w-4xl text-[44px] leading-[48px] tracking-[-1.5px] text-[#212121] max-md:!font-[400] md:text-[44px] md:leading-[48px] md:tracking-[-1.5px] md:text-[#212121] md:!font-[400]">
              Let&apos;s start a<br />conversation
            </h1>
            <p className="type-sans-regular max-w-3xl text-[15px] leading-[23px] text-[#212121]/60 max-md:!font-[400] md:text-[15px] md:leading-[23px] md:tracking-normal md:text-[#212121]/60">
              Have an idea, a question, or a business challenge you want to tackle? Reach out to our research-led team and let&apos;s build something exceptional together.
            </p>
          </div>
          <div className="hidden md:block">
            <Image
              src="/contact-us/hero-desktop.png"
              alt=""
              width={2057}
              height={1630}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white pt-10 pb-12 md:bg-card md:pt-[60px] md:pb-[100px]">
        <div className="section-shell grid gap-12 [--section-pad-x:1.25rem] md:[--section-pad-x:1.5rem] lg:flex lg:flex-row lg:gap-20 lg:[--section-pad-x:7.75rem]">
          <ContactForm />
          <aside className="flex flex-col gap-8 md:gap-10 lg:w-[480px] lg:shrink-0">
            <div>
              <h2 className="type-sans-regular text-[24px] leading-[125%] text-[#212121] max-md:!font-[400] md:text-[32px] md:leading-[38px] md:tracking-normal md:text-[#212121] md:!font-[400]">
                Based in Mumbai, working globally.
              </h2>
              <p className="type-sans-regular mt-2 text-[14px] leading-[22px] text-[#212121]/60 max-md:!font-[400] md:mt-3 md:text-[16px] md:leading-[24px] md:text-[#212121]/60">
                We partner with ambitious founders and teams worldwide to design products that define industries.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-base md:gap-7">
              <div>
                <p className="type-sans-regular text-[11px] leading-[normal] tracking-[1px] uppercase text-[#212121]/60 max-md:!font-[400] md:text-[12px] md:leading-[normal] md:tracking-[1px] md:text-[#212121]/60">
                  Email us
                </p>
                <a
                  className="type-sans-medium mt-1.5 block text-[18px] leading-[normal] text-[#3A39FF] max-md:!font-[550] md:mt-2 md:text-[20px] md:leading-[normal] md:text-[#3A39FF] md:!font-[400]"
                  href={`mailto:${global.footer.contact.email}`}
                >
                  {global.footer.contact.email}
                </a>
              </div>
              <div>
                <p className="type-sans-regular text-[11px] leading-[normal] tracking-[1px] uppercase text-[#212121]/60 max-md:!font-[400] md:text-[12px] md:leading-[normal] md:tracking-[1px] md:text-[#212121]/60">
                  Call us
                </p>
                <a
                  className="type-sans-medium mt-1.5 block text-[18px] leading-[normal] text-[#212121] max-md:!font-[550] md:mt-2 md:text-[20px] md:leading-[normal] md:text-[#212121] md:!font-[400]"
                  href={`tel:${global.footer.contact.phone.replace(/\s/g, "")}`}
                >
                  {global.footer.contact.phone}
                </a>
              </div>
              <div>
                <p className="type-sans-regular text-[11px] leading-[normal] tracking-[1px] uppercase text-[#212121]/60 max-md:!font-[400] md:text-[12px] md:leading-[normal] md:tracking-[1px] md:text-[#212121]/60">
                  Our studio
                </p>
                <p className="type-sans-regular mt-1.5 text-[14px] leading-[20px] text-[#212121] max-md:!font-[400] md:mt-2 md:text-[16px] md:leading-[24px] md:text-[#212121]">
                  {global.footer.location}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <FooterCTA cta={global.footerCta} />
      <Footer content={global.footer} />
    </main>
  )
}
