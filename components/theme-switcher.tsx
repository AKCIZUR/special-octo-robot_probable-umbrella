import { useEffect, useMemo, useState } from 'react'
import {
  THEME_PACKS,
  type ThemeId,
  type ThemeMode,
  isValidMode,
  isValidTheme,
} from './theme-packs'

const THEME_STORAGE_KEY = 'nextra-theme-pack'
const MODE_STORAGE_KEY = 'nextra-theme-mode'

function resolveDarkMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return false
  if (mode === 'dark') return true
  if (mode === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyAppearance(theme: ThemeId, mode: ThemeMode) {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = theme
  root.dataset.mode = mode
  root.classList.toggle('dark', resolveDarkMode(mode))
}

export function setTheme(theme: ThemeId) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  const currentMode = window.localStorage.getItem(MODE_STORAGE_KEY)
  const mode = isValidMode(currentMode) ? currentMode : 'auto'
  applyAppearance(theme, mode)
}

export function setMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(MODE_STORAGE_KEY, mode)
  const currentTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  const theme = isValidTheme(currentTheme) ? currentTheme : 'core'
  applyAppearance(theme, mode)
}

export default function ThemeSwitcher() {
  const [theme, setThemeState] = useState<ThemeId>('core')
  const [mode, setModeState] = useState<ThemeMode>('auto')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    const savedMode = window.localStorage.getItem(MODE_STORAGE_KEY)

    const initialTheme = isValidTheme(savedTheme) ? savedTheme : 'core'
    const initialMode = isValidMode(savedMode) ? savedMode : 'auto'

    setThemeState(initialTheme)
    setModeState(initialMode)
    applyAppearance(initialTheme, initialMode)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const currentMode = window.localStorage.getItem(MODE_STORAGE_KEY)
      const resolvedMode = isValidMode(currentMode) ? currentMode : 'auto'
      if (resolvedMode === 'auto') {
        applyAppearance(initialTheme, 'auto')
      }
    }

    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  const activeTheme = useMemo(
    () => THEME_PACKS.find((item) => item.id === theme) ?? THEME_PACKS[0],
    [theme],
  )

  return (
    <div className="theme-switcher" aria-label="Theme controls">
      <div className="theme-switcher__head">
        <div className="theme-switcher__label">
          <span className="theme-switcher__dot" aria-hidden="true" />
          <span>Theme</span>
        </div>
        <div className="theme-switcher__meta" aria-hidden="true">
          {activeTheme.label} · {mode}
        </div>
      </div>

      <div className="theme-switcher__row">
        <label className="theme-switcher__selectWrap">
          <span className="sr-only">Vybrat theme pack</span>
          <select
            className="theme-switcher__select"
            value={theme}
            onChange={(event) => {
              const value = event.target.value
              if (!isValidTheme(value)) return
              setThemeState(value)
              setTheme(value)
            }}
            aria-label="Vybrat theme pack"
          >
            {THEME_PACKS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="theme-switcher__modes" role="group" aria-label="Barevný režim">
          {(['auto', 'light', 'dark'] as ThemeMode[]).map((item) => (
            <button
              key={item}
              type="button"
              className={item === mode ? 'theme-switcher__mode is-active' : 'theme-switcher__mode'}
              onClick={() => {
                setModeState(item)
                setMode(item)
              }}
              aria-pressed={item === mode}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
