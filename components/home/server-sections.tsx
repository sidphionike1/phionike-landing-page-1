import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { HomePage } from "@/content/schema";
import { HeroVisual } from "./hero-visual";

const ArrowLink = ({
  label,
  href,
  className = "",
  arrowClassName = "",
}: {
  label: string;
  href: string;
  className?: string;
  /** Colours just the arrow glyph, leaving the label to inherit from `className`. */
  arrowClassName?: string;
}) => (
  <a href={href} className={`inline-flex items-center gap-2 ${className}`}>
    {label}
    <ArrowUpRight size={16} className={arrowClassName} />
  </a>
);


export function FloatingNavbar({ content }: { content: HomePage["nav"] }) {
  return (
    <header className="section-shell fixed inset-x-0 top-4 z-50">
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
      <div className="section-shell grid grid-cols-1 pb-16 pt-32 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-1 lg:pb-24 lg:pt-40">
        {/* Eyebrow sits above the aligned headline ↔ shapes row */}
        <p className="type-sans-medium text-caption leading-[16.5px] tracking-[3.3px] uppercase text-[#212121]/60 lg:col-start-1 lg:row-start-1">
          {content.eyebrow}
        </p>

        {/* Headline → CTAs: top aligns with shapes, CTAs pin to shape bottoms */}
        <div className="mt-5 flex flex-col lg:col-start-1 lg:row-start-2 lg:h-[487px]">
          <div>
            <h1 className="type-sans-medium whitespace-pre-line text-heading leading-normal text-[#212121] md:text-hero md:leading-[80px]">
              {content.headlineDark}
            </h1>
            <h2 className="type-sans-medium mt-3 text-heading leading-normal text-[#FF5B23] md:text-display-md md:leading-[62px] lg:whitespace-nowrap">
              {content.headlineAccent}
            </h2>
            <p className="type-sans-regular mt-7 max-w-[370px] text-body-sm leading-[20px] text-[#36454F]">
              {content.body}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-8 lg:mt-auto">
            <ArrowLink
              {...content.primaryCta}
              className="type-sans-medium rounded-full bg-foreground px-7 py-4 text-body-sm leading-[21px] text-white"
            />
            <ArrowLink
              {...content.secondaryCta}
              className="type-sans-medium text-body-sm leading-[21px] text-[#262728]"
              arrowClassName="text-[#3A39FF]"
            />
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

        {/* Shapes start on the same row as the headline (not the eyebrow) */}
        <div className="hidden lg:col-start-2 lg:row-start-2 lg:mt-5 lg:block">
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
      className="bg-primary py-14 text-primary-foreground md:py-20"
      style={{
        backgroundImage: "url('/pattern-binary-blue.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "1440px 414px",
      }}
    >
      <div className="section-shell grid gap-10 md:grid-cols-[3fr_2fr] md:items-start">
        <h2 className="type-sans-regular text-heading leading-normal text-white md:text-display-sm md:leading-[53.76px]">
          {content.heading}
          {content.headingItalic && (
            <> <em className="type-sans-italic text-white">{content.headingItalic}</em></>
          )}
        </h2>

        <div>
          <p className="type-sans-regular max-w-xl text-body-sm leading-[160%] text-white/90">
            {content.body}
          </p>

          <ArrowLink
            {...content.cta}
            className="type-sans-medium mt-6 inline-block border-b pb-1 text-body-sm leading-normal text-white"
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
      <div className="section-shell">
        {/* Heading */}
        <p className="type-sans-medium text-caption leading-[16.5px] tracking-[3.3px] text-[#212121]">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 max-w-[620px] md:mt-5">
          <span className="type-sans-regular block text-heading leading-[120%] text-[#111111] md:text-display-xs md:leading-[44.8px]">
            {content.heading}
          </span>

          <span className="type-sans-italic block text-heading leading-[120%] text-[#221122]/60 md:text-display-xs md:leading-[44.8px]">
            {content.headingItalic}
          </span>
        </h2>

        {/* Mobile Metrics */}
        <div className="mt-10 grid grid-cols-3 gap-5 lg:hidden">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="type-sans-medium text-title-lg leading-[19px] text-[#111111]">
                {metric.value}
              </div>

              <div className="type-sans-regular mt-2 text-micro leading-[19px] uppercase text-[#111111]">
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
                <div className="type-sans-regular text-display leading-[32px] text-[#111111]">
                  {metric.value}
                </div>

                <div className="type-sans-light-italic mt-3 text-body leading-[32px] uppercase text-[#111111]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Logo Grid */}
          <div
            className="grid grid-cols-3 lg:border-l"
            style={{
              backgroundColor: "#FBF6EE",
              borderColor: "#E8E2D9",
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
                  {/* These marks range from 1.8:1 (al ramz) to 10:1 (Wavelength),
                      so both axes are capped — a width-only cap would tower the
                      squarish logos and shrink the wide ones to a sliver. */}
                  <Image
                    src={logo.logoSrc}
                    alt={logo.name}
                    width={180}
                    height={70}
                    className="h-auto w-auto object-contain max-h-[28px] max-w-[92px] sm:max-h-[34px] sm:max-w-[112px] md:max-h-[44px] md:max-w-[140px] lg:max-h-[56px] lg:max-w-[170px]"
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
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-[6fr_4fr] md:gap-12">
          {/* Left: 6 — eyebrow + heading */}
          <div>
            <p className="type-sans-medium text-caption leading-[16.5px] tracking-[3.3px] text-[#212121]">
              {content.eyebrow}
            </p>
            <h2 className="type-sans-regular mt-5 max-w-4xl text-heading leading-normal text-[#212121] md:text-display-lg md:leading-[59.84px]">
              {content.heading}
              {content.headingItalic && (
                <>
                  {" "}
                  <span className="type-sans-italic">{content.headingItalic}</span>
                </>
              )}
            </h2>
          </div>

          {/* Right: 4 — body + CTA */}
          <div className="md:pt-10">
            <p className="type-sans-regular max-w-xl text-body-sm leading-[160%] text-[#212121]/90">
              {content.body}
            </p>
            <ArrowLink
              {...content.cta}
              className="type-sans-regular mt-6 inline-block border-b border-foreground pb-1 text-label leading-[19.5px] text-[#212121]"
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
    <section className="hidden bg-background pb-24 md:block">
      <div className="section-shell">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem]">
          <Image
            src="/editorial/team-photo.png"
            alt={content.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
        </div>
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
    <footer className="bg-ink py-20 text-primary-foreground md:py-28">
      <div className="section-shell">
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
    <section className="section-shell py-16 font-sans">
      {/* Header Section */}
      <div className="mb-12">
        <span className="type-sans-medium mb-3 block text-caption leading-[16.5px] tracking-[3.3px] text-[#AAAAAA]">
          AWARDS
        </span>

        <h2 className="type-vf-regular max-w-2xl text-lead leading-[34px] text-[#141414] md:text-display-xs md:leading-[44.8px]">
          Every recognition tells the story{' '}
          <span className="type-vf-italic block text-[#BBBBBB] sm:inline">
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
              <p className="text-caption font-medium tracking-[0.2em] text-gray-400 uppercase">
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