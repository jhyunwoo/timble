import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
import React from "react"
import Loading from "../components/Loading"
import { Analytics } from "@vercel/analytics/react"
import localFont from "@next/font/local"

const inter = localFont({ src: "../public/NanumSquareNeo-Variable.woff2" })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
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
