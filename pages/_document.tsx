import Document, { Head, Html, Main, NextScript } from 'next/document'
import { THEME_IDS, DARK_THEME_IDS } from '../components/theme-packs'

const themeInitScript = `
(() => {
  try {
    const STORAGE_KEY = 'nextra-theme-skin'
    const themes = new Set(${JSON.stringify(THEME_IDS)})
    const darkThemes = new Set(${JSON.stringify(DARK_THEME_IDS)})
    const saved = localStorage.getItem(STORAGE_KEY)
    const theme = themes.has(saved) ? saved : 'default'
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldUseDark = theme === 'default' ? systemDark : darkThemes.has(theme)
    document.documentElement.dataset.theme = theme
    document.documentElement.classList.toggle('dark', shouldUseDark)
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
