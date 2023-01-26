import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import useUser from "../lib/client/useUser"
import {useEffect} from "react";

export default function Home() {
  const { data: session } = useSession()
  const { user } = useUser()
  useEffect(()=>{
    console.log(session.session)
  })
  return (
    <div className={"flex h-screen w-full flex-col bg-green-50"}>
      <div className={" m-auto flex flex-col"}>
        <div className={"text-center text-6xl font-bold"} onClick={()=>signOut()}>Timble</div>
        <div className={"mt-1 text-center text-lg"}>친구랑 시간표 맞추고 싶어?</div>
        <div className={"mx-auto my-2 mt-4 rounded-xl bg-green-500 p-2 px-4 text-white"}>
          {user ? (
            user.role === "ADMIN" ? (
              <Link href={`/admin`}>
                <p className={"text-center text-2xl"}>시작하기</p>
              </Link>
            ) : (
              <Link href={"/lobby"}>
                <p className={"text-center text-2xl"}>시작하기</p>
              </Link>
            )
          ) : (
            <Link href={"/signin"}>
              <p className={"text-center text-2xl"}>시작하기</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
