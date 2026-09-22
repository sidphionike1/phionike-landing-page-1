import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
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
        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <Script id="microsoft-clarity" strategy="afterInteractive">
              {`
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "yl7tdp9kvy");
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
