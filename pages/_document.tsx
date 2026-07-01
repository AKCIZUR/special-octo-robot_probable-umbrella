import Document, { Head, Html, Main, NextScript } from 'next/document'

const themeInitScript = `
(() => {
  try {
    const STORAGE_KEY = 'nextra-theme-skin'
    const themes = new Set(['default','glass','github','nord','dracula','apple','minimal','cyberpunk'])
    const darkThemes = new Set(['github','nord','dracula','cyberpunk'])
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
