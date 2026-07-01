import { THEME_PACKS } from './theme-packs'
import { setTheme } from './theme-switcher'

export default function ThemePackGrid() {
  return (
    <section className="theme-pack-grid" aria-label="Theme packs preview">
      {THEME_PACKS.map((theme) => (
        <button
          key={theme.id}
          type="button"
          className="theme-pack-card"
          onClick={() => setTheme(theme.id)}
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
      ))}
    </section>
  )
}
