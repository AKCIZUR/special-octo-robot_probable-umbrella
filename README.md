# Once UI Docs Template

Nextra 4 documentation template styled as an Once UI core kit.

## What is included

- local development with `pnpm dev`
- production static export for GitHub Pages
- 6 theme packs with light and dark variants
- separate pack and mode controls
- one shared `styles/custom-style.css`
- floating controls with persistence
- theme pack preview cards on the homepage

## Theme packs

- Core
- Paper
- Glass
- Graphite
- Neon
- Mono

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

The static output is written to `out/`.

## Static preview

```bash
pnpm start
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` publishes the static `out/` directory on every push to `main`.

## Main files

- `next.config.mjs`
- `app/layout.tsx`
- `mdx-components.tsx`
- `styles/custom-style.css`
- `components/theme-packs.ts`
- `components/theme-switcher.tsx`
- `components/theme-pack-grid.tsx`
