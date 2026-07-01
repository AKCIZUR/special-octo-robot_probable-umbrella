import type { AppProps } from 'next/app'
import '../styles/custom-style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
