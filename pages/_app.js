import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
import React from "react"
import Loading from "../components/Loading"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <React.Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </React.Suspense>
      </SessionProvider>
    </RecoilRoot>
  )
}
