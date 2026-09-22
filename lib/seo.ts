export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://phionike.com"
).replace(/\/$/, "")

export const SITE_NAME = "Phionike"
export const SITE_TAGLINE = "Products, Brands and Experiences"

/** Stable entity IDs for AEO / knowledge-graph linking. */
export const ENTITY = {
  organization: `${SITE_URL}/#organization`,
  localBusiness: `${SITE_URL}/#localbusiness`,
  website: `${SITE_URL}/#website`,
} as const

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/phionike-solutions/",
  "https://www.instagram.com/phionike/",
  "https://medium.com/phionike",
  "https://dribbble.com/Phionike",
] as const

export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Phionike — UI UX & Product Design Studio in Mumbai",
    description:
      "Research-led design studio in Mumbai. We design products, brands and experiences for startups and enterprises worldwide.",
  },
  about: {
    path: "/about",
    title: "About — Phionike",
    description:
      "Meet Phionike, a Mumbai-based design-tech studio. We design with purpose and build products, brands and experiences that move people forward.",
  },
  work: {
    path: "/work",
    title: "Work — Phionike",
    description:
      "Browse Phionike case studies across healthcare, climate-tech, fintech, media and more. Every project begins with a challenge.",
  },
  services: {
    path: "/services",
    title: "Services — Phionike",
    description:
      "UX research, product design, brand design and design systems. End-to-end services for lasting product impact.",
  },
  processAndAi: {
    path: "/process-and-ai",
    title: "Process & AI — Phionike",
    description:
      "Where human thinking meets intelligent execution. Phionike’s Dual Prototype Framework uses AI to explore faster and design deeper.",
  },
  contact: {
    path: "/contact",
    title: "Contact — Phionike",
    description:
      "Based in Mumbai, working globally. Partner with Phionike to design products that define industries.",
  },
  cookies: {
    path: "/cookies",
    title: "Cookie Policy — Phionike",
    description:
      "How Phionike uses cookies and similar technologies, and how to manage your consent.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy — Phionike",
    description:
      "How Phionike Solutions LLP collects, uses and protects personal data.",
  },
} as const

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageMetadata(page: keyof typeof PAGE_SEO) {
  const seo = PAGE_SEO[page]
  const url = absoluteUrl(seo.path)
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: "website" as const,
    },
    twitter: {
      title: seo.title,
      description: seo.description,
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ENTITY.organization,
    name: SITE_NAME,
    legalName: "Phionike Solutions LLP",
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/favicon.png"),
    email: "info@phionike.com",
    telephone: "+91-97699-04435",
    sameAs: [...SOCIAL_PROFILES],
  }
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": ENTITY.localBusiness,
    identifier: "phionike-localbusiness",
    name: SITE_NAME,
    alternateName: ["Phionike Design-Tech Studio", "Phionike Studio"],
    legalName: "Phionike Solutions LLP",
    url: SITE_URL,
    image: [absoluteUrl("/favicon.png"), absoluteUrl("/footer/team-thumbnail.jpg")],
    logo: absoluteUrl("/logo.svg"),
    description:
      "Research-led UI/UX and product design studio in Mumbai, working with ambitious founders and teams worldwide.",
    email: "info@phionike.com",
    telephone: "+91-97699-04435",
    priceRange: "$$",
    currenciesAccepted: "INR, USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: "WeWork — Nesco IT Park",
      addressLocality: "Goregaon",
      addressRegion: "Maharashtra",
      postalCode: "400063",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Mumbai" },
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    knowsAbout: [
      "UI UX design",
      "Product design",
      "Brand design",
      "Design systems",
      "UX research",
      "AI-assisted design",
    ],
    sameAs: [...SOCIAL_PROFILES],
    parentOrganization: { "@id": ENTITY.organization },
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ENTITY.website,
    url: SITE_URL,
    name: SITE_NAME,
    description: PAGE_SEO.home.description,
    publisher: { "@id": ENTITY.organization },
    about: { "@id": ENTITY.localBusiness },
    inLanguage: "en-IN",
  }
}

export function webPageJsonLd(page: keyof typeof PAGE_SEO) {
  const seo = PAGE_SEO[page]
  const url = absoluteUrl(seo.path)
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": ENTITY.website },
    about: { "@id": ENTITY.localBusiness },
    inLanguage: "en-IN",
  }
}

export function breadcrumbJsonLd(page: keyof typeof PAGE_SEO) {
  const seo = PAGE_SEO[page]
  const items = [
    { name: "Home", path: "/" },
    ...(page === "home" ? [] : [{ name: seo.title.replace(" — Phionike", ""), path: seo.path }]),
  ]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
