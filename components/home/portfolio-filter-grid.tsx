"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import masonry6 from "@/content/portfolio-masonry-6.json";

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

interface Masonry6Item {
  id: string;
  title: string;
  column: "left" | "right";
  size: CardSize;
  mediaSrc: string;
  mediaType: "video" | "image";
  industry: string;
  service: string;
  challenge: string;
}

/* ── OLD 8-GRID DATA (kept for mobile + future restore) ───────────
const ALL_ITEMS_8: PortfolioItem[] = [
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
  // … remaining 7 items unchanged in git history …
];
─────────────────────────────────────────────────────────────────── */

/** Mobile continues to use the original 8-item set (images). */
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

const MASONRY_6_ITEMS = masonry6.items as Masonry6Item[];

// Each dropdown's own option list
const FILTER_GROUPS = {
  Industry: ["Healthcare", "Fintech", "Logistics", "Media", "Technology", "Recruitment"],
  Service: ["Product Design", "UX Research", "Branding"],
  Challenge: ["User Engagement", "Onboarding", "Data Visualization"],
} as const;

type FilterGroupName = keyof typeof FILTER_GROUPS;

/* ── OLD 8-GRID SIZE CONFIG (commented — desktop now uses SIZE_CONFIG_6)
const SIZE_CONFIG_8: Record<
  CardSize,
  { frameW: number; imgW: number; imgH: number }
> = {
  big: { frameW: 642, imgW: 642, imgH: 480 },
  medium: { frameW: 534, imgW: 534, imgH: 401 },
  small: { frameW: 427, imgW: 429, imgH: 322 },
};
const LEFT_PATTERN_8: CardSize[] = ["big", "medium", "small", "small"];
const RIGHT_PATTERN_8: CardSize[] = ["small", "small", "medium", "big"];
─────────────────────────────────────────────────────────────────── */

/** Desktop 6-grid media frame sizes (Figma). */
const SIZE_CONFIG_6: Record<
  CardSize,
  { frameW: number; imgW: number; imgH: number }
> = {
  big: { frameW: 642, imgW: 642, imgH: 598 },
  medium: { frameW: 534, imgW: 534, imgH: 519 },
  small: { frameW: 427, imgW: 427, imgH: 426 },
};

// Mobile: every card is 95% of the mobile viewport width, fixed image height
const MOBILE_SIZE: {
  frameW: number | string;
  imgW: number | string;
  imgH: number;
} = {
  frameW: "95%",
  imgW: "95%",
  imgH: 261,
};

/**
 * Lazy autoplaying video: mounts src only near viewport, plays while visible,
 * pauses when off-screen to keep the page light.
 */
function LazyWorkVideo({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const tryPlay = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const play = el.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          // Defer play until after src is attached on next paint
          requestAnimationFrame(() => tryPlay());
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [tryPlay]);

  useEffect(() => {
    if (!shouldLoad) return;
    tryPlay();
  }, [shouldLoad, src, tryPlay]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-label={title}
      // Only attach src once near viewport — avoids eager download of all 6.
      {...(shouldLoad ? { src } : {})}
    />
  );
}

function PortfolioCard({
  item,
  dims,
  showBottomPadding = false,
  centered = false,
  titleClassName,
  taglineClassName,
  categoryClassName,
  showCategory = false,
  showTagline = true,
}: {
  item: PortfolioItem;
  dims: { frameW: number | string; imgW: number | string; imgH: number };
  showBottomPadding?: boolean;
  centered?: boolean;
  titleClassName?: string;
  taglineClassName?: string;
  categoryClassName?: string;
  showCategory?: boolean;
  showTagline?: boolean;
}) {
  return (
    <article
      className={`flex flex-col ${centered ? "mx-auto" : ""}`}
      style={{ width: dims.frameW }}
    >
      <div>
        {showCategory && (
          <p
            className={
              categoryClassName ??
              "type-sans-regular text-eyebrow tracking-[1px] uppercase text-[#212121]/60"
            }
          >
            {item.industry}
          </p>
        )}
        <h3
          className={
            titleClassName ??
            "type-vf-regular truncate text-title-lg leading-[38.4px] text-[#141414] md:text-heading md:leading-[38.4px]"
          }
        >
          {item.title}
        </h3>
        {showTagline && (
          <p
            className={
              taglineClassName ??
              "type-sans-regular mt-2 line-clamp-2 text-body-sm leading-[19.6px] text-[#212121]/60"
            }
          >
            {item.tagline}
          </p>
        )}
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
          sizes={typeof dims.imgW === "number" ? `${dims.imgW}px` : "95vw"}
          quality={85}
          loading="lazy"
        />
      </div>
    </article>
  );
}

function Masonry6Card({
  item,
  titleClassName,
  showCategory = false,
  categoryClassName,
}: {
  item: Masonry6Item;
  titleClassName?: string;
  showCategory?: boolean;
  categoryClassName?: string;
}) {
  const dims = SIZE_CONFIG_6[item.size];

  return (
    <article className="flex flex-col" style={{ width: dims.frameW }}>
      <div>
        {showCategory && (
          <p
            className={
              categoryClassName ??
              "type-sans-regular text-eyebrow tracking-[1px] uppercase text-[#212121]/60"
            }
          >
            {item.industry}
          </p>
        )}
        <h3
          className={
            titleClassName ??
            "type-vf-regular text-title-lg leading-[38.4px] text-[#141414] md:text-heading md:leading-[38.4px]"
          }
        >
          {item.title}
        </h3>
      </div>

      <div
        className="relative mt-4 overflow-hidden rounded-xl bg-[#EDEAE4]"
        style={{ width: dims.imgW, height: dims.imgH }}
      >
        {item.mediaType === "video" ? (
          <LazyWorkVideo
            src={item.mediaSrc}
            title={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={item.mediaSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes={`${dims.imgW}px`}
            quality={85}
            loading="lazy"
          />
        )}
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
  chipClassName,
}: {
  label: string;
  options: readonly string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
  chipClassName: string;
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
        className={`${chipClassName} inline-flex items-center gap-1.5 rounded-full px-5 py-2 leading-normal transition-all duration-200 ${
          isActive
            ? "border border-primary bg-primary text-white"
            : "border border-border bg-background text-[#111111] hover:border-foreground/30"
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
              className={`block w-full rounded-lg px-3 py-2 text-left type-vf-regular text-body-sm ${
                selected === opt
                  ? "bg-primary text-white"
                  : "text-[#111111] hover:bg-card"
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
        className="type-sans-medium inline-flex items-center gap-2 border-b border-[#111111] pb-1 text-label leading-[19.5px] text-[#111111] transition-opacity hover:opacity-70"
      >
        See All Work
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

export function PortfolioFilterGrid({
  typography = "home",
}: {
  typography?: "home" | "work";
}) {
  const isWork = typography === "work";
  const chipClassName = isWork
    ? "type-sans-regular text-eyebrow"
    : "type-vf-regular text-eyebrow";
  const cardTitleClassName = isWork
    ? "type-sans-medium truncate text-title leading-normal text-[#141414] md:text-heading md:leading-[38.4px]"
    : "type-vf-regular truncate text-title-lg leading-[38.4px] text-[#141414] md:text-heading md:leading-[38.4px]";
  const cardTaglineClassName = isWork
    ? "type-sans-regular mt-2 line-clamp-2 text-body-sm leading-[140%] text-[#212121]"
    : "type-sans-regular mt-2 line-clamp-2 text-body-sm leading-[19.6px] text-[#212121]/60";
  const cardCategoryClassName =
    "type-sans-regular mb-1 text-eyebrow tracking-[1px] uppercase text-[#212121]/60";
  const masonryTitleClassName = isWork
    ? "type-sans-medium text-title leading-normal text-[#141414] md:text-heading md:leading-[38.4px]"
    : "type-vf-regular text-title-lg leading-[38.4px] text-[#141414] md:text-heading md:leading-[38.4px]";

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

  const matchesFilters = useCallback(
    (item: { industry: string; service: string; challenge: string }) => {
      if (selections.Industry && item.industry !== selections.Industry)
        return false;
      if (selections.Service && item.service !== selections.Service)
        return false;
      if (selections.Challenge && item.challenge !== selections.Challenge)
        return false;
      return true;
    },
    [selections],
  );

  // Mobile: original 8-grid filtering
  const filteredMobileItems = useMemo(() => {
    return ALL_ITEMS.filter(matchesFilters);
  }, [matchesFilters]);

  // Desktop: 6-grid masonry filtering (column order preserved)
  const { left6, right6 } = useMemo(() => {
    const filtered = MASONRY_6_ITEMS.filter(matchesFilters);
    return {
      left6: filtered.filter((i) => i.column === "left"),
      right6: filtered.filter((i) => i.column === "right"),
    };
  }, [matchesFilters]);

  const hasDesktopResults = left6.length + right6.length > 0;
  const hasMobileResults = filteredMobileItems.length > 0;

  return (
    <section
      className="relative py-14 md:py-20"
      style={{ backgroundColor: "#FFFCF7" }}
    >
      <div className="section-shell">
        <div className="mb-8 md:mb-10">
          {isWork ? (
            <>
              <h2 className="type-sans-regular text-lead leading-[125%] text-[#212121] md:text-display-xs md:leading-normal">
                Find work that&rsquo;s{" "}
                <em className="type-sans-light-italic">relevant</em> to you.
              </h2>
              <p className="type-sans-regular mt-2 text-body-lg leading-[160%] text-[#212121]/60">
                Browse projects by industry, service or the challenge
                you&rsquo;re looking to solve.
              </p>
            </>
          ) : (
            <>
              <h2 className="type-sans-regular text-heading leading-[120%] text-[#212121] md:text-display-xs md:leading-[47.84px]">
                Find work that&rsquo;s relevant to you
              </h2>
              <p className="type-sans-light-italic mt-2 text-heading leading-[120%] text-[#212121]/60 md:text-display-xs md:leading-[47.84px]">
                Browse projects by industry or service
              </p>
            </>
          )}
        </div>

        {/* Filters: All (single toggle) + 3 independent dropdowns */}
        <div className="mb-10 flex flex-wrap gap-2.5 md:mb-14">
          <button
            onClick={handleAllClick}
            className={`${chipClassName} inline-flex items-center rounded-full px-5 py-2 leading-normal transition-all duration-200 ${
              isAllActive
                ? "border border-primary bg-primary text-white"
                : "border border-border bg-background text-[#111111] hover:border-foreground/30"
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
              chipClassName={chipClassName}
            />
          ))}
        </div>

        {/* ── DESKTOP: 6-grid masonry
            Pattern: big|small · medium|medium (right raised) · small|big
            Right column is items-end so smaller cards sit flush right.
            Mild negative margin fits two 642 tracks in the section shell
            without covering the left big card (Soli is small = 427). */}
        {hasDesktopResults ? (
          <div className="hidden md:flex md:items-start md:justify-between">
            <div
              className="flex shrink-0 flex-col items-start gap-16"
              style={{ width: SIZE_CONFIG_6.big.frameW }}
            >
              {left6.map((item) => (
                <Masonry6Card
                  key={item.id}
                  item={item}
                  titleClassName={masonryTitleClassName}
                  showCategory={isWork}
                  categoryClassName={cardCategoryClassName}
                />
              ))}
            </div>

            <div
              className="flex shrink-0 flex-col items-end gap-16 -ml-[84px] -mt-10"
              style={{ width: SIZE_CONFIG_6.big.frameW }}
            >
              {right6.map((item) => (
                <Masonry6Card
                  key={item.id}
                  item={item}
                  titleClassName={masonryTitleClassName}
                  showCategory={isWork}
                  categoryClassName={cardCategoryClassName}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="hidden py-20 text-center text-muted-foreground md:block">
            No items found
          </p>
        )}

        {/* ── MOBILE: original behaviour (8-item image cards) ── */}
        {hasMobileResults ? (
          <>
            <div className="flex flex-col gap-10 md:hidden">
              {filteredMobileItems.slice(0, 4).map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  dims={MOBILE_SIZE}
                  showBottomPadding
                  centered
                  titleClassName={cardTitleClassName}
                  taglineClassName={cardTaglineClassName}
                  showCategory={isWork}
                  categoryClassName={cardCategoryClassName}
                />
              ))}
            </div>
            <SeeAllWorkCTA />
          </>
        ) : (
          <p className="py-20 text-center text-muted-foreground md:hidden">
            No items found
          </p>
        )}

        {/* ── OLD DESKTOP 8-GRID (commented out) ─────────────────────
        <div className="hidden gap-8 md:flex md:items-start">
          <div
            className="flex flex-col items-start gap-16"
            style={{ width: SIZE_CONFIG_8.big.frameW }}
          >
            {left.map(({ item, size }) => (
              <PortfolioCard
                key={item.id}
                item={item}
                dims={SIZE_CONFIG_8[size]}
                showBottomPadding={size === "big"}
                titleClassName={cardTitleClassName}
                taglineClassName={cardTaglineClassName}
                showCategory={isWork}
                categoryClassName={cardCategoryClassName}
              />
            ))}
          </div>
          <div
            className="flex flex-col items-end gap-16 -ml-[160px]"
            style={{ width: SIZE_CONFIG_8.big.frameW }}
          >
            {right.map(({ item, size }) => (
              <PortfolioCard … />
            ))}
          </div>
        </div>
        ──────────────────────────────────────────────────────────── */}
      </div>
    </section>
  );
}
