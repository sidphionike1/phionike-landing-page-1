"use client";

import Image from "next/image";
import { TeamCarouselMobile } from "./TeamCarouselMobile";

type AccentColor = "orange" | "yellow" | "lavender" | "blue";

const ACCENT_HEX: Record<AccentColor, string> = {
  orange: "#FF5B24",
  yellow: "#F2B800",
  lavender: "#D5B2FF",
  blue: "#3C3BFF",
};

const ACCENT_TEXT: Record<AccentColor, string> = {
  orange: "text-black",
  yellow: "text-black",
  lavender: "text-black",
  blue: "text-white",
};

// Placeholder copy used across every card where we don't have real data yet.
const PLACEHOLDER_NAME = "Team Member";
const PLACEHOLDER_ROLE = "Role";
const PLACEHOLDER_BIO =
  "We're still getting to know this person — their story, their craft, and what they bring to the team. Check back soon for the full introduction.";

// All placeholder photos use a neutral grey — the accent color still shows
// up in the text/hover panel, but the photo itself stays visually
// consistent until real photos come in.
const PLACEHOLDER_GREY = "999999";

function ph(label: string, w = 600, h = 800) {
  return `https://placehold.co/${w}x${h}/${PLACEHOLDER_GREY}/FFFFFF?text=${encodeURIComponent(label)}`;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

// ── TYPE 1: solid color block, no photo, no text, no hover ────────
interface ColorBlockCard extends Box {
  type: "colorblock";
  id: string;
  accent: AccentColor;
}

// ── TYPE 2: full-bleed photo, thin accent strip (no text) by default,
// hover covers the full image with centered Name / Role / Bio ─────
interface StripNoDataCard extends Box {
  type: "person_with_strip_no_data";
  id: string;
  accent: AccentColor;
  photoSrc: string;
}

// ── TYPE 3: full-bleed photo, name+role ALWAYS visible in strip,
// hover covers the full image with centered Name / Role / Bio ─────
interface OnlyTitleCard extends Box {
  type: "person_with_only_title";
  id: string;
  accent: AccentColor;
  photoSrc: string;
  name: string;
  role: string;
  bio?: string; // optional — falls back to PLACEHOLDER_BIO if not provided
}

// ── TYPE 4: photo + full data panel side-by-side (landscape) or
// stacked (portrait), both always visible, sized per data — no hover ─
interface FullDataCard extends Box {
  type: "person_with_full_data";
  id: string;
  accent: AccentColor;
  photoSrc: string;
  name: string;
  role: string;
  bio: string;
  layout: "horizontal" | "vertical"; // horizontal = image left/text right, vertical = image top/text bottom
  photoRatio: number; // 0–1, portion of the box's width (horizontal) or height (vertical) given to the photo
}

type GridCard = ColorBlockCard | StripNoDataCard | OnlyTitleCard | FullDataCard;

const GRID_CARDS: GridCard[] = [
  {
    type: "person_with_strip_no_data",
    id: "box1",
    accent: "orange",
    photoSrc: ph("Team Member", 400, 421),
    top: 0,
    left: 0,
    width: 400,
    height: 421,
  },
  {
    type: "person_with_full_data",
    id: "box2-manali",
    accent: "yellow",
    photoSrc: "/about/team/manali-rangnekar.png",
    name: "Manali Rangnekar",
    role: "Graphic Designer",
    bio: "Manali is a Visual Designer who enjoys turning ideas into distinctive visual identities, illustrations and thoughtful brand experiences. With a background spanning branding, art direction and graphic design, she likes finding the story behind a brief and giving it a visual language of its own.",
    layout: "horizontal",
    photoRatio: 300 / 780,
    top: 0,
    left: 460,
    width: 780,
    height: 314,
  },
  {
    type: "person_with_full_data",
    id: "box3-prerna",
    accent: "blue",
    photoSrc: "/about/team/prerna-dwivedi.jpg",
    name: "Prerna Dwivedi",
    role: "UI / UX Designer",
    bio: "Prerna is a UX Designer who enjoys turning complex workflows into simple, intuitive experiences. With experience across data-heavy platforms, dashboards and design systems, she likes finding clarity in products that can often feel overwhelming.",
    layout: "vertical",
    photoRatio: 430 / 708,
    top: 481,
    left: 0,
    width: 400,
    height: 708,
  },
  {
    type: "colorblock",
    id: "box4",
    accent: "lavender",
    top: 374,
    left: 460,
    width: 313,
    height: 107,
  },
  {
    type: "person_with_only_title",
    id: "box5-aarya",
    accent: "orange",
    photoSrc: "/about/team/aarya-trivedi.png",
    name: "Aarya Trivedi",
    role: "UI / UX Designer",
    top: 374,
    left: 833,
    width: 410,
    height: 519,
  },
  {
    type: "person_with_strip_no_data",
    id: "box6",
    accent: "yellow",
    photoSrc: ph("Team Member", 313, 464),
    top: 541,
    left: 460,
    width: 313,
    height: 464,
  },
  {
    type: "colorblock",
    id: "box7",
    accent: "orange",
    top: 1065,
    left: 460,
    width: 205,
    height: 124,
  },
  {
    type: "person_with_full_data",
    id: "box8-vrishti",
    accent: "yellow",
    photoSrc: "/about/team/vrishti-purohit.jpg",
    name: "Vrishti Purohit",
    role: "UI / UX Designer",
    bio: "Vrishti is a Visual Designer who enjoys bringing ideas to life through thoughtful interfaces, visual details and playful interactions. Her curiosity for motion and interactive design often leads her to experiment with scroll animations, 3D elements and micro-interactions.",
    layout: "horizontal",
    photoRatio: 260 / 665,
    top: 1249,
    left: 0,
    width: 665,
    height: 362,
  },
  {
    type: "person_with_only_title",
    id: "box9-rohit",
    accent: "lavender",
    photoSrc: "/about/team/rohit-potnis.jpg",
    name: "Rohit Potnis",
    role: "UI / UX Designer",
    top: 1065,
    left: 725,
    width: 518,
    height: 421,
  },
  {
    type: "person_with_only_title",
    id: "box14-new",
    accent: "blue",
    photoSrc: ph("Team Member", 481, 397),
    name: PLACEHOLDER_NAME,
    role: PLACEHOLDER_ROLE,
    top: 1546,
    left: 762,
    width: 481,
    height: 397,
  },
  {
    type: "colorblock",
    id: "box10",
    accent: "blue",
    top: 1671,
    left: 0,
    width: 702,
    height: 103,
  },
  {
    type: "colorblock",
    id: "box11",
    accent: "yellow",
    top: 1834,
    left: 485,
    width: 217,
    height: 109,
  },
  {
    type: "person_with_strip_no_data",
    id: "box12",
    accent: "orange",
    photoSrc: ph("Team Member", 425, 620),
    top: 1834,
    left: 0,
    width: 425,
    height: 620,
  },
  {
    type: "person_with_full_data",
    id: "box13-marcus",
    accent: "blue",
    photoSrc: "/about/team/marcus-thorne.png",
    name: "Marcus Thorne",
    role: "UI / UX Designer",
    bio: "Roopam loves design and is often found observing design books, products and services to learn from them. He comes from the background of Engineering & Design, so he understands well how to make a good blend of Form & Function.",
    layout: "horizontal",
    photoRatio: 300 / 758,
    top: 2003,
    left: 485,
    width: 758,
    height: 451,
  },
];

const CONTAINER_WIDTH = 1243;
const CONTAINER_HEIGHT = 2454;

// ── TYPE 1 ──────────────────────────────────────────────────────────
function ColorBlockView({ card }: { card: ColorBlockCard }) {
  return (
    <div
      className="absolute rounded-[30px]"
      style={{
        top: card.top,
        left: card.left,
        width: card.width,
        height: card.height,
        backgroundColor: ACCENT_HEX[card.accent],
      }}
    />
  );
}

// ── Shared hover overlay: covers the full card, content centered,
// smooth fade + scale in. Used by both TYPE 2 and TYPE 3. ───────────
function HoverOverlay({
  accent,
  name,
  role,
  bio,
}: {
  accent: AccentColor;
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 ${ACCENT_TEXT[accent]}`}
      style={{ backgroundColor: `${ACCENT_HEX[accent]}E6` }} // ~90% opacity accent wash
    >
      <div className="translate-y-2 transition-transform duration-300 ease-out group-hover:translate-y-0">
        <h3 className="text-xl font-semibold leading-tight">{name}</h3>
        <p className="mt-1 text-sm opacity-80">{role}</p>
        <p className="mx-auto mt-3 max-w-[85%] text-sm leading-relaxed opacity-90 line-clamp-3">
          {bio}
        </p>
      </div>
    </div>
  );
}

// ── TYPE 2: strip with no data by default, hover covers full image ──
function StripNoDataView({ card }: { card: StripNoDataCard }) {
  return (
    <div
      className="group absolute overflow-hidden rounded-[30px]"
      style={{ top: card.top, left: card.left, width: card.width, height: card.height }}
    >
      <Image
        src={card.photoSrc}
        alt=""
        fill
        className="object-cover"
        sizes={`${card.width}px`}
        quality={85}
      />
      {/* Base state: thin unlabeled strip */}
      <div
        className="absolute inset-x-0 bottom-0 h-6 transition-opacity duration-300 ease-out group-hover:opacity-0"
        style={{ backgroundColor: ACCENT_HEX[card.accent] }}
      />
      {/* Hover state: full-cover centered content */}
      <HoverOverlay
        accent={card.accent}
        name={PLACEHOLDER_NAME}
        role={PLACEHOLDER_ROLE}
        bio={PLACEHOLDER_BIO}
      />
    </div>
  );
}

// ── TYPE 3: title always visible in strip, hover covers full image ──
function OnlyTitleView({ card }: { card: OnlyTitleCard }) {
  return (
    <div
      className="group absolute overflow-hidden rounded-[30px]"
      style={{ top: card.top, left: card.left, width: card.width, height: card.height }}
    >
      <Image
        src={card.photoSrc}
        alt={card.name}
        fill
        className="object-cover"
        sizes={`${card.width}px`}
        quality={85}
      />
      {/* Base state: name + role strip */}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col justify-end px-6 py-4 transition-opacity duration-300 ease-out group-hover:opacity-0 ${ACCENT_TEXT[card.accent]}`}
        style={{ backgroundColor: ACCENT_HEX[card.accent] }}
      >
        <h3 className="text-lg font-semibold leading-tight">{card.name}</h3>
        <p className="mt-0.5 text-sm opacity-80">{card.role}</p>
      </div>
      {/* Hover state: full-cover centered content */}
      <HoverOverlay
        accent={card.accent}
        name={card.name}
        role={card.role}
        bio={card.bio ?? PLACEHOLDER_BIO}
      />
    </div>
  );
}

// ── TYPE 4: photo + data panel, both sized by data, always visible ───
function FullDataView({ card }: { card: FullDataCard }) {
  const isHorizontal = card.layout === "horizontal";
  const photoSize = isHorizontal
    ? { width: Math.round(card.width * card.photoRatio), height: card.height }
    : { width: card.width, height: Math.round(card.height * card.photoRatio) };

  return (
    <div
      className={`absolute overflow-hidden rounded-[30px] ${isHorizontal ? "flex flex-row" : "flex flex-col"}`}
      style={{ top: card.top, left: card.left, width: card.width, height: card.height }}
    >
      <div className="relative shrink-0" style={{ width: photoSize.width, height: photoSize.height }}>
        <Image
          src={card.photoSrc}
          alt={card.name}
          fill
          className="object-cover"
          sizes={`${photoSize.width}px`}
          quality={85}
        />
      </div>
      <div
        className={`flex flex-1 flex-col justify-center px-7 py-6 ${ACCENT_TEXT[card.accent]}`}
        style={{ backgroundColor: ACCENT_HEX[card.accent] }}
      >
        <h3 className="text-xl font-semibold leading-tight">{card.name}</h3>
        <p className="mt-1 text-sm opacity-80">{card.role}</p>
        <p className="mt-3 text-sm leading-relaxed opacity-90 line-clamp-6">{card.bio}</p>
      </div>
    </div>
  );
}

function GridCardView({ card }: { card: GridCard }) {
  switch (card.type) {
    case "colorblock":
      return <ColorBlockView card={card} />;
    case "person_with_strip_no_data":
      return <StripNoDataView card={card} />;
    case "person_with_only_title":
      return <OnlyTitleView card={card} />;
    case "person_with_full_data":
      return <FullDataView card={card} />;
  }
}

export function TeamGrid() {
  return (
    <section className="bg-background px-0 py-14 md:px-0 md:-ml-[30px] md:py-20">
      <div
        className="relative mx-auto hidden md:block"
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
      >
        {GRID_CARDS.map((card) => (
          <GridCardView key={card.id} card={card} />
        ))}
      </div>

      <TeamCarouselMobile />
    </section>
  );
}
