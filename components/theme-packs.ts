export type ThemeId = 'core' | 'paper' | 'glass' | 'graphite' | 'neon' | 'mono'
export type ThemeMode = 'auto' | 'light' | 'dark'

export type ThemePack = {
  id: ThemeId
  label: string
  summary: string
  light: string
  dark: string
  accent: string
  surface: string[]
}

export const THEME_PACKS: ThemePack[] = [
  {
    id: 'core',
    label: 'Core',
    summary: 'Canonical Once UI feel: crisp, calm, balanced and product-ready.',
    light: 'Bright, airy, editorial surfaces.',
    dark: 'Soft charcoal depth with purple accents.',
    accent: 'Violet',
    surface: ['#ffffff', '#f5f3ff', '#7c3aed', '#111827'],
  },
  {
    id: 'paper',
    label: 'Paper',
    summary: 'Warm documentation look with clean whitespace and subtle borders.',
    light: 'Soft paper tones and gentle contrast.',
    dark: 'Ink-on-paper dark mode.',
    accent: 'Amber',
    surface: ['#fffbf5', '#fff7ed', '#d97706', '#1f2937'],
  },
  {
    id: 'glass',
    label: 'Glass',
    summary: 'Translucent layers, blurred panels and floating controls.',
    light: 'Frosted glass over a pale canvas.',
    dark: 'Acrylic depth with glow edges.',
    accent: 'Cyan',
    surface: ['#ffffff', '#eff6ff', '#06b6d4', '#0f172a'],
  },
  {
    id: 'graphite',
    label: 'Graphite',
    summary: 'Neutral, high-precision UI with compact spacing and strong hierarchy.',
    light: 'Soft graphite with precise lines.',
    dark: 'Dense graphite with cool borders.',
    accent: 'Slate',
    surface: ['#f8fafc', '#e2e8f0', '#475569', '#0f172a'],
  },
  {
    id: 'neon',
    label: 'Neon',
    summary: 'A sharper kit with lively gradients and stronger UI accents.',
    light: 'Radiant pastel accents on white.',
    dark: 'Electric glow with deep purple base.',
    accent: 'Pink',
    surface: ['#fff1f2', '#f5f3ff', '#ec4899', '#111827'],
  },
  {
    id: 'mono',
    label: 'Mono',
    summary: 'Black and white first, ideal for editorial or code-heavy docs.',
    light: 'Minimal monochrome daylight.',
    dark: 'True mono with strong contrast.',
    accent: 'Neutral',
    surface: ['#ffffff', '#f4f4f5', '#18181b', '#09090b'],
  },
]

export const THEME_IDS = THEME_PACKS.map((theme) => theme.id)
export const THEME_MODES: ThemeMode[] = ['auto', 'light', 'dark']

export function isValidTheme(value: string | null | undefined): value is ThemeId {
  return THEME_IDS.includes(value as ThemeId)
}

export function isValidMode(value: string | null | undefined): value is ThemeMode {
  return THEME_MODES.includes(value as ThemeMode)
}
