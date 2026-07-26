"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

type CardSize = "big" | "medium" | "small";

// ── DATA: pure content, tagged on 3 independent filter axes ───────
interface PortfolioItem {
  id: string;
  title: string;
  tagline: string;
  mockupSrc: string;
  industry: string;
  service: string;
  challenge: string;
}

const ALL_ITEMS: PortfolioItem[] = [
  {
    id: "1",
    title: "Oren - Smart Ring App",
    tagline:
      "Great design isn't defined by the number of screens delivered. It's more about the impact it creates and the value it brings to businesses.",
    mockupSrc: "/portfolio/oren-1.png",
    industry: "Healthcare",
    service: "Product Design",
    challenge: "User Engagement",
  },
  {
    id: "2",
    title: "Oren - Smart Ring App",
    tagline:
      "Great design isn't defined by the number of screens delivered. It's more about the value it brings.",
    mockupSrc: "/portfolio/oren-2.png",
    industry: "Fintech",
    service: "UX Research",
    challenge: "Onboarding",
  },
  {
    id: "3",
    title: "Oren - Smart Ring App",
    tagline: "Great design isn't defined by the number of screens delivered.",
    mockupSrc: "/portfolio/oren-3.png",
    industry: "Logistics",
    service: "Product Design",
    challenge: "Data Visualization",
  },
  {
    id: "4",
    title: "Oren - Smart Ring App",
    tagline: "Great design isn't defined by the number of screens delivered.",
    mockupSrc: "/portfolio/oren-4.png",
    industry: "Fintech",
    service: "Branding",
    challenge: "Onboarding",
  },
  {
    id: "5",
    title: "Oren - Smart Ring App",
    tagline: "Great design isn't defined by the number of screens delivered.",
    mockupSrc: "/portfolio/oren-5.png",
    industry: "Logistics",
    service: "UX Research",
    challenge: "Data Visualization",
  },
  {
    id: "6",
    title: "Oren - Smart Ring App",
    tagline: "Great design isn't defined by the number of screens delivered.",
    mockupSrc: "/portfolio/oren-6.png",
    industry: "Fintech",
    service: "Product Design",
    challenge: "User Engagement",
  },
  {
    id: "7",
    title: "Oren - Smart Ring App",
    tagline:
      "Great design isn't defined by the number of screens delivered. It's more about the value it brings.",
    mockupSrc: "/portfolio/oren-7.png",
    industry: "Healthcare",
    service: "Branding",
    challenge: "Onboarding",
  },
  {
    id: "8",
    title: "Oren - Smart Ring App",
    tagline:
      "Great design isn't defined by the number of screens delivered. It's more about the impact it creates and the value it brings to businesses.",
    mockupSrc: "/portfolio/oren-8.png",
    industry: "Healthcare",
    service: "Product Design",
    challenge: "Data Visualization",
  },
];

// Each dropdown's own option list
const FILTER_GROUPS = {
  Industry: ["Healthcare", "Fintech", "Logistics"],
  Service: ["Product Design", "UX Research", "Branding"],
  Challenge: ["User Engagement", "Onboarding", "Data Visualization"],
} as const;

type FilterGroupName = keyof typeof FILTER_GROUPS;

// ── LAYOUT: fixed slot-size templates, independent of data ───────
const SIZE_CONFIG: Record<
  CardSize,
  { frameW: number; imgW: number; imgH: number }
> = {
  big: { frameW: 642, imgW: 642, imgH: 480 },
  medium: { frameW: 534, imgW: 534, imgH: 401 },
  small: { frameW: 427, imgW: 429, imgH: 322 },
};

// Mobile: every card is this exact fixed size — no big/medium/small variation
const MOBILE_SIZE = { frameW: 356, imgW: 349, imgH: 261 };

const LEFT_PATTERN: CardSize[] = ["big", "medium", "small", "small"];
const RIGHT_PATTERN: CardSize[] = ["small", "small", "medium", "big"];

function assignSizes(items: PortfolioItem[], pattern: CardSize[]) {
  return items.map((item, i) => ({ item, size: pattern[i % pattern.length] }));
}

function PortfolioCard({
  item,
  dims,
  showBottomPadding = false,
}: {
  item: PortfolioItem;
  dims: { frameW: number; imgW: number; imgH: number };
  showBottomPadding?: boolean;
}) {
  return (
    <article className="flex flex-col" style={{ width: dims.frameW }}>
      <div>
        <h3 className="truncate text-lg font-medium tracking-tight text-foreground md:text-xl">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {item.tagline}
        </p>
      </div>

      <div
        className={`relative mt-4 overflow-hidden rounded-xl bg-card ${showBottomPadding ? "mb-6" : ""}`}
        style={{ width: dims.imgW, height: dims.imgH }}
      >
        <Image
          src={item.mockupSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes={`${dims.imgW}px`}
          quality={85}
        />
      </div>
    </article>
  );
}

// Single dropdown filter (Industry / Service / Challenge)
function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = selected !== null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "border border-primary bg-primary text-primary-foreground"
            : "border border-border bg-background text-foreground hover:border-foreground/30"
        }`}
      >
        {selected ?? label}
        <ChevronDown
          size={13}
          className={`opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 min-w-[180px] rounded-xl border border-border bg-background p-1.5 shadow-lg">
          {selected !== null && (
            <button
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-card"
            >
              Clear
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                selected === opt
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-card"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
  );
}

export function PortfolioFilterGrid() {
  // null = "All" is active; each dropdown holds its own selection independently
  const [selections, setSelections] = useState<
    Record<FilterGroupName, string | null>
  >({
    Industry: null,
    Service: null,
    Challenge: null,
  });

  const isAllActive = Object.values(selections).every((v) => v === null);

  const handleSelect = (group: FilterGroupName, value: string | null) => {
    setSelections((prev) => ({ ...prev, [group]: value }));
  };

  const handleAllClick = () => {
    setSelections({ Industry: null, Service: null, Challenge: null });
  };

  // AND logic: an item must match every currently-active dropdown selection
  const filteredItems = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      if (selections.Industry && item.industry !== selections.Industry)
        return false;
      if (selections.Service && item.service !== selections.Service)
        return false;
      if (selections.Challenge && item.challenge !== selections.Challenge)
        return false;
      return true;
    });
  }, [selections]);

  const { left, right } = useMemo(() => {
    const leftItems: PortfolioItem[] = [];
    const rightItems: PortfolioItem[] = [];
    filteredItems.forEach((item, i) =>
      (i % 2 === 0 ? leftItems : rightItems).push(item),
    );
    return {
      left: assignSizes(leftItems, LEFT_PATTERN),
      right: assignSizes(rightItems, RIGHT_PATTERN),
    };
  }, [filteredItems]);

  const hasResults = filteredItems.length > 0;

  return (
    <section className="relative bg-background px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-[1198px]">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Find work that&rsquo;s relevant to you
          </h2>
          <p className="mt-2 text-sm italic text-muted-foreground md:text-4xl">
            Browse projects by industry or service
          </p>
        </div>

        {/* Filters: All (single toggle) + 3 independent dropdowns */}
        <div className="mb-10 flex flex-wrap gap-2.5 md:mb-14">
          <button
            onClick={handleAllClick}
            className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              isAllActive
                ? "border border-primary bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:border-foreground/30"
            }`}
          >
            All
          </button>

          {(Object.keys(FILTER_GROUPS) as FilterGroupName[]).map((group) => (
            <FilterDropdown
              key={group}
              label={group}
              options={FILTER_GROUPS[group]}
              selected={selections[group]}
              onSelect={(value) => handleSelect(group, value)}
            />
          ))}
        </div>

        {hasResults ? (
          <>
            {/* Desktop */}
            <div className="hidden gap-8 md:flex md:items-start">
              <div className="flex flex-col items-start gap-16">
                {left.map(({ item, size }) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    dims={SIZE_CONFIG[size]}
                    showBottomPadding={size === "big"}
                  />
                ))}
              </div>

              <div className="flex flex-col items-end gap-16 -ml-[160px]">
                {right.map(({ item, size }) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    dims={SIZE_CONFIG[size]}
                    showBottomPadding={size === "big"}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: fixed size for every card, no size pattern */}
            <div className="flex flex-col gap-10 md:hidden">
              {filteredItems.slice(0, 4).map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  dims={MOBILE_SIZE}
                  showBottomPadding
                />
              ))}
            </div>

            <SeeAllWorkCTA />
          </>
        ) : (
          <p className="py-20 text-center text-muted-foreground">
            No items found
          </p>
        )}
      </div>
    </section>
  );
}
