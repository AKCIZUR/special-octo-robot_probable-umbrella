export type ThemeId = 'default' | 'glass' | 'github' | 'nord' | 'dracula' | 'apple'

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
    id: 'default',
    label: 'Default',
    summary: 'Clean docs layout with balanced contrast and a neutral blue accent.',
    light: 'Bright, readable, and neutral.',
    dark: 'System adaptive dark mode.',
    accent: 'Indigo',
    surface: ['#ffffff', '#f7f7fb', '#4f46e5', '#0f172a'],
  },
  {
    id: 'glass',
    label: 'Glass',
    summary: 'Soft glassmorphism with airy surfaces and translucent layers.',
    light: 'Frosted cards and bright highlights.',
    dark: 'Muted glass with neon-blue accents.',
    accent: 'Blue',
    surface: ['#ffffff', '#eff6ff', '#2563eb', '#0f172a'],
  },
  {
    id: 'github',
    label: 'GitHub',
    summary: 'Docs UI inspired by GitHub: calm, compact, and content-first.',
    light: 'Light editor-like documentation.',
    dark: 'GitHub dark with subtle borders.',
    accent: 'Blue',
    surface: ['#ffffff', '#f6f8fa', '#0969da', '#0d1117'],
  },
  {
    id: 'nord',
    label: 'Nord',
    summary: 'Cold, soft palette with a focused documentation feel.',
    light: 'Nord day palette.',
    dark: 'Nord night palette.',
    accent: 'Cyan',
    surface: ['#eceff4', '#e5e9f0', '#88c0d0', '#2e3440'],
  },
  {
    id: 'dracula',
    label: 'Dracula',
    summary: 'High-contrast violet and pink for a bold terminal-inspired kit.',
    light: 'Pastel lavender with pink highlights.',
    dark: 'Classic Dracula with rich contrast.',
    accent: 'Pink',
    surface: ['#f8f8f2', '#f1f1f8', '#ff79c6', '#282a36'],
  },
  {
    id: 'apple',
    label: 'Apple',
    summary: 'Rounded, elegant, and minimal with a system feel.',
    light: 'iOS and macOS inspired daylight.',
    dark: 'Apple dark with soft borders.',
    accent: 'Blue',
    surface: ['#ffffff', '#f5f5f7', '#007aff', '#1d1d1f'],
  },
]

export const THEME_IDS = THEME_PACKS.map((theme) => theme.id)
export const DARK_THEME_IDS: ThemeId[] = ['default', 'glass', 'github', 'nord', 'dracula', 'apple']

export function isValidTheme(value: string | null | undefined): value is ThemeId {
  return THEME_IDS.includes(value as ThemeId)
}
