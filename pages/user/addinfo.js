import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useSWRConfig } from "swr"

import useUser from "../../lib/client/useUser"
import Loading from "../../components/Loading"

export default function Userinfo() {
  // router 설정
  const router = useRouter()

  const { mutate } = useSWRConfig()
  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()

  const [school, setSchool] = useState(null)
  const [diploma, setDiploma] = useState(null)
  const [year, setYear] = useState(0)
  const [warn, setWarn] = useState(false)
  const [loading, setLoading] = useState(false)

  const { nullData, isLoading } = useUser()

  // react hook form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    postUserInfo(nullData[0], data.name)
  }

  // school control
  function controlSchool(value) {
    if (school === "" || school !== value) {
      setSchool(value)
      setWarn(false)
    } else {
      setSchool(null)
    }
  }

  // diploma control
  function controlDiploma(value) {
    if (diploma === "" || diploma !== value) {
      setDiploma(value)
      setWarn(false)
    } else {
      setDiploma(null)
    }
  }

  // year control
  function controlYear(value) {
    if (year === 0 || year !== value) {
      setYear(value)
      setWarn(false)
    } else {
      setYear(0)
    }
  }

  // 사용자 데이터 서버에 수정
  async function postUserInfo(pageData, userData) {
    setLoading(true)
    await axios.post("/api/postUserInfo", {
      post: pageData,
      userEmail: session.user.email,
      data: userData,
    })
    setLoading(false)
    mutate(["/api/getUserInfo", session.user.email])
  }

  // nullData에서 다음 클릭시 다음장으로 이동
  function pageControl() {
    if (nullData[0] === "schoolId") {
      if (school === null) {
        setWarn(true)
      } else {
        postUserInfo(nullData[0], school)
        setWarn(false)
      }
    } else if (nullData[0] === "diploma") {
      if (diploma === null) {
        setWarn(true)
      } else {
        postUserInfo(nullData[0], diploma)
        setWarn(false)
      }
    } else if (nullData[0] === "year") {
      if (year === 0) {
        setWarn(true)
      } else {
        postUserInfo(nullData[0], year)
        setWarn(false)
      }
    } else {
      router.push("/lobby")
    }
  }

  useEffect(() => {
    if (nullData.length === 0) {
      router.push("/lobby")
    }
  }, [router, nullData])

  if (isLoading || loading || !nullData[0]) {
    return <Loading />
  } else {
    return (
      <div className={"bg-slate-50 w-full h-screen flex flex-col"}>
        {nullData[0] === "schoolId" ? <SchoolForm /> : ""}
        {nullData[0] === "year" ? <YearForm /> : ""}
        {nullData[0] === "diploma" ? <DiplomaForm /> : ""}
        {nullData[0] === "name" ? <NameForm /> : ""}
        {warn ? (
          <div
            className={
              "bg-red-400 flex justify-center items-center p-4 m-4 rounded-xl animate-pulse"
            }
          >
            <div className={"text-lg font-semibold text-white"}>
              {nullData[0] === "school" ? "학교를" : null}
              {nullData[0] === "diploma" ? "디플로마를" : null}
              {nullData[0] === "year" ? "학년을" : null} 선택해주세요
            </div>
          </div>
        ) : (
          ""
        )}
        {nullData[0] !== "name" ? <NextButton /> : ""}
      </div>
    )
  }

  function SchoolForm() {
    return (
      <div>
        <div className={"text-2xl text-center p-4 font-semibold pt-8"}>
          학교
        </div>
        <div className={"grid p-4 grid-cols-1 w-full gap-6"}>
          <button
            className={`${
              school === "cnsa" ? "bg-green-500 text-white" : ""
            }   p-4 text-xl font-semibold rounded-xl shadow-lg hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
            onClick={() => controlSchool("cnsa")}
          >
            충남삼성고등학교
          </button>
          <button
            className={
              "  p-4 text-xl font-semibold bg-white rounded-xl shadow-lg  hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition"
            }
            onClick={() => alert("충남삼성고등학교 외 학교는 지원 예정입니다.")}
          >
            그 외
          </button>
        </div>
      </div>
    )
  }

  function DiplomaForm() {
    return (
      <div>
        <div className={"text-2xl text-center p-4 font-semibold "}>
          디플로마
        </div>
        <div className={"grid grid-cols-2 gap-4 p-4"}>
          <button
            onClick={() => {
              controlDiploma("자연과학")
            }}
            className={`${
              diploma === "자연과학" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            자연과학
          </button>
          <button
            onClick={() => {
              controlDiploma("공학")
            }}
            className={`${
              diploma === "공학" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            공학
          </button>
          <button
            onClick={() => {
              controlDiploma("IT")
            }}
            className={`${
              diploma === "IT" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            IT
          </button>
          <button
            onClick={() => {
              controlDiploma("생명과학")
            }}
            className={`${
              diploma === "생명과학" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            생명과학
          </button>
          <button
            onClick={() => {
              controlDiploma("국제인문")
            }}
            className={`${
              diploma === "국제인문" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            국제인문
          </button>
          <button
            onClick={() => {
              controlDiploma("사회과학")
            }}
            className={`${
              diploma === "사회과학" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            사회과학
          </button>
          <button
            onClick={() => {
              controlDiploma("경제경영")
            }}
            className={`${
              diploma === "경제경영" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            경제경영
          </button>
          <button
            onClick={() => {
              controlDiploma("예술체육")
            }}
            className={`${
              diploma === "예술체육" ? "bg-green-500 text-white" : ""
            }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
          >
            예술체육
          </button>
        </div>
      </div>
    )
  }

  function YearForm() {
    return (
      <div>
        <div className={" text-2xl text-center p-4 font-semibold "}>학년</div>
        <div className={"grid p-4 grid-cols-1 w-full gap-6"}>
          <button
            className={`${
              year === 1 ? "bg-green-500 text-white" : ""
            }   p-4 text-xl shadow-lg font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
            onClick={() => controlYear(1)}
          >
            1학년
          </button>
          <button
            className={`${
              year === 2 ? "bg-green-500 text-white" : ""
            }   p-4 text-xl shadow-lg font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
            onClick={() => controlYear(2)}
          >
            2학년
          </button>
          <button
            className={`${
              year === 3 ? "bg-green-500 text-white" : ""
            }   p-4 text-xl shadow-lg font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
            onClick={() => controlYear(3)}
          >
            3학년
          </button>
        </div>
      </div>
    )
  }

  function NameForm() {
    return (
      <div>
        <div className={" text-2xl text-center p-4 font-semibold "}>이름</div>
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register("name", {
              required: { value: true, message: "이름을 입력해주세요" },
              minLength: { value: 2, message: "이름은 두 글자 이상입니다" },
              maxLength: { value: 4, message: "이름은 4글자 이하입니다" },
            })}
            placeholder={"이름을 입력해주세요"}
            className={"p-4 m-4 rounded-xl text-center text-xl"}
          />
          {errors.name && (
            <div
              className={
                "bg-red-400 flex justify-center items-center p-4 m-4 rounded-xl animate-pulse"
              }
            >
              <div className={"text-lg font-semibold text-white"}>
                {errors.name.message}
              </div>
            </div>
          )}

          <div
            className={
              "bottom-0 w-full absolute pb-4 flex justify-center items-center"
            }
          >
            <input
              type="submit"
              value={"다음"}
              className={
                "bg-green-500 w-4/5 py-4 rounded-2xl text-white font-semibold text-2xl tracking-wider hover:bg-green-600 transition duration-200 shadow-xl"
              }
            />
          </div>
        </form>
      </div>
    )
  }

  function NextButton() {
    return (
      <div
        className={
          "bottom-0 w-full absolute pb-4 flex justify-center items-center"
        }
      >
        <button
          className={
            "bg-green-500 w-4/5 py-4 rounded-2xl text-white font-semibold text-2xl tracking-wider hover:bg-green-600 transition duration-200 shadow-xl "
          }
          onClick={() => pageControl()}
        >
          다음
        </button>
      </div>
    )
  }
}
