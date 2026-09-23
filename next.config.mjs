/** Static images/fonts/video in /public have no content hash, so skip `immutable`. */
const STATIC_CACHE = "public, max-age=31536000, stale-while-revalidate=86400"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    // 75 is Next's default; 85 is used explicitly by a few <Image quality={85}>
    // instances (e.g. TeamGrid, TeamCarouselMobile). Both must be listed here.
    qualities: [75, 85],
  },
  allowedDevOrigins: ["*"],
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico|avif|woff|woff2|mp4|webm)",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
    ]
  },
}

export default nextConfig
