import type { Metadata } from 'next'
import { Banner, Head } from 'nextra/components'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import ThemeSwitcher from '../components/theme-switcher'
import '../styles/custom-style.css'
import 'nextra-theme-docs/style.css'

const themeInitScript = `
(() => {
  try {
    const THEME_STORAGE_KEY = 'onceui-theme-pack'
    const MODE_STORAGE_KEY = 'onceui-theme-mode'
    const themes = new Set(['core', 'paper', 'glass', 'graphite', 'neon', 'mono'])
    const modes = new Set(['auto', 'light', 'dark'])

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

export const metadata: Metadata = {
  title: 'Once UI Docs',
  description: 'Once UI-inspired Nextra docs template',
}

const banner = (
  <Banner storageKey="once-ui-banner">
    Once UI docs · 6 theme packs · local dev + GitHub Pages
  </Banner>
)

const navbar = (
  <Navbar logo={<span>Once UI Docs</span>}>
    <ThemeSwitcher />
  </Navbar>
)

const footer = <Footer>Once UI core kit © {new Date().getFullYear()}</Footer>

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" dir="ltr" suppressHydrationWarning>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
