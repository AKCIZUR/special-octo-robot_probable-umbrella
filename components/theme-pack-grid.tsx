'use client'

import { useEffect, useState } from 'react'
import { THEME_PACKS, type ThemeId } from './theme-packs'
import { setTheme, THEME_STORAGE_KEY, isValidTheme } from './theme-switcher'

const THEME_EVENT = 'onceui-theme-change'

function getActiveTheme(): ThemeId {
  if (typeof window === 'undefined') return 'core'
  const value = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isValidTheme(value) ? value : 'core'
}

export default function ThemePackGrid() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>('core')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sync = () => setActiveTheme(getActiveTheme())
    sync()

    const onThemeChange = () => sync()
    const onStorage = () => sync()

    window.addEventListener(THEME_EVENT, onThemeChange)
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener(THEME_EVENT, onThemeChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return (
    <section className="theme-pack-grid" aria-label="Theme packs preview">
      {THEME_PACKS.map((theme) => {
        const isActive = activeTheme === theme.id

        return (
          <button
            key={theme.id}
            type="button"
            className={isActive ? 'theme-pack-card is-active' : 'theme-pack-card'}
            onClick={() => setTheme(theme.id)}
            aria-pressed={isActive}
            aria-label={`Přepnout na ${theme.label}`}
          >
            <div className="theme-pack-card__top">
              <div>
                <div className="theme-pack-card__label">{theme.label}</div>
                <div className="theme-pack-card__summary">{theme.summary}</div>
              </div>
              <span className="theme-pack-card__badge">{theme.accent}</span>
            </div>

            <div className="theme-pack-card__swatches" aria-hidden="true">
              {theme.surface.map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
              ))}
            </div>

            <div className="theme-pack-card__meta">
              <span>{theme.light}</span>
              <span>{theme.dark}</span>
            </div>
          </button>
        )
      })}
    </section>
  )
}
