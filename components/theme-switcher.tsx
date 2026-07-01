import { useEffect, useMemo, useState } from 'react'
import { DARK_THEME_IDS, THEME_PACKS, type ThemeId, isValidTheme } from './theme-packs'

const STORAGE_KEY = 'nextra-theme-skin'

function shouldUseDarkMode(theme: ThemeId) {
  if (theme === 'default') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  return DARK_THEME_IDS.includes(theme)
}

function applyTheme(theme: ThemeId) {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', shouldUseDarkMode(theme))
}

export function setTheme(theme: ThemeId) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

export default function ThemeSwitcher() {
  const [theme, setThemeState] = useState<ThemeId>('default')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = window.localStorage.getItem(STORAGE_KEY)
    const initialTheme = isValidTheme(saved) ? saved : 'default'
    setThemeState(initialTheme)
    applyTheme(initialTheme)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const current = window.localStorage.getItem(STORAGE_KEY)
      if (!current || current === 'default') {
        applyTheme('default')
      }
    }

    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  const activeTheme = useMemo(
    () => THEME_PACKS.find((item) => item.id === theme) ?? THEME_PACKS[0],
    [theme],
  )

  const handleChange = (value: string) => {
    if (!isValidTheme(value)) return
    setThemeState(value)
    setTheme(value)
  }

  return (
    <div className="theme-switcher" aria-label="Theme packs">
      <div className="theme-switcher__label">
        <span className="theme-switcher__dot" aria-hidden="true" />
        <span>Theme</span>
      </div>

      <label className="theme-switcher__selectWrap">
        <span className="sr-only">Vybrat theme pack</span>
        <select
          className="theme-switcher__select"
          value={theme}
          onChange={(event) => handleChange(event.target.value)}
          aria-label="Vybrat theme pack"
        >
          {THEME_PACKS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <div className="theme-switcher__meta" aria-hidden="true">
        {activeTheme.label}
      </div>
    </div>
  )
}
