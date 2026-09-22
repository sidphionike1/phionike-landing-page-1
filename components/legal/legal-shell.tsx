import type { ReactNode } from "react"
import { getGlobalContent } from "@/lib/content"
import { SiteNavbar } from "@/components/shared/site-chrome"
import { Footer } from "@/components/shared/footer"

export async function LegalShell({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  const global = await getGlobalContent()

  return (
    <main>
      <SiteNavbar content={global.nav} footer={global.footer} />
      <article className="bg-background pb-20 pt-[104px] md:pb-28 md:pt-40">
        <div className="section-shell max-w-[760px]">
          <p className="type-sans-regular text-[12px] leading-normal tracking-[3px] uppercase text-[#3A39FF]">
            Legal
          </p>
          <h1 className="type-sans-regular mt-4 text-[36px] leading-[40px] tracking-[-1px] text-[#212121] md:text-[44px] md:leading-[48px] md:tracking-[-1.5px]">
            {title}
          </h1>
          <p className="type-sans-regular mt-3 text-eyebrow leading-[18px] text-[#212121]/60">
            Last updated {updated}
          </p>
          <div className="legal-prose type-sans-regular mt-10 space-y-8 text-[15px] leading-[24px] text-[#212121]/80">
            {children}
          </div>
        </div>
      </article>
      <Footer content={global.footer} />
    </main>
  )
}
