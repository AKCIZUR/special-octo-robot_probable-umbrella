import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'nextra-theme-skin'

const THEMES = [
  { id: 'default', label: 'Default' },
  { id: 'glass', label: 'Glass' },
  { id: 'github', label: 'GitHub' },
  { id: 'nord', label: 'Nord' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'apple', label: 'Apple' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'cyberpunk', label: 'Cyberpunk' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

const DARK_THEMES = new Set<ThemeId>(['github', 'nord', 'dracula', 'cyberpunk'])

function applyTheme(theme: ThemeId) {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const shouldUseDark = theme === 'default' ? systemDark : DARK_THEMES.has(theme)

  root.dataset.theme = theme
  root.classList.toggle('dark', shouldUseDark)
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>('default')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null
    const initialTheme = THEMES.some((item) => item.id === saved) ? (saved as ThemeId) : 'default'

    setTheme(initialTheme)
    applyTheme(initialTheme)

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const onChange = () => {
      const currentTheme = (window.localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? 'default'
      if (currentTheme === 'default') applyTheme('default')
    }

    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  const activeLabel = useMemo(
    () => THEMES.find((item) => item.id === theme)?.label ?? 'Default',
    [theme],
  )

  const handleChange = (value: ThemeId) => {
    setTheme(value)
    window.localStorage.setItem(STORAGE_KEY, value)
    applyTheme(value)
  }

  return (
    <div className="theme-switcher" aria-label="Theme skins">
      <div className="theme-switcher__label">
        <span className="theme-switcher__dot" aria-hidden="true" />
        <span>Skin</span>
      </div>

      <label className="theme-switcher__selectWrap">
        <span className="sr-only">Vybrat skin</span>
        <select
          className="theme-switcher__select"
          value={theme}
          onChange={(event) => handleChange(event.target.value as ThemeId)}
          aria-label="Vybrat skin"
        >
          {THEMES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <div className="theme-switcher__meta" aria-hidden="true">
        {activeLabel}
      </div>
    </div>
  )
}
