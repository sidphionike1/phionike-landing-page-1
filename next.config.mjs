/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    // 75 is Next's default; 85 is used explicitly by a few <Image quality={85}>
    // instances (e.g. TeamGrid, TeamCarouselMobile). Both must be listed here.
    qualities: [75, 85],
  },
  allowedDevOrigins: ["*"],
}

export default nextConfig
