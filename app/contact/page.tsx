import type { Metadata } from 'next'
import { getGlobalContent } from '@/lib/content'
import { SiteNavbar } from '@/components/shared/site-chrome'
import { FooterCTA, Footer } from '@/components/shared/footer'
import { ContactArtwork, ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact — Phionike',
  description: 'Start a conversation with Phionike about your next product, brand, or experience.',
}

export default async function ContactPage() {
  const global = await getGlobalContent()
  return (
    <main>
      <SiteNavbar content={global.nav} activePage="contact" />
      <section className="bg-background px-6 pb-20 pt-44 md:px-16 md:pb-28 md:pt-56">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow text-primary">Say hello</p>
            <h1 className="mt-10 max-w-4xl text-6xl font-medium leading-[0.95] tracking-[-0.065em] md:text-8xl lg:text-9xl">Let&apos;s start a<br />conversation</h1>
            <p className="mt-12 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">Have an idea, a question, or a business challenge you want to tackle? Reach out to our research-led team and let&apos;s build something exceptional together.</p>
          </div>
          <ContactArtwork />
        </div>
      </section>

      <section className="bg-card px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-28">
          <ContactForm />
          <aside className="flex flex-col gap-12">
            <div><h2 className="text-4xl leading-tight tracking-[-0.04em] md:text-5xl">Based in London, working globally.</h2><p className="mt-6 text-xl leading-relaxed text-muted-foreground">We partner with ambitious founders and teams worldwide to design products that define industries.</p></div>
            <div className="flex flex-col gap-10 text-lg"><div><p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Email us</p><a className="mt-3 block text-2xl text-primary" href={`mailto:${global.footer.contact.email}`}>{global.footer.contact.email}</a></div><div><p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Call us</p><a className="mt-3 block text-2xl" href={`tel:${global.footer.contact.phone}`}>{global.footer.contact.phone}</a></div><div><p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Our studio</p><p className="mt-3 text-2xl leading-relaxed">84 Clerkenwell Road<br />London, EC1M 5RJ<br />United Kingdom</p></div></div>
            <div className="flex gap-6" aria-label="Brand color placeholders"><span className="size-16 rounded-2xl bg-primary" /><span className="size-16 rounded-2xl bg-accent" /><span className="size-16 rounded-2xl bg-mustard" /><span className="size-16 rounded-2xl bg-lavender" /></div>
          </aside>
        </div>
      </section>
      <FooterCTA cta={global.footerCta} />
      <Footer content={global.footer} />
    </main>
  )
}
