import Image from "next/image"
import type { WorkPage } from "@/content/schema"

// Idle: white card with quote + circular avatar + name/role
// Hover: full-bleed photo + theater-curtain white overlay — pure CSS, no JS
export function TestimonialsGrid({ content }: { content: WorkPage["testimonials"] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
          {content.heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {content.subheading}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-card"
              style={{ aspectRatio: "3/3.8" }}
            >
              {/* ── Photo layer (hidden until hover) ─────────────── */}
              <div
                className="absolute inset-0 scale-105 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                aria-hidden="true"
              >
                <Image
                  src={item.photoSrc}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />
                {/* Accent tint for missing photos */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{ backgroundColor: item.accentColor }}
                />
              </div>

              {/* ── Idle content ──────────────────────────────────── */}
              <div className="relative z-10 flex h-full flex-col justify-between p-7 transition-opacity duration-300 group-hover:opacity-0">
                <blockquote>
                  <p className="text-[13px] leading-relaxed text-foreground/80 line-clamp-[8]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>

                <footer className="flex items-center gap-3">
                  {/* Circular avatar placeholder */}
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

              {/* ── Theater-curtain hover overlay ─────────────────── */}
              <div
                className="absolute inset-x-0 bottom-0 z-20 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent px-7 pb-7 pt-16">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="mt-0.5 text-xs text-white/70">
                    {item.role} / {item.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
