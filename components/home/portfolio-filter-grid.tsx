'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import type { PortfolioSection } from '@/content/schema'

type CardSize = 'large' | 'medium' | 'small'

interface PortfolioItem {
  id: string
  title: string
  tagline: string
  sectors: string[]
  discipline: string
  variant: 'standard' | 'darkPhoneTriple'
  mockupSrc: string
  size: CardSize
}

interface FilterChip {
  id: string
  label: string
  isActive: boolean
}

// Reusable PortfolioCard component
function PortfolioCard({ item, size }: { item: PortfolioItem; size: CardSize }) {
  const imageDimensions = {
    large: { height: 400, className: 'h-96' },
    medium: { height: 280, className: 'h-64' },
    small: { height: 180, className: 'h-44' },
  }

  const dims = imageDimensions[size]

  return (
    <article className="group break-inside-avoid">
      {/* Container for darkPhoneTriple variant */}
      {item.variant === 'darkPhoneTriple' ? (
        <div className="relative overflow-hidden rounded-2xl bg-ink p-3">
          <Image
            src={item.mockupSrc}
            alt={item.title}
            width={1200}
            height={800}
            className="h-auto w-full rounded-xl object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </div>
      ) : (
        <div className={`relative overflow-hidden rounded-2xl bg-card transition-transform duration-300 ${dims.className}`}>
          <Image
            src={item.mockupSrc}
            alt={item.title}
            width={1200}
            height={dims.height}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </div>
      )}

      {/* Text content */}
      <div className="mt-5">
        <h3 className="text-base font-medium tracking-tight text-foreground md:text-lg">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground md:line-clamp-2 md:text-sm leading-relaxed">
          {item.tagline}
        </p>
      </div>
    </article>
  )
}

// Filter Chips component
function FilterChips({
  filters,
  activeFilter,
  onFilterChange,
}: {
  filters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map((filter, index) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
            index === 0 && activeFilter === 'All'
              ? 'border border-primary bg-primary text-primary-foreground'
              : activeFilter === filter
                ? 'border border-primary bg-primary text-primary-foreground'
                : 'border border-border bg-background text-foreground hover:border-foreground/30'
          }`}
        >
          {filter}
          {index > 0 && <ChevronDown size={13} className="opacity-60" />}
        </button>
      ))}
    </div>
  )
}

// Two-column masonry grid
function MasonryGrid({ items }: { items: PortfolioItem[] }) {
  const leftColumn: PortfolioItem[] = []
  const rightColumn: PortfolioItem[] = []

  // Distribute items into two columns for balanced masonry layout
  items.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item)
    } else {
      rightColumn.push(item)
    }
  })

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
      {/* Left column */}
      <div className="flex flex-col gap-7 md:gap-8">
        {leftColumn.map((item) => (
          <PortfolioCard key={item.id} item={item} size={item.size} />
        ))}
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-7 md:gap-8">
        {rightColumn.map((item) => (
          <PortfolioCard key={item.id} item={item} size={item.size} />
        ))}
      </div>
    </div>
  )
}

// Mobile "See All Work" CTA
function SeeAllWorkCTA() {
  return (
    <div className="mt-10 flex justify-center md:hidden">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
      >
        See All Work
        <ArrowUpRight size={14} />
      </Link>
    </div>
  )
}

export function PortfolioFilterGrid({
  content,
  compact = false,
}: {
  content: PortfolioSection
  compact?: boolean
}) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return content.items
    }
    // For now, just show all items - filtering can be implemented based on the filter type
    return content.items
  }, [activeFilter, content.items])

  return (
    <section className="relative bg-background px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 md:mb-10">
          {compact ? (
            <div>
              <p className="text-xl font-medium md:text-2xl text-foreground">{content.eyebrow}</p>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">{content.heading}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
                {content.eyebrow}
              </h2>
              <p className="mt-2 text-sm italic text-muted-foreground md:text-base">{content.heading}</p>
            </div>
          )}
        </div>

        {/* Filter chips */}
        <div className="mb-10 md:mb-14">
          <FilterChips
            filters={content.filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Portfolio grid */}
        {filteredItems.length > 0 ? (
          <>
            <MasonryGrid items={filteredItems} />
            {!compact && <SeeAllWorkCTA />}
          </>
        ) : (
          <p className="py-20 text-center text-muted-foreground">No items found</p>
        )}
      </div>
    </section>
  )
}
