import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
import React from "react"
import Loading from "../components/Loading"
import { Analytics } from "@vercel/analytics/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <React.Suspense fallback={<Loading />}>
          <Component {...pageProps} />
          <Analytics />
        </React.Suspense>
      </SessionProvider>
    </RecoilRoot>
  )
}
