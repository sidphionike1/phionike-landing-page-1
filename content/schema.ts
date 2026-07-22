import { z } from "zod"

const link = z.object({ label: z.string(), href: z.string() })
const metric = z.object({ value: z.string(), label: z.string() })
const discipline = z.object({ id: z.string(), label: z.string(), mobileLabel: z.string() })
const sector = z.object({ id: z.string(), label: z.string() })

const portfolioItem = z.object({ id: z.string(), title: z.string(), tagline: z.string(), sectors: z.array(z.string()), discipline: z.string(), variant: z.enum(["standard", "darkPhoneTriple"]), mockupSrc: z.string() })
export const portfolioSectionSchema = z.object({ eyebrow: z.string(), heading: z.string(), filters: z.array(z.string()), items: z.array(portfolioItem) })
export type PortfolioSection = z.infer<typeof portfolioSectionSchema>

export const homePageSchema = z.object({
  nav: z.object({ logo: z.string(), links: z.array(link), cta: link }),
  hero: z.object({ eyebrow: z.string(), headlineDark: z.string(), headlineAccent: z.string(), body: z.string(), primaryCta: link, secondaryCta: link, shapes: z.array(z.object({ id: z.string(), color: z.string(), role: z.string() })), microTag: z.string() }),
  valueProp: z.object({ heading: z.string(), body: z.string(), cta: link }), trustedBy: z.object({ eyebrow: z.string(), heading: z.string(), logos: z.array(z.object({ name: z.string(), logoSrc: z.string() })) }), metrics: z.array(metric),
  processSteps: z.object({ mobileEyebrowNumber: z.string(), mobileHeading: z.string(), steps: z.array(z.object({ id: z.string(), number: z.string(), heading: z.string(), caption: z.string(), subheading: z.string() })) }),
  aiBand: z.object({ eyebrow: z.string(), heading: z.string(), supportLine: z.string(), body: z.string(), cta: link }),
  venn: z.object({ eyebrow: z.string(), heading: z.string(), subheading: z.string(), supportCopy: z.string(), disciplines: z.array(discipline), sectors: z.array(sector), stats: z.array(metric), cta: link }),
  portfolio: portfolioSectionSchema,
  showreel: z.object({ title: z.string(), duration: z.string(), posterSrc: z.string(), videoUrl: z.string(), caption: z.string(), cta: link, hiddenOnMobile: z.boolean() }), editorial: z.object({ imageSrc: z.string(), alt: z.string(), hiddenOnMobile: z.boolean() }), footerCta: z.object({ heading: z.string(), primaryCta: link, secondaryCta: link }), footer: z.object({ description: z.string(), location: z.string(), copyright: z.string(), contact: z.object({ email: z.string(), phone: z.string() }), navLinks: z.array(link), social: z.array(z.object({ platform: z.string(), href: z.string() })), teamPhotoSrc: z.string() }),
})

const processStep = z.object({ id:z.enum(["clarify","shape","build-iterate","scale"]), number:z.string(), icon:z.string(), heroLabel:z.string(), vennLabel:z.string(), heading:z.string(), shortDescription:z.string(), longDescription:z.string(), whatWeDo:z.array(z.string()), clientOutcomes:z.array(z.string()), bandColor:z.enum(["cobalt","lavender","terracotta","mustard"]), textColor:z.enum(["white","charcoal"]) })
export const globalSchema = z.object({ nav:z.object({logo:z.string(),links:z.array(link),cta:link}), footerCta:z.object({heading:z.string(),primaryCta:link,secondaryCta:link}), footer:z.object({description:z.string(),location:z.string(),copyright:z.string(),contact:z.object({email:z.string(),phone:z.string()}),navLinks:z.array(link),social:z.array(z.object({platform:z.string(),href:z.string()})),teamPhotoSrc:z.string()}), processSteps:z.array(processStep).length(4) })
export const servicesSchema = z.object({ hero:z.object({eyebrow:z.string(),headlineDark:z.string(),headlineAccent:z.string(),body:z.string(),primaryCta:link,secondaryCta:link}), capabilitiesIntro:z.object({eyebrow:z.string(),headingPlain:z.string(),headingAccent:z.string()}), photoStrips:z.array(z.object({id:z.string(),afterStepId:z.string(),src:z.string(),alt:z.string()})), sectorGrid:z.object({eyebrow:z.string().nullable(),heading:z.string(),headingAccent:z.string(),subheading:z.string(),sectors:z.array(z.object({sector:z.string(),clients:z.array(z.string())})),cta:link}) })

const decorativeTag = z.object({ label: z.string(), color: z.enum(["terracotta","mustard","cobalt","lavender"]) })
const testimonialItem = z.object({ id: z.string(), quote: z.string(), name: z.string(), role: z.string(), company: z.string(), photoSrc: z.string(), accentColor: z.string() })
export const workPageSchema = z.object({
  hero: z.object({ eyebrow: z.string(), headline: z.string(), primaryCta: link, secondaryCta: link, subhead: z.string(), subheadItalic: z.string(), body: z.string(), decorativeTags: z.array(decorativeTag) }),
  portfolio: portfolioSectionSchema,
  outcomesStatement: z.object({ heading: z.string(), body: z.string() }),
  testimonials: z.object({ heading: z.string(), subheading: z.string(), items: z.array(testimonialItem) }),
})

export type HomePage = z.infer<typeof homePageSchema>
export type Discipline = z.infer<typeof discipline>
export type GlobalContent = z.infer<typeof globalSchema>
export type ServicesPage = z.infer<typeof servicesSchema>
export type WorkPage = z.infer<typeof workPageSchema>
export type ProcessStep = z.infer<typeof processStep>

// ─── About Page ─────────────────────────────────────────────────────────────
const mosaicTile = z.discriminatedUnion("type", [
  z.object({ type: z.literal("photo"), src: z.string() }),
  z.object({ type: z.literal("color"), value: z.string() }),
])

const accentColor = z.enum(["cobalt", "terracotta", "lavender", "mustard"])
const tileColor   = z.enum(["cobalt", "terracotta", "lavender", "mustard"])
const gridSpan    = z.object({ col: z.number(), row: z.number() })

const memberTile = z.object({
  kind: z.literal("member"),
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  photoSrc: z.string().optional(),
  tileType: z.enum(["photoOnly", "bioText", "photoCaption", "nameOnly"]),
  gridSpan,
  bgColor: tileColor.optional(),
})
const decorativeFillTile = z.object({
  kind: z.literal("decorativeFill"),
  id: z.string(),
  bgColor: tileColor,
  gridSpan,
})
const decorativeBarTile = z.object({
  kind: z.literal("decorativeBar"),
  id: z.string(),
  bgColor: tileColor,
  gridSpan,
})
const teamTile = z.discriminatedUnion("kind", [memberTile, decorativeFillTile, decorativeBarTile])

export const aboutPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headlineParts: z.array(z.object({ text: z.string(), accent: z.boolean() })),
    body: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
    mosaicTiles: z.array(mosaicTile),
  }),
  values: z.object({
    eyebrow: z.string(),
    headingPlain: z.string(),
    headingAccent: z.string(),
    items: z.array(z.object({ title: z.string(), body: z.string(), accentColor })),
  }),
  team: z.object({
    eyebrow: z.string(),
    headingDark: z.string(),
    headingMuted: z.string(),
    introPhotoSrc: z.string(),
    tiles: z.array(teamTile),
  }),
  culture: z.object({
    eyebrow: z.string(),
    headingPlain: z.string(),
    headingItalic: z.string(),
    introPhotoSrc: z.string(),
    bands: z.array(z.object({
      id: z.string(),
      title: z.string(),
      body: z.string(),
      photoSrc: z.string(),
      bgColor: z.string(),
      textColor: z.string(),
      photoSide: z.enum(["left", "right"]),
    })),
  }),
})

export type AboutPage = z.infer<typeof aboutPageSchema>
