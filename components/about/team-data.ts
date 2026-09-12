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

export interface TeamMember {
  id: string;
  accent: AccentColor;
  photoSrc: string;
  name: string;
  role: string;
  bio: string;
  hasData: boolean;
}

/** Single source of truth for desktop + mobile team surfaces. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "roopam",
    accent: "orange",
    photoSrc: "/about/team/roopam-mishra.png",
    name: "Roopam Mishra",
    role: "Founder & Studio Head",
    bio: "Roopam loves design and is often found observing books, products and services to understand what makes them work. With a background in Engineering & Design, he enjoys bringing technology and human-centred thinking together to create meaningful experiences. Curious about how design will evolve with emerging technologies, he believes in questioning conventions and exploring new possibilities. For Roopam, good design is not just useful—it is liberating.",
    hasData: true,
  },
  {
    id: "manali",
    accent: "yellow",
    photoSrc: "/about/team/manali-rangnekar.png",
    name: "Manali Rangnekar",
    role: "Graphic Designer",
    bio: "Manali is a Visual Designer who enjoys turning ideas into distinctive visual identities, illustrations and thoughtful brand experiences. With a background spanning branding, art direction and graphic design, she likes finding the story behind a brief and giving it a visual language of its own.",
    hasData: true,
  },
  {
    id: "aarya",
    accent: "orange",
    photoSrc: "/about/team/aarya-trivedi.png",
    name: "Aarya Trivedi",
    role: "UI / UX Designer",
    bio: "Aarya is a UX & Product Designer who enjoys making complex products simpler and more intuitive. With a background in design, she brings curiosity and a thoughtful approach to solving problems. She enjoys exploring how people interact with technology and finding the balance between user needs, business goals and meaningful experiences. For her, good design starts with understanding, asking the right questions, and creating with purpose.",
    hasData: true,
  },
  {
    id: "yash",
    accent: "yellow",
    photoSrc: "/about/team/yash-chaurasia.jpeg",
    name: "Yash Chourasia",
    role: "UI / UX Designer",
    bio: "Yash is a UX Designer who brings a unique perspective shaped by his earlier experience in business development and sales. He enjoys understanding people, their behaviours and the problems they face, then turning those insights into simple, meaningful digital experiences. Curious about emerging technologies and design trends, he believes good design should not only look good but also make products easier, more intuitive and satisfying to use.",
    hasData: true,
  },
  {
    id: "rohit",
    accent: "lavender",
    photoSrc: "/about/team/rohit-potnis.jpg",
    name: "Rohit Potnis",
    role: "UI / UX Designer",
    bio: "Rohit is a Product Designer who enjoys exploring how systems, products and people come together. With a background spanning ergonomics, furniture and digital experiences, he brings a hands-on approach to understanding problems and shaping solutions. Naturally curious, he likes keeping up with emerging technologies and design thinking, often looking beyond the screen to understand the larger context in which products live, work and evolve.",
    hasData: true,
  },
  {
    id: "harleen",
    accent: "lavender",
    photoSrc: "/about/team/harleen-kaur-manchanda.png",
    name: "Harleen Kaur Manchanda",
    role: "UI / UX Designer",
    bio: "Harleen is a UX Designer who enjoys turning ideas into intuitive and visually thoughtful digital experiences. Her experience in website and UX design has shaped her approach to understanding users, improving interactions and translating brand goals into clear solutions. She is curious about the relationship between design and people, and enjoys finding the right balance between usability, visual consistency and meaningful experiences.",
    hasData: true,
  },
  {
    id: "sudhanshu",
    accent: "orange",
    photoSrc: "/about/team/sudhanshu-parihar.jpeg",
    name: "Sudhanshu Parihar",
    role: "Business Development Associate",
    bio: "Sudhanshu is passionate about understanding businesses, the people behind them, and the ideas that drive them forward. He enjoys collaborating with founders and teams to uncover opportunities where design, technology, and strategy come together to create meaningful impact. With a naturally curious mindset, he is constantly exploring emerging products, industries, and innovations, believing that the best solutions begin with asking the right questions rather than offering immediate answers.",
    hasData: true,
  },
  {
    id: "prerna",
    accent: "blue",
    photoSrc: "/about/team/prerna-dwivedi.jpg",
    name: "Prerna Dwivedi",
    role: "UI / UX Designer",
    bio: "Prerna is a UX Designer who enjoys turning complex workflows into simple, intuitive experiences. With experience across data-heavy platforms, dashboards and design systems, she likes finding clarity in products that can often feel overwhelming.",
    hasData: true,
  },
  {
    id: "vrishti",
    accent: "yellow",
    photoSrc: "/about/team/vrishti-purohit.jpg",
    name: "Vrishti Purohit",
    role: "UI / UX Designer",
    bio: "Vrishti is a Visual Designer who enjoys bringing ideas to life through thoughtful interfaces, visual details and playful interactions. Her curiosity for motion and interactive design often leads her to experiment with scroll animations, 3D elements and micro-interactions.",
    hasData: true,
  },
];
