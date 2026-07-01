'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  THEME_PACKS,
  type ThemeId,
  type ThemeMode,
  isValidMode,
  isValidTheme,
} from './theme-packs'

export const THEME_STORAGE_KEY = 'onceui-theme-pack'
export const MODE_STORAGE_KEY = 'onceui-theme-mode'
const THEME_EVENT = 'onceui-theme-change'

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

function readStoredTheme() {
  if (typeof window === 'undefined') return 'core' as ThemeId
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isValidTheme(saved) ? saved : 'core'
}

function readStoredMode() {
  if (typeof window === 'undefined') return 'auto' as ThemeMode
  const saved = window.localStorage.getItem(MODE_STORAGE_KEY)
  return isValidMode(saved) ? saved : 'auto'
}

export function setTheme(theme: ThemeId) {
  if (typeof window === 'undefined') return
  const mode = readStoredMode()
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  applyAppearance(theme, mode)
  window.dispatchEvent(new Event(THEME_EVENT))
}

export function setMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return
  const theme = readStoredTheme()
  window.localStorage.setItem(MODE_STORAGE_KEY, mode)
  applyAppearance(theme, mode)
  window.dispatchEvent(new Event(THEME_EVENT))
}

export default function ThemeSwitcher() {
  const [theme, setThemeState] = useState<ThemeId>('core')
  const [mode, setModeState] = useState<ThemeMode>('auto')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sync = () => {
      const nextTheme = readStoredTheme()
      const nextMode = readStoredMode()
      setThemeState(nextTheme)
      setModeState(nextMode)
      applyAppearance(nextTheme, nextMode)
    }

    sync()

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onThemeEvent = () => sync()
    const onStorage = () => sync()
    const onMediaChange = () => {
      const currentMode = readStoredMode()
      if (currentMode === 'auto') {
        applyAppearance(readStoredTheme(), 'auto')
      }
    }

    window.addEventListener(THEME_EVENT, onThemeEvent)
    window.addEventListener('storage', onStorage)
    media.addEventListener?.('change', onMediaChange)

    return () => {
      window.removeEventListener(THEME_EVENT, onThemeEvent)
      window.removeEventListener('storage', onStorage)
      media.removeEventListener?.('change', onMediaChange)
    }
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
