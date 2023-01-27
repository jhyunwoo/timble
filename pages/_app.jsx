import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
import React from "react"
import Loading from "../components/Loading"
import { Analytics } from "@vercel/analytics/react"
import localFont from "@next/font/local"
import Router from "next/router"
import { useEffect, useState } from "react"

const inter = localFont({ src: "../public/NanumSquareNeo-Variable.woff2" })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      // NProgress.start();
      setLoading(true)
    }
    const end = () => {
      // NProgress.done();
      setLoading(false)
    }

    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)

    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return loading ? (
    <RecoilRoot>
      <SessionProvider session={session}>
        <React.Suspense fallback={<Loading />}>
          <main className={inter.className}>
            <Loading />
            <Component {...pageProps} />
          </main>
          <Analytics />
        </React.Suspense>
      </SessionProvider>
    </RecoilRoot>
  ) : (
    <RecoilRoot>
      <SessionProvider session={session}>
        <React.Suspense fallback={<Loading />}>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
          <Analytics />
        </React.Suspense>
      </SessionProvider>
    </RecoilRoot>
  )
}
