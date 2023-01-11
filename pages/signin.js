import { signIn, useSession } from "next-auth/react"
import GoogleLogin from "../public/google-logo.svg"
import AppleLogin from "../public/apple-logo.png"
import NaverLogin from "../public/naver-logo.png"
import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect } from "react"

export default function Signin() {
  const { data: session } = useSession()
  const router = useRouter()

  // check user auth
  useEffect(() => {
    if (session) {
      router.push("/lobby")
    }
  })

  return (
    <div className={"w-full h-screen flex flex-col"}>
      <div className={"m-auto w-full"}>
        <div className={"text-center text-4xl font-bold"}>로그인</div>
        <div
          className={
            "flex flex-col m-4 bg-white shadow-2xl p-4 rounded-2xl w-5/6  sm:w-96 mx-auto justify-center items-center"
          }
        >
          <button
            className={
              "grid grid-cols-6 shadow-md hover:shadow-2xl transition duration-300 items-center bg-white rounded-lg w-4/5 m-2 "
            }
            onClick={() => signIn("google")}
          >
            <Image
              src={GoogleLogin}
              alt={"Google Login Button"}
              className={"m-1 p-1"}
            />
            <p
              className={
                " text-lg sm:text-xl text-slate-800 font-semibold basis-10/12 text-center col-span-5"
              }
            >
              Google로 로그인
            </p>
          </button>
          <button
            className={
              "grid grid-cols-6 shadow-md hover:shadow-2xl transition duration-300 items-center bg-black rounded-lg w-4/5 m-2 "
            }
            onClick={() => signIn("apple")}
          >
            <Image
              src={AppleLogin}
              alt={"Apple Login Button"}
              className={"m-1"}
            />
            <p
              className={
                " text-lg sm:text-xl text-white font-semibold basis-10/12 text-center col-span-5"
              }
            >
              Apple로 로그인
            </p>
          </button>
          <button
            className={
              "grid grid-cols-6 shadow-md hover:shadow-2xl transition duration-300 items-center bg-[#03c75a] rounded-lg w-4/5 m-2 "
            }
            onClick={() => signIn("naver")}
          >
            <Image
              src={NaverLogin}
              alt={"Naver Login Button"}
              className={"m-1"}
            />
            <p
              className={
                " text-lg sm:text-xl text-white font-semibold basis-10/12 text-center col-span-5"
              }
            >
              네이버로 로그인
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
