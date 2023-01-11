import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react"
import Router from "next/router"

import Loading from "../components/Loading"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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
    <Loading />
  ) : (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
