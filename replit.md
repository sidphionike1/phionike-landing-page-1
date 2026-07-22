# Phionike Studio — Project Overview

A Next.js 16 (App Router) marketing/portfolio site for Phionike Studio.

## Stack

- **Framework**: Next.js 16 with App Router, React 19
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI**: shadcn/ui (@base-ui/react)
- **Validation**: Zod (content schemas)
- **Package manager**: pnpm

## Running locally

```bash
pnpm install
pnpm dev --port 5000
```

The app runs at `http://localhost:5000`.

## Architecture

### Content layer (`content/`)
All copy lives in JSON files, validated by Zod schemas in `content/schema.ts`:
- `global.json` — shared nav, footer, footerCTA, processSteps (used across all pages)
- `home.json` — homepage content
- `services.json` — /services page content
- `work.json` — /our-work page content

Loaders in `lib/content.ts` parse and type-check every file at build time.

### Pages (`app/`)
| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/work` | `app/work/page.tsx` |

### Components (`components/`)
- `shared/site-chrome.tsx` — `SiteNavbar`, `SiteFooter` (used on Services + Work)
- `home/` — Home-page-specific server sections + `PortfolioFilterGrid` (client island, reused on Work)
- `services/` — Services page sections
- `work/` — Work page sections (`WorkHero`, `DisciplineList`, `OutcomesStatement`, `TestimonialsGrid`)

### Key conventions
- **Server Components by default**. Client islands are the minimum: `PortfolioFilterGrid` (filter state) only.
- Testimonial hover state is **pure CSS `group-hover`** — no JS or Framer Motion needed.
- `PortfolioFilterGrid` accepts `PortfolioSection` type (shared), not the full `HomePage` type.
- `processSteps` in `global.json` is the single source of truth for the 4 disciplines; each page renders them differently via props.

## User preferences

- Build to spec — no guessing, no invented responsive behaviour without mobile captures.
- Maintain the existing file/folder structure.
- Keep client islands minimal.
- Content QA flags in JSON (`_contentQA` keys) are intentional — leave them in place until real copy is supplied.
