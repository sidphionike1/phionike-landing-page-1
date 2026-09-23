import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "content", "cache-bust.json")
const current = JSON.parse(readFileSync(file, "utf8"))
const next = String((Number.parseInt(String(current.v), 10) || 0) + 1)

writeFileSync(file, `${JSON.stringify({ v: next }, null, 2)}\n`)

console.log(`Cache version ${current.v} → ${next}`)
console.log("Commit content/cache-bust.json and deploy for the flush to go live.")
