import NextImage, { type ImageProps } from "next/image"
import { asset } from "@/lib/asset"

export default function Image({ src, ...props }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} {...props} />
}
