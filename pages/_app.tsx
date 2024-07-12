import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkStreaks = () => {
      if (typeof window !== 'undefined') {
        const streaks = localStorage.getItem('streaks')
        if (streaks && JSON.parse(streaks).length > 0 && router.pathname === '/') {
          router.push('/streaks')
        }
      }
      setIsLoading(false)
    }
    checkStreaks()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Habits.lol</title>
        <meta name="description" content="Build better habits, one day at a time with Habits.lol" />
        <meta property="" content="Habits.lol" />
        <meta property="og:description" content="Build better habits, one day at a time with Habits.lol" />
        <meta property="og:image" content="https://habits.lol/public/image.svg" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://habits.lol" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp