import type { AppProps } from 'next/app'
import ThemeSwitcher from '../components/theme-switcher'
import '../styles/custom-style.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ThemeSwitcher />
    </>
  )
}
