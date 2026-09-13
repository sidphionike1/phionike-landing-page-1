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

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-7 text-left">
      <blockquote className="flex-1">
        <p className="type-sans-regular text-title-sm leading-[25px] tracking-[0.5px] text-[#212121] line-clamp-[8]">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-8 text-left">
        <p className="type-sans-medium text-title-sm leading-normal text-[#212121]">
          {item.name}
        </p>
        <p className="type-sans-regular mt-0.5 text-eyebrow leading-normal text-[#212121]/60">
          {item.role} / {item.company}
        </p>
      </footer>
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
      <div className="section-shell">
        <h2 className="type-sans-regular text-lead leading-[125%] text-[#111111] md:text-display-xs md:leading-normal">
          {heading}
        </h2>
        <p className="type-sans-regular mt-4 max-w-xl text-body-lg leading-[160%] text-[#212121]/60">
          {subheading}
        </p>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
