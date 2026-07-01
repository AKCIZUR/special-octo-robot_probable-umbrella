import Document, { Head, Html, Main, NextScript } from 'next/document'
import { THEME_IDS, THEME_MODES } from '../components/theme-packs'

const themeInitScript = `
(() => {
  try {
    const THEME_STORAGE_KEY = 'nextra-theme-pack'
    const MODE_STORAGE_KEY = 'nextra-theme-mode'
    const themes = new Set(${JSON.stringify(THEME_IDS)})
    const modes = new Set(${JSON.stringify(THEME_MODES)})

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY)

    const theme = themes.has(savedTheme) ? savedTheme : 'core'
    const mode = modes.has(savedMode) ? savedMode : 'auto'
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const useDark = mode === 'dark' || (mode === 'auto' && systemDark)

    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.mode = mode
    document.documentElement.classList.toggle('dark', useDark)
  } catch (error) {}
})()
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
