import bust from "@/content/cache-bust.json"

export function assetVersion() {
  return String(bust.v)
}

/** Append the cache-bust version to a same-origin public path. */
export function asset(src: string) {
  if (!src.startsWith("/") || src.startsWith("//")) return src
  const [path, existingQuery] = src.split("?")
  const params = new URLSearchParams(existingQuery)
  params.set("v", assetVersion())
  return `${path}?${params.toString()}`
}

export function cssUrl(src: string) {
  return `url("${asset(src)}")`
}
