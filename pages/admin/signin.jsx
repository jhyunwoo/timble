import { signIn, useSession } from "next-auth/react"
import GoogleLogin from "../../public/google-logo.svg"
import AppleLogin from "../../public/apple-logo.png"
import NaverLogin from "../../public/naver-logo.png"
import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect } from "react"
import useSchool from "../../lib/client/useSchool"

export default function Signin() {
  const { data: session } = useSession()
  const { school } = useSchool()
  const router = useRouter()

  // check user auth
  useEffect(() => {
    if (session) {
      router.push(`/admin/${school ? school.code : null}`)
    }
  })

  return (
    <div className={"flex h-screen w-full flex-col"}>
      <div className={"m-auto w-full"}>
        <div className={"text-center text-4xl font-bold"}>로그인</div>
        <div
          className={
            "m-4 mx-auto flex w-5/6 flex-col items-center justify-center rounded-2xl  bg-white p-4 shadow-2xl sm:w-96"
          }
        >
          <button
            className={
              "m-2 grid w-4/5 grid-cols-6 items-center rounded-lg bg-white shadow-md transition duration-300 hover:shadow-2xl "
            }
            onClick={() => signIn("google")}
          >
            <Image src={GoogleLogin} alt={"Google Login Button"} className={"m-1 p-1"} />
            <p className={" col-span-5 basis-10/12 text-center text-lg font-semibold text-slate-800 sm:text-xl"}>
              Google로 로그인
            </p>
          </button>
          <button
            className={
              "m-2 grid w-4/5 grid-cols-6 items-center rounded-lg bg-black shadow-md transition duration-300 hover:shadow-2xl "
            }
            onClick={() => signIn("apple")}
          >
            <Image src={AppleLogin} alt={"Apple Login Button"} className={"m-1"} />
            <p className={" col-span-5 basis-10/12 text-center text-lg font-semibold text-white sm:text-xl"}>
              Apple로 로그인
            </p>
          </button>
          <button
            className={
              "m-2 grid w-4/5 grid-cols-6 items-center rounded-lg bg-[#03c75a] shadow-md transition duration-300 hover:shadow-2xl "
            }
            onClick={() => signIn("naver")}
          >
            <Image src={NaverLogin} alt={"Naver Login Button"} className={"m-1"} />
            <p className={" col-span-5 basis-10/12 text-center text-lg font-semibold text-white sm:text-xl"}>
              네이버로 로그인
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
