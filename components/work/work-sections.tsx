import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { WorkPage, GlobalContent } from "@/content/schema"

export function WorkHero({ content }: { content: WorkPage["hero"] }) {
  return (
    <section className="bg-background px-5 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Decorative tags - scattered near top */}
        <div className="relative mb-20 h-20">
          {content.decorativeTags.map((tag, index) => (
            <div
              key={tag.label}
              className={`absolute ${tag.color} rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-opacity`}
              style={{
                top: `${index % 2 === 0 ? 0 : 40}px`,
                left: `${(index * 25) % 100}px`,
              }}
            >
              {tag.label}
            </div>
          ))}
        </div>

        {/* Main hero content */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {content.eyebrow}
          </p>
          <h1 className="mt-8 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-tight">
            {content.headline}
          </h1>
        </div>

        {/* CTA and description */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Link
                href={content.primaryCta.href}
                className="flex w-fit items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all hover:shadow-lg hover:scale-105"
              >
                {content.primaryCta.label}
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="flex w-fit items-center gap-1 border-b border-foreground pb-2 text-sm font-semibold"
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground">
              Find work that&apos;s{" "}
              <em className="not-italic font-semibold">{content.subheadItalic}</em>
              {" "}to you.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{content.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DisciplineList({ steps }: { steps: GlobalContent["processSteps"] }) {
  return (
    <section className="bg-background px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Where We Create Impact
        </p>
        <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          Not every product needs the same help
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">we meet you where you are</p>

        {/* 4-column discipline list */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 md:divide-x md:divide-neutral-200">
          {steps.map((step) => (
            <div key={step.id} className="md:pl-8 first:md:pl-0">
              <div className="flex items-start gap-3">
                <div
                  className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: step.bandColor === "cobalt" ? "#2538F5" : step.bandColor === "lavender" ? "#EAE8FC" : step.bandColor === "terracotta" ? "#E65124" : "#F2A93B" }}
                />
                <h3 className="text-base font-semibold">{step.vennLabel}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function OutcomesStatement({ content }: { content: WorkPage["outcomesStatement"] }) {
  return (
    <section className="bg-background px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          {content.heading}
        </h2>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          {content.body}
        </p>
      </div>
    </section>
  )
}

export function TestimonialCards({ content }: { content: WorkPage["testimonials"] }) {
  return (
    <section className="bg-background px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {content.heading}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {content.subheading}
        </p>

        {/* Testimonial grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[2.2rem] border border-border bg-card"
            >
              {/* Card container with aspect ratio */}
              <div className="relative aspect-[3/4.2]">
                {/* Photo background - scales on hover */}
                <Image
                  src={item.photoSrc}
                  alt={`${item.name}, ${item.role}`}
                  fill
                  className="absolute inset-0 object-cover scale-125 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                />

                {/* Dark overlay that fades in on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                {/* Content - positioned absolutely for overlap */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Quote text - fades out on hover */}
                  <p className="text-sm leading-relaxed text-foreground transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
                    {item.quote}
                  </p>

                  {/* Author info - translates up on hover, text color changes */}
                  <div className="transition-all duration-500 group-hover:translate-y-0">
                    <p className="font-semibold text-foreground transition-colors duration-500 group-hover:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground transition-colors duration-500 group-hover:text-white/80">
                      {item.role} • {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
