import type { Metadata, Viewport } from "next"
import { ConsentAnalytics } from "@/components/shared/consent-analytics"
import { CookieConsent } from "@/components/shared/cookie-consent"
import { JsonLd } from "@/components/seo/json-ld"
import { localBusinessJsonLd, organizationJsonLd, PAGE_SEO, SITE_NAME, SITE_URL, websiteJsonLd } from "@/lib/seo"
import { seasonSans, seasonVf } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.title,
    template: `%s — ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Phionike",
    "UI UX design studio Mumbai",
    "product design agency",
    "brand design",
    "design systems",
    "UX research",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [{ url: "/footer/team-thumbnail.jpg", alt: "The Phionike studio team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: ["/footer/team-thumbnail.jpg"],
  },
}

export const viewport: Viewport = { colorScheme: "light", themeColor: "#faf6f0", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`bg-background ${seasonSans.variable} ${seasonVf.variable}`}>
      <body className="type-sans-regular antialiased">
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-localbusiness" data={localBusinessJsonLd()} />
        <JsonLd id="ld-website" data={websiteJsonLd()} />
        {children}
        <CookieConsent />
        <ConsentAnalytics />
      </body>
    </html>
  )
}
