import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond } from "next/font/google"
import { seasonSans, seasonVf } from "./fonts"
import "./globals.css"

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["500", "600"] })

export const metadata: Metadata = {
  title: "Phionike — Products, Brands and Experiences",
  description: "A research-led studio designing products, brands, and experiences that move people forward.",
}

export const viewport: Viewport = { colorScheme: "light", themeColor: "#faf6f0", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`bg-background ${seasonSans.variable} ${seasonVf.variable} ${serif.variable}`}><body className="type-sans-regular antialiased">{children}{process.env.NODE_ENV === "production" && <Analytics />}</body></html>
}
