# Phionike

Next.js site for [phionike.com](https://phionike.com).

```bash
npm install
npm run dev
```

---

## Flush static asset cache

> **Run this after you replace images in `public/`** (venn diagrams, trusted-by logos, patterns, logo, photos). Browsers keep those files for **1 year**. A flush is the only way to force a fresh download without renaming files.

```bash
npm run cache:flush
```

That bumps `content/cache-bust.json`. Then commit it and deploy:

```bash
git add content/cache-bust.json
git commit -m "Flush static asset cache"
git push
```

Do **not** run this on every deploy. Only run it when the files on disk changed. Until you flush, repeat visits stay fast.

How it works: public images load as `/venn/none-selected.png?v=1`. Flushing changes `v`, so the URL is new and the old cache is ignored.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build (webpack) |
| `npm run start` | Serve the production build |
| `npm run cache:flush` | Bust the 1-year image cache |
