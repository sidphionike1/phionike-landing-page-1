export type AccentColor = "orange" | "yellow" | "lavender" | "blue";

export const ACCENT_HEX: Record<AccentColor, string> = {
  orange: "#FF5B24",
  yellow: "#F2B800",
  lavender: "#D5B2FF",
  blue: "#3C3BFF",
};

export const ACCENT_TEXT: Record<AccentColor, string> = {
  orange: "text-black",
  yellow: "text-black",
  lavender: "text-black",
  blue: "text-white",
};

// Placeholder copy used wherever we don't have real data yet.
export const PLACEHOLDER_NAME = "Team Member";
export const PLACEHOLDER_ROLE = "Role";
export const PLACEHOLDER_BIO =
  "We're still getting to know this person — their story, their craft, and what they bring to the team. Check back soon for the full introduction.";

const PLACEHOLDER_GREY = "999999";

function ph(label: string, w = 600, h = 800) {
  return `https://placehold.co/${w}x${h}/${PLACEHOLDER_GREY}/FFFFFF?text=${encodeURIComponent(label)}`;
}

export interface TeamMember {
  id: string;
  accent: AccentColor;
  photoSrc: string;
  name: string;
  role: string;
  bio: string;
  hasData: boolean; // false = placeholder person, no real profile yet
}

// Single source of truth for every person on the team — used by the
// desktop bento grid (TeamGrid) and the mobile carousel (TeamCarouselMobile).
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "box1",
    accent: "orange",
    photoSrc: ph("Team Member", 400, 421),
    name: PLACEHOLDER_NAME,
    role: PLACEHOLDER_ROLE,
    bio: PLACEHOLDER_BIO,
    hasData: false,
  },
  {
    id: "box2-manali",
    accent: "yellow",
    photoSrc: "/about/team/manali-rangnekar.png",
    name: "Manali Rangnekar",
    role: "Graphic Designer",
    bio: "Manali is a Visual Designer who enjoys turning ideas into distinctive visual identities, illustrations and thoughtful brand experiences. With a background spanning branding, art direction and graphic design, she likes finding the story behind a brief and giving it a visual language of its own.",
    hasData: true,
  },
  {
    id: "box3-prerna",
    accent: "blue",
    photoSrc: "/about/team/prerna-dwivedi.jpg",
    name: "Prerna Dwivedi",
    role: "UI / UX Designer",
    bio: "Prerna is a UX Designer who enjoys turning complex workflows into simple, intuitive experiences. With experience across data-heavy platforms, dashboards and design systems, she likes finding clarity in products that can often feel overwhelming.",
    hasData: true,
  },
  {
    id: "box5-aarya",
    accent: "orange",
    photoSrc: "/about/team/aarya-trivedi.png",
    name: "Aarya Trivedi",
    role: "UI / UX Designer",
    bio: PLACEHOLDER_BIO,
    hasData: true,
  },
  {
    id: "box6",
    accent: "yellow",
    photoSrc: ph("Team Member", 313, 464),
    name: PLACEHOLDER_NAME,
    role: PLACEHOLDER_ROLE,
    bio: PLACEHOLDER_BIO,
    hasData: false,
  },
  {
    id: "box8-vrishti",
    accent: "yellow",
    photoSrc: "/about/team/vrishti-purohit.jpg",
    name: "Vrishti Purohit",
    role: "UI / UX Designer",
    bio: "Vrishti is a Visual Designer who enjoys bringing ideas to life through thoughtful interfaces, visual details and playful interactions. Her curiosity for motion and interactive design often leads her to experiment with scroll animations, 3D elements and micro-interactions.",
    hasData: true,
  },
  {
    id: "box9-rohit",
    accent: "lavender",
    photoSrc: "/about/team/rohit-potnis.jpg",
    name: "Rohit Potnis",
    role: "UI / UX Designer",
    bio: PLACEHOLDER_BIO,
    hasData: true,
  },
  {
    id: "box14-new",
    accent: "blue",
    photoSrc: ph("Team Member", 481, 397),
    name: PLACEHOLDER_NAME,
    role: PLACEHOLDER_ROLE,
    bio: PLACEHOLDER_BIO,
    hasData: false,
  },
  {
    id: "box12",
    accent: "orange",
    photoSrc: ph("Team Member", 425, 620),
    name: PLACEHOLDER_NAME,
    role: PLACEHOLDER_ROLE,
    bio: PLACEHOLDER_BIO,
    hasData: false,
  },
  {
    id: "box13-marcus",
    accent: "blue",
    photoSrc: "/about/team/marcus-thorne.png",
    name: "Marcus Thorne",
    role: "UI / UX Designer",
    bio: "Roopam loves design and is often found observing design books, products and services to learn from them. He comes from the background of Engineering & Design, so he understands well how to make a good blend of Form & Function.",
    hasData: true,
  },
];
