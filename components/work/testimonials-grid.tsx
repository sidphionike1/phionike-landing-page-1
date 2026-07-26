import Image from "next/image"
import type { WorkPage } from "@/content/schema"

type TestimonialItem = WorkPage["testimonials"]["items"][number]

// ── Placeholder data for local dev/preview — swap for content.items ──
const PLACEHOLDER_ITEMS: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Roopam loves design and is often found observing design books, products and services to learn from them. He comes from the background of Engineering & Design, so he understand well how to make a good blend of Form & Function.",
    name: "Paulina Sabini",
    role: "CEO",
    company: "Take 2 Films",
    photoSrc: "https://placehold.co/500x633/D5B2FF/333333?text=Photo",
    accentColor: "#3C3BFF",
  },
  {
    id: "2",
    quote:
      "Maya enjoys exploring the intersection of art and technology. Her background in fine arts helps her craft visually stunning interfaces that are also user-friendly.",
    name: "Peter Liu",
    role: "Art Director",
    company: "Creative Hub",
    photoSrc: "https://placehold.co/500x633/F2B800/333333?text=Photo",
    accentColor: "#FF5B24",
  },
  {
    id: "3",
    quote:
      "Alexander is a passionate UX researcher who thrives on understanding user behavior. With years of experience in both tech and design, he constantly bridges the gap between users and products.",
    name: "Alexander Grant",
    role: "UX Researcher",
    company: "Innovate Tech",
    photoSrc: "https://placehold.co/500x633/FF5B24/333333?text=Photo",
    accentColor: "#D5B2FF",
  },
  {
    id: "4",
    quote:
      "Liam is a front-end developer with a keen eye for aesthetics. His love for coding and design merge seamlessly, allowing him to create interactive experiences that delight users.",
    name: "Lyra Johnson",
    role: "Front-End Developer",
    company: "Tech Solutions",
    photoSrc: "https://placehold.co/500x633/3C3BFF/FFFFFF?text=Photo",
    accentColor: "#F2B800",
  },
]

function TestimonialCardDesktop({ item }: { item: TestimonialItem }) {
  return (
    <article
      className="group relative hidden overflow-hidden rounded-xl bg-white md:block"
      style={{ aspectRatio: "3/3.8" }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={item.photoSrc}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 50vw, 25vw"
        />
      </div>

      <div className="absolute inset-0 bottom-24 z-10 flex flex-col justify-start rounded-xl bg-white p-7 transition-transform duration-500 ease-out group-hover:-translate-y-full">
        <blockquote>
          <p className="text-[13px] leading-relaxed text-foreground/80 line-clamp-[8]">
            &ldquo;{item.quote}&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 p-7 pt-4">
        <footer className="flex items-center gap-3">
          <div
            className="h-10 w-10 shrink-0 overflow-hidden rounded-full"
            style={{ backgroundColor: item.accentColor }}
          >
            <Image
              src={item.photoSrc}
              alt={item.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-foreground">{item.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.role} / {item.company}
            </p>
          </div>
        </footer>
      </div>
    </article>
  )
}

function TestimonialCardMobile({ item }: { item: TestimonialItem }) {
  return (
    <article
      className="relative block overflow-hidden rounded-xl md:hidden"
      style={{ aspectRatio: "3/3.8" }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={item.photoSrc} alt={item.name} fill className="object-cover" sizes="100vw" />
      </div>

      <div className="absolute inset-0 bg-white/80" aria-hidden="true" />

      <div className="relative z-10 p-7 pb-32">
        <blockquote>
          <p className="text-[13px] leading-relaxed text-foreground/80 line-clamp-[8]">
            &ldquo;{item.quote}&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="bg-gradient-to-t from-white/80 to-white/40 px-7 pb-7 pt-16">
          <footer className="flex items-center gap-3">
            <div
              className="h-10 w-10 shrink-0 overflow-hidden rounded-full"
              style={{ backgroundColor: item.accentColor }}
            >
              <Image
                src={item.photoSrc}
                alt={item.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.role} / {item.company}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsGrid({ content }: { content?: WorkPage["testimonials"] }) {
  const items = content?.items ?? PLACEHOLDER_ITEMS
  const heading = content?.heading ?? "Trusted by ambitious teams."
  const subheading =
    content?.subheading ?? "We've partnered with startups and enterprises to solve meaningful challenges."

  return (
    <section className="bg-background py-20 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <h2 className="text-4xl font-medium tracking-tight md:text-5xl">{heading}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{subheading}</p>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id}>
              <TestimonialCardDesktop item={item} />
              <TestimonialCardMobile item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}