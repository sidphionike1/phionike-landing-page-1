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
  x: number;
  y: number;
  cardW: number;
  cardH: number;
  imgW: number;
  imgH: number;
  itemGap: number;
  mediaSrc: string;
  mediaType: "video" | "image";
  industry: string;
  service: string;
  challenge: string;
  tagline?: string;
  services?: string;
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

/** Original slot geometry, top-to-bottom, used to pack filtered results up. */
const MASONRY_SLOTS = [...MASONRY_6_ITEMS]
  .sort((a, b) => a.y - b.y || a.x - b.x)
  .map(({ x, y, cardW, cardH, imgW, imgH, itemGap }) => ({
    x,
    y,
    cardW,
    cardH,
    imgW,
    imgH,
    itemGap,
  }));

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

/** Desktop 6-grid — Figma hand-placed masonry (1193 × 1927). */
const MASONRY_FRAME_W = masonry6.frame?.width ?? 1193;
const MASONRY_FRAME_H = masonry6.frame?.height ?? 1927;
const MASONRY_TITLE_AREA_H = masonry6.titleAreaH ?? 102;
const MASONRY_TITLE_TEXT_H = masonry6.titleTextH ?? 39;
const MASONRY_TITLE_FONT = masonry6.titleFontSize ?? 32;

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

const DEFAULT_CARD_TAGLINE =
  "Great design isn't defined by the number of screens delivered. It's more about the impact it creates and the value it brings to businesses.";

/**
 * Lazy autoplaying video for the masonry.
 * - Attaches src only near the viewport (saves ~10MB upfront)
 * - Plays while visible, pauses when off-screen / tab hidden
 * - Stays on continuous loop while playing (`loop` + muted autoplay)
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
  const inViewRef = useRef(false);

  const tryPlay = useCallback(() => {
    const el = ref.current;
    if (!el || !inViewRef.current || document.hidden) return;
    el.loop = true;
    el.muted = true;
    const play = el.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0;
        if (inViewRef.current) {
          setShouldLoad(true);
          // Keep src once loaded so loop resumes instantly when scrolling back.
          requestAnimationFrame(() => tryPlay());
        } else {
          el.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.2 },
    );

    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) el.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [tryPlay]);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    // Explicit loop for browsers that drop the attribute after src swap.
    el.loop = true;
    const onReady = () => tryPlay();
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    tryPlay();
    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [shouldLoad, src, tryPlay]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      disableRemotePlayback
      aria-label={title}
      // Attach src only near viewport — avoids eager download of all 6.
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
  showCategory = false,
  categoryClassName,
  workLayout = false,
}: {
  item: Masonry6Item;
  showCategory?: boolean;
  categoryClassName?: string;
  workLayout?: boolean;
}) {
  const mediaH = item.cardH - MASONRY_TITLE_AREA_H - item.itemGap;
  const servicesClassName =
    "type-sans-regular mt-1 text-[12px] leading-[140%] text-[#121212]/40";

  return (
    <article
      className="absolute flex flex-col overflow-hidden"
      style={{
        left: item.x,
        top: item.y,
        width: item.cardW,
        height: item.cardH,
        gap: item.itemGap,
      }}
    >
      <div
        className="flex shrink-0 flex-col justify-start"
        style={workLayout ? undefined : { height: MASONRY_TITLE_AREA_H }}
      >
        {showCategory && !workLayout && (
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
          className={`type-sans-regular text-[#141414] ${workLayout ? "" : "truncate"}`}
          style={{
            fontSize: MASONRY_TITLE_FONT,
            height: workLayout ? undefined : MASONRY_TITLE_TEXT_H,
            lineHeight: `${MASONRY_TITLE_TEXT_H}px`,
          }}
        >
          {item.title}
        </h3>
        {workLayout && item.tagline && (
          <p className="type-sans-regular mt-1 text-[14px] leading-[140%] text-[#212121]">
            {item.tagline}
          </p>
        )}
        {workLayout && item.services && (
          <p className={servicesClassName}>{item.services}</p>
        )}
      </div>

      <div
        className={`relative overflow-hidden rounded-xl bg-[#EDEAE4] ${workLayout ? "min-h-0 flex-1" : "shrink-0"}`}
        style={
          workLayout
            ? { width: item.cardW }
            : { width: item.cardW, height: mediaH }
        }
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
            sizes={`${item.cardW}px`}
            quality={85}
            loading="lazy"
          />
        )}
      </div>
    </article>
  );
}

/** Pixel-exact Figma masonry, scaled to the section width on desktop. */
function Masonry6Desktop({
  items,
  showCategory,
  categoryClassName,
  workLayout = false,
}: {
  items: Masonry6Item[];
  showCategory: boolean;
  categoryClassName: string;
  workLayout?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const frameH = useMemo(() => {
    if (items.length === 0) return MASONRY_FRAME_H;
    if (items.length === MASONRY_6_ITEMS.length) return MASONRY_FRAME_H;
    return Math.max(...items.map((item) => item.y + item.cardH));
  }, [items]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / MASONRY_FRAME_W);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto hidden w-full md:block"
      style={{ height: frameH * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: MASONRY_FRAME_W,
          height: frameH,
          transform: `scale(${scale})`,
        }}
      >
        {items.map((item) => (
          <Masonry6Card
            key={item.id}
            item={item}
            showCategory={showCategory}
            categoryClassName={categoryClassName}
            workLayout={workLayout}
          />
        ))}
      </div>
    </div>
  );
}

/** Mobile stack — same 6 projects, full-width cards with lazy looping video. */
function Masonry6Mobile({
  items,
  showCategory,
  categoryClassName,
  titleClassName,
  taglineClassName,
  showTagline = false,
  workLayout = false,
}: {
  items: Masonry6Item[];
  showCategory: boolean;
  categoryClassName: string;
  titleClassName: string;
  taglineClassName?: string;
  showTagline?: boolean;
  workLayout?: boolean;
}) {
  return (
    <div
      className={`flex flex-col md:hidden ${workLayout ? "w-full min-w-0 gap-4" : "gap-10"}`}
    >
      {items.map((item) => {
        const media = (
          <div
            className={
              workLayout
                ? "relative aspect-[326/244.5] w-full min-w-0 overflow-hidden rounded-xl bg-[#EDEAE4]"
                : "relative mt-4 mb-6 overflow-hidden rounded-xl bg-[#EDEAE4]"
            }
            style={
              workLayout
                ? undefined
                : { width: "100%", aspectRatio: `${item.cardW} / ${item.imgH}` }
            }
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
                sizes={workLayout ? "326px" : "95vw"}
                quality={85}
                loading="lazy"
              />
            )}
          </div>
        );

        const text = (
          <div
            className={workLayout ? "flex min-w-0 flex-col gap-2 text-left" : undefined}
          >
            {showCategory && !workLayout && (
              <p className={categoryClassName}>{item.industry}</p>
            )}
            <h3 className={titleClassName}>{item.title}</h3>
            {showTagline && (
              <p className={taglineClassName}>
                {item.tagline ?? DEFAULT_CARD_TAGLINE}
              </p>
            )}
            {workLayout && item.services && (
              <p className="type-sans-regular text-left text-[12px] leading-[140%] text-[#121212]/40">
                {item.services}
              </p>
            )} 
          </div>
        );

        return (
          <article
            key={item.id}
            className={
              workLayout
                ? "flex w-full min-w-0 flex-col gap-4 rounded-[20px] bg-[#FFFCF7] p-4"
                : "mx-auto flex w-[95%] flex-col"
            }
          >
            {workLayout ? (
              <>
                {media}
                {text}
              </>
            ) : (
              <>
                {text}
                {media}
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}

// Single dropdown filter (Industry / Service / Challenge)
function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
  chipClassName,
  workMobile = false,
}: {
  label: string;
  options: readonly string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
  chipClassName: string;
  workMobile?: boolean;
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

  const workChipClass = isActive
    ? "gap-2 bg-[#3A39FF] px-5 py-2.5 text-white md:gap-1.5 md:border md:border-primary md:bg-primary md:px-5 md:py-2"
    : "gap-2 bg-transparent py-2.5 pr-2 pl-4 text-[#111111] md:gap-1.5 md:border md:border-border md:bg-background md:px-5 md:py-2 md:hover:border-foreground/30";
  const defaultChipClass = isActive
    ? "gap-1.5 border border-primary bg-primary px-5 py-2 text-white"
    : "gap-1.5 border border-border bg-background px-5 py-2 text-[#111111] hover:border-foreground/30";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`${chipClassName} inline-flex items-center rounded-full leading-normal transition-all duration-200 ${
          workMobile ? workChipClass : defaultChipClass
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
    ? "type-sans-regular text-eyebrow leading-normal md:text-body-sm"
    : "type-vf-regular text-eyebrow";
  const cardTitleClassName = isWork
    ? "type-sans-medium text-left text-title leading-normal text-[#212121]"
    : "type-vf-regular truncate text-title-lg leading-[38.4px] text-[#141414] md:text-heading md:leading-[38.4px]";
  const cardCategoryClassName = isWork
    ? "type-sans-regular text-eyebrow leading-normal tracking-normal uppercase text-[#212121]/60 md:mb-1 md:tracking-[1px]"
    : "type-sans-regular mb-1 text-eyebrow tracking-[1px] uppercase text-[#212121]/60";
  const cardTaglineClassName =
    "type-sans-regular text-left text-body-sm leading-[140%] text-[#212121]";

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

  // Default All: original layout. Filter: pack matches into top slots.
  // Zero matches: fall back to the full default set.
  const displayedMasonry6 = useMemo(() => {
    if (isAllActive) return MASONRY_6_ITEMS;

    const matches = MASONRY_6_ITEMS.filter(matchesFilters);
    if (matches.length === 0) return MASONRY_6_ITEMS;

    return matches.map((item, i) => ({
      ...item,
      ...MASONRY_SLOTS[i],
    }));
  }, [isAllActive, matchesFilters]);

  return (
    <section
      className={`relative ${isWork ? "py-10 md:py-20" : "py-14 md:py-20"}`}
      style={{ backgroundColor: "#FFFCF7" }}
    >
      <div
        className={
          isWork
            ? "section-shell flex min-w-0 flex-col gap-6 [--section-pad-x:1rem] md:block md:[--section-pad-x:1.5rem]"
            : "section-shell"
        }
      >
        <div
          className={
            isWork
              ? "flex w-full min-w-0 flex-col items-center gap-3 text-center md:mb-10 md:block md:text-left"
              : "mb-8 md:mb-10"
          }
        >
          {isWork ? (
            <>
              <h2 className="type-sans-regular w-full text-center text-lead leading-[125%] text-[#212121] md:text-left md:text-display-xs md:leading-normal">
                Find work that&rsquo;s{" "}
                <span className="md:hidden">relevant</span>
                <em className="type-sans-light-italic hidden md:inline">relevant</em>
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>in different context
              </h2>
              <p className="type-sans-regular w-full text-center text-[16px] leading-[160%] text-[#212121]/60 md:mt-2 md:text-left">
                Browse projects by industry, service or the{" "}
                <br className="md:hidden" />
                challenge you&rsquo;re looking to solve.
              </p>
            </>
          ) : (
            <>
              <h2 className="type-sans-regular text-heading leading-[120%] text-[#212121] md:text-display-xs md:leading-[47.84px]">
                Find work that&rsquo;s relevant
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>in different context
              </h2>
              <p className="type-sans-regular mt-2 hidden text-[16px] leading-[160%] text-[#212121]/60 md:block">
                Browse projects by industry or service
              </p>
              <p className="type-sans-regular mt-2 text-[16px] leading-[160%] text-[#212121]/60 md:hidden">
                Browse projects by industry, service or the{" "}
                <br />
                challenge you&rsquo;re looking to solve.
              </p>
            </>
          )}
        </div>

        {/* Filters: All (single toggle) + 3 independent dropdowns */}
        <div
          className={
            isWork
              ? "flex w-full min-w-0 flex-wrap gap-3 md:mb-14 md:gap-2.5"
              : "mb-10 flex flex-wrap gap-2.5 md:mb-14"
          }
        >
          <button
            onClick={handleAllClick}
            className={`${chipClassName} inline-flex items-center rounded-full leading-normal transition-all duration-200 ${
              isWork
                ? isAllActive
                  ? "bg-[#3A39FF] px-5 py-2.5 text-white md:border md:border-primary md:bg-primary md:py-2"
                  : "bg-transparent px-5 py-2.5 text-[#111111] md:border md:border-border md:bg-background md:py-2 md:hover:border-foreground/30"
                : isAllActive
                  ? "border border-primary bg-primary px-5 py-2 text-white"
                  : "border border-border bg-background px-5 py-2 text-[#111111] hover:border-foreground/30"
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
              workMobile={isWork}
            />
          ))}
        </div>

        {/* ── DESKTOP: hand-placed Figma masonry (1193 × 1927), scaled to shell ── */}
        <Masonry6Desktop
          items={displayedMasonry6}
          showCategory={isWork}
          categoryClassName={cardCategoryClassName}
          workLayout={true}
        />

        {/* ── MOBILE: same projects, stacked full-width ── */}
        <Masonry6Mobile
          items={displayedMasonry6}
          showCategory={isWork}
          categoryClassName={cardCategoryClassName}
          titleClassName={cardTitleClassName}
          taglineClassName={cardTaglineClassName}
          showTagline={isWork}
          workLayout={isWork}
        />
        <SeeAllWorkCTA />

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
