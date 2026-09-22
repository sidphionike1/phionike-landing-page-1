import type { WorkPage } from "@/content/schema"

type TestimonialItem = WorkPage["testimonials"]["items"][number]

// ── Placeholder data for local dev/preview — swap for content.items ──
const PLACEHOLDER_ITEMS: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Working with the Phionike team for our product UIUX has been an amazing experience. The team is young, open to new ideas and definitely bring new design ideas for our product to the table. As their client for more the 2 years, I would definitely recommend you to try out their services.",
    name: "Robin Das",
    role: "CEO",
    company: "Brandintelle",
    photoSrc: "https://placehold.co/500x633/D5B2FF/333333?text=Photo",
    accentColor: "#3C3BFF",
  },
  {
    id: "2",
    quote:
      "Roopam and Phionike team have been very cooperative and it was great working with them. The skill sets are great and very professional approach.",
    name: "Rajpreet Kaur",
    role: "",
    company: "Google Reviews",
    photoSrc: "https://placehold.co/500x633/F2B800/333333?text=Photo",
    accentColor: "#FF5B24",
  },
  {
    id: "3",
    quote:
      "I recently had the pleasure of working with Phionike. From start to finish, they were incredibly communicative, responsive, and diligent in their work. Beyond being a design partner, they served as an invaluable thought partner, always willing to go above and beyond to help us identify strategic opportunities that could be leveraged through design.",
    name: "Ian Carnahan",
    role: "",
    company: "Google Reviews",
    photoSrc: "https://placehold.co/500x633/FF5B24/333333?text=Photo",
    accentColor: "#D5B2FF",
  },
  {
    id: "4",
    quote:
      "Working With Roopam is a Delight ! Quick Prototyping and working with a talented team.",
    name: "Saurabh Kabra",
    role: "",
    company: "Google Reviews",
    photoSrc: "https://placehold.co/500x633/3C3BFF/FFFFFF?text=Photo",
    accentColor: "#F2B800",
  },
]

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="flex h-full w-[calc((100vw-var(--section-pad-x)-1.25rem)/1.1)] shrink-0 snap-start flex-col rounded-xl bg-white p-7 text-left sm:w-auto sm:min-w-0 sm:shrink">
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
          {[item.role, item.company].filter(Boolean).join(" / ")}
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
        <h2 className="type-sans-regular text-center text-lead leading-[125%] text-[#111111] md:text-left md:text-display-xs md:leading-normal">
          {heading}
        </h2>
        <p className="type-sans-regular mx-auto mt-4 max-w-xl text-center text-body-lg leading-[160%] text-[#212121]/60 md:mx-0 md:text-left">
          {subheading}
        </p>

        <div className="mt-20 flex gap-5 overflow-x-auto snap-x snap-mandatory overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-sm:-mr-[var(--section-pad-x)] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
