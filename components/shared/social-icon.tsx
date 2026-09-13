import Image from "next/image"

const FOOTER_ICON: Record<string, string> = {
  linkedin: "/footer/linkedin.png",
  instagram: "/footer/insta.png",
}

/** Prefer PNGs from /public/footer; SVG fallbacks for platforms without assets yet. */
export function SocialIcon({
  platform,
  className = "h-5 w-5",
  /** Invert raster icons for dark surfaces (e.g. mobile menu). */
  onDark = false,
}: {
  platform: string
  className?: string
  onDark?: boolean
}) {
  const key = platform.toLowerCase()
  const png = Object.entries(FOOTER_ICON).find(([name]) => key.includes(name))?.[1]

  if (png) {
    return (
      <Image
        src={png}
        alt=""
        width={20}
        height={20}
        className={`object-contain ${onDark ? "brightness-0 invert" : ""} ${className}`}
        aria-hidden="true"
      />
    )
  }

  if (key.includes("dribbble")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </svg>
    )
  }

  if (key.includes("medium")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    )
  }

  return <span className="text-sm">{platform}</span>
}
