# Theme Studio Template

GitHub Pages ready documentation template built with Nextra.

## Features

- automatic deploy on push to `main`
- GitHub Pages friendly base path handling
- 6 theme packs with light and dark variants
- one shared `styles/custom-style.css`
- floating theme switcher with persistence
- theme pack preview cards on the homepage

## Theme packs

- Default
- Glass
- GitHub
- Nord
- Dracula
- Apple

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm export
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the app and publishes `out/` to Pages on every push to `main`.

## Customization

The whole visual system is driven by:

- `styles/custom-style.css`
- `components/theme-packs.ts`
- `components/theme-switcher.tsx`

Add or modify packs by changing those files only.
