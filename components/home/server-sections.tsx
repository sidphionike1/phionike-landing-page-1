import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { HomePage } from "@/content/schema";
import { HeroVisual } from "./hero-visual";

const ArrowLink = ({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string;
  className?: string;
}) => (
  <a href={href} className={`inline-flex items-center gap-2 ${className}`}>
    {label}
    <ArrowUpRight size={16} />
  </a>
);


export function FloatingNavbar({ content }: { content: HomePage["nav"] }) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-7xl px-5 md:px-6">
      <nav
        className="flex items-center justify-between rounded-full border border-primary/20 bg-background/60 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150 md:px-6"
        aria-label="Primary"
      >
        <a href="/" className="inline-flex items-center">
          <Image src="/logo.svg" alt={content.logo} width={120} height={31} priority />
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {content.links.map((l, i) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`text-sm ${i === 0 ? "font-semibold" : "text-muted-foreground"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={content.cta.href}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {content.cta.label}
        </a>
      </nav>
    </header>
  );
}

export function Hero({ content }: { content: HomePage["hero"] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-32 md:px-6 lg:grid-cols-[1fr_auto] lg:gap-x-1 lg:gap-y-0 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-1">
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="mt-5">
            <h1 className="text-5xl font-medium leading-[1.08] tracking-tighter md:text-6xl whitespace-pre-line">
              {content.headlineDark}
            </h1>
            <h2 className="mt-3 text-5xl font-medium leading-[1.08] tracking-tighter text-accent md:text-5xl">
              {content.headlineAccent}
            </h2>
          </div>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-base">
            {content.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ArrowLink
              {...content.primaryCta}
              className="rounded-full bg-foreground px-7 py-4 text-sm text-background"
            />
            <ArrowLink {...content.secondaryCta} className="text-sm" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 md:hidden">
            <div className="h-32 rounded-2xl bg-accent" />
            <div className="row-span-2 rounded-2xl bg-mustard" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-24 rounded-xl bg-lavender" />
              <div className="h-24 rounded-xl bg-primary" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export function ValuePropBand({
  content,
}: {
  content: HomePage["valueProp"];
}) {
  return (
    <section
      className="bg-primary px-5 py-14 text-primary-foreground md:px-6 md:py-20"
      style={{
        backgroundImage: "url('/pattern-binary-blue.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "1440px 414px",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[3fr_2fr] md:items-start">
        <h2 className="text-3xl leading-tight md:text-[44px]">
          {content.heading}
        </h2>

        <div>
          <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/80 md:text-[16px]">
            {content.body}
          </p>

          <ArrowLink
            {...content.cta}
            className="mt-6 inline-block border-b pb-1 text-sm"
          />
        </div>
      </div>
    </section>
  );
}


export function TrustedByStrip({
  content,
  metrics,
}: {
  content: HomePage["trustedBy"];
  metrics: HomePage["metrics"];
}) {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "#FFFCF7" }}
    >
      <div className="mx-auto max-w-[1192px] px-5 md:px-6">
        {/* Heading */}
        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-foreground">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 max-w-[620px] text-[32px] font-medium leading-[1.08] tracking-tight md:mt-5 md:text-[40px]">
          <span className="block">{content.heading}</span>

          <span className="block italic font-normal text-muted-foreground">
            {content.headingItalic}
          </span>
        </h2>

        {/* Mobile Metrics */}
        <div className="mt-10 grid grid-cols-3 gap-5 lg:hidden">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="text-[24px] font-medium leading-none">
                {metric.value}
              </div>

              <div className="mt-2 text-[12px] uppercase leading-tight tracking-[0.14em] text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          className="mt-10 overflow-hidden rounded-[24px] border md:mt-14 md:rounded-[30px] lg:grid lg:grid-cols-[280px_1fr]"
          style={{
            backgroundColor: "#FBF6EE",
            borderColor: "#E8E2D9",
          }}
        >
          {/* Desktop Metrics */}
          <div
            className="hidden lg:flex lg:flex-col lg:justify-evenly"
            style={{ backgroundColor: "#FFFCF7" }}
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="px-10 py-11">
                <div className="text-[48px] font-medium leading-none tracking-tight">
                  {metric.value}
                </div>

                <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Logo Grid */}
          <div
            className="grid grid-cols-3"
            style={{
              backgroundColor: "#FBF6EE",
              borderLeft: "1px solid #E8E2D9",
            }}
          >
            {content.logos.map((logo, index) => {
              const classes = [
                "flex items-center justify-center",
                "bg-[#FBF6EE]",
                "p-4 md:p-6 lg:p-8",
                "h-[84px] sm:h-[100px] md:h-[130px] lg:h-[180px]",
              ];

              if (index % 3 !== 0) {
                classes.push("border-l");
              }

              if (index >= 3) {
                classes.push("border-t");
              }

              return (
                <div
                  key={logo.name}
                  className={classes.join(" ")}
                  style={{
                    borderColor: "#E8E2D9",
                  }}
                >
                  <Image
                  // @ts-ignore
                    src={logo.image || "/images/logo-placeholder.svg"}
                    alt={logo.name}
                    width={180}
                    height={70}
                    className="h-auto w-auto max-w-[90px] object-contain sm:max-w-[110px] md:max-w-[130px] lg:max-w-[170px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export function AIPhilosophyBand({ content }: { content: HomePage["aiBand"] }) {
  return (
    <section
      className="bg-mustard py-20 text-foreground md:py-28"
      style={{
        backgroundImage: "url('/pattern-binary-mustard.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "1440px 414px",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid gap-8 md:grid-cols-[6fr_4fr] md:gap-12">
          {/* Left: 6 — eyebrow + heading */}
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-4xl leading-tight tracking-tight md:text-6xl">
              {content.heading}
            </h2>
          </div>

          {/* Right: 4 — body + CTA */}
          <div className="md:pt-10">
            <p className="max-w-xl leading-relaxed">{content.body}</p>
            <ArrowLink
              {...content.cta}
              className="mt-6 inline-block border-b border-foreground pb-1 text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export function EditorialPhotoBlock({
  content,
}: {
  content: HomePage["editorial"];
}) {
  return (
    <section className="hidden bg-background px-6 pb-24 md:block">
      <div className="relative mx-auto aspect-[21/9] max-w-7xl overflow-hidden rounded-[2rem]">
        <Image
          src="/editorial/team-photo.png"
          alt={content.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
export function FooterCTA({
  cta,
  content,
}: {
  cta: HomePage["footerCta"];
  content: HomePage["footer"];
}) {
  return (
    <footer className="bg-ink px-5 py-20 text-primary-foreground md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs uppercase">{cta.eyebrow}</p>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            {cta.headingLine1}
          </h2>
          {cta.italicHeadingLine && (
            <p className="mt-2 font-serif text-4xl italic leading-tight md:text-6xl text-primary">
              {cta.italicHeadingLine}
            </p>
          )}
        </div>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 md:flex-row">
          <a
            href={cta.primaryCta.href}
            className="flex-1 rounded-full bg-background px-7 py-4 text-center font-semibold text-foreground"
          >
            {cta.primaryCta.label}
          </a>
          <a
            href={cta.secondaryCta.href}
            className="flex-1 rounded-full border border-primary-foreground px-7 py-4 text-center font-semibold"
          >
            {cta.secondaryCta.label}
          </a>
        </div>
        <div className="mt-24 grid gap-10 border-b border-primary-foreground/20 pb-16 md:grid-cols-4">
          <div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              {content.description}
            </p>
            <p className="mt-8 text-sm">{content.location}</p>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <a href={`mailto:${content.contact.email}`} className="mt-4 block">
              {content.contact.email}
            </a>
            <p className="mt-2">{content.contact.phone}</p>
          </div>
          <div>
            <p className="footer-label">Navigation</p>
            {content.navLinks.map((l) => (
              <a key={l.label} href={l.href} className="mt-2 block">
                {l.label}
              </a>
            ))}
          </div>
          <div>
            <p className="footer-label">Connect</p>
            {content.social.map((s) => (
              <a key={s.platform} href={s.href} className="mt-2 block">
                {s.platform}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-7 text-sm text-primary-foreground/50">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}

// Each award card is a single pre-composed image (328x400) that already
// includes the gradient background, logo, divider and category label.
const awardsData = [
  {
    id: 1,
    title: 'SERVICE DESIGN AWARD',
    category: 'SERVICE DESIGN',
    image: '/awards/service-design-award.png',
    bgGradient: 'from-[#eef8ce] via-[#f7fbe8] to-[#ccf244]', // Lime glow
    logo: 'https://placehold.co/240x100/transparent/333333?text=SERVICE+DESIGN+AWARD',
  },
  {
    id: 2,
    title: 'THE HELEN HAMLYN CENTRE FOR DESIGN',
    category: 'INCLUSIVE DESIGN',
    image: '/awards/helen-hamlyn-centre.png',
    bgGradient: 'from-[#f0f0ff] via-[#f6f6ff] to-[#635bff]', // Purple/blue glow
    logo: 'https://placehold.co/240x100/transparent/000000?text=THE+HELEN+HAMLYN',
  },
  {
    id: 3,
    title: 'Clutch',
    category: 'TOP 10 DESIGN STUDIOS IN MUMBAI',
    image: '/awards/clutch-top-10-mumbai.png',
    bgGradient: 'from-[#fff5eb] via-[#fff8f2] to-[#ff6b2c]', // Orange glow
    logo: 'https://placehold.co/240x100/transparent/000000?text=Clutch',
  },
];

export function AwardsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 font-sans">
      {/* Header Section */}
      <div className="mb-12">
        {/* Eyebrow - 12px */}
        <span className="text-[12px] font-medium tracking-[0.2em] text-gray-400 uppercase block mb-3">
          AWARDS
        </span>

        {/* Heading & Subheading - 40px */}
        <h2 className="text-[32px] sm:text-[40px] leading-[1.15] text-gray-900 font-normal tracking-tight max-w-2xl">
          Every recognition tells the story{' '}
          <span className="italic font-light text-gray-400 block sm:inline">
            of a problem solved beautifully.
          </span>
        </h2>
      </div>

      {/* Cards Grid: Stacked on Mobile, 3 Columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {awardsData.map((award) => (
          <Image
            key={award.id}
            src={award.image}
            alt={`${award.title} — ${award.category}`}
            width={328}
            height={400}
            className="h-auto w-full transition-transform duration-300 hover:-translate-y-1"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ))}

        {/*
          Previous CSS-composed award card. Superseded by the pre-composed
          award images above; kept for reference.

        {awardsData.map((award) => (
          <div
            key={award.id}
            className="relative flex flex-col items-center justify-between h-[420px] p-8 rounded-2xl overflow-hidden shadow-sm border border-black/5 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Background Gradient & Blurred Light Effect *\/}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${award.bgGradient} opacity-30`}
            />
            <div
              className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full bg-gradient-to-t ${award.bgGradient} blur-2xl opacity-75`}
            />

            {/* Card Content *\/}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center pt-8">
              <img
                src={award.logo}
                alt={award.title}
                className="max-h-24 w-auto object-contain"
              />
            </div>

            {/* Bottom Label Section *\/}
            <div className="relative z-10 w-full text-center pb-2">
              <div className="w-12 h-[1px] bg-gray-300 mx-auto mb-4" />
              <p className="text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
                {award.category}
              </p>
            </div>
          </div>
        ))}
        */}
      </div>
    </section>
  );
}