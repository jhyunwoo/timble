import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useSWRConfig } from "swr"

import useUser from "../../lib/client/useUser"
import Loading from "../../components/Loading"
import useSchool from "../../lib/client/useSchool"
import useAllSchools from "../../lib/client/useAllSchools"

export default function Userinfo() {
  // router 설정
  const router = useRouter()

  const { mutate } = useSWRConfig()
  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()
  const { allSchools } = useAllSchools()
  const { diplomas } = useSchool()
  const [school, setSchool] = useState(null)
  const [diploma, setDiploma] = useState(null)
  const [year, setYear] = useState(0)
  const [warn, setWarn] = useState(false)
  const [loading, setLoading] = useState(false)

  const { nullData, isLoadingUser } = useUser()
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

  if (isLoadingUser || loading || !nullData[0]) {
    return <Loading />
  } else {
    return (
      <div className={"flex h-screen w-full flex-col bg-slate-50"}>
        {nullData[0] === "schoolId" ? <SchoolForm /> : ""}
        {nullData[0] === "year" ? <YearForm /> : ""}
        {nullData[0] === "diploma" ? <DiplomaForm /> : ""}
        {nullData[0] === "name" ? <NameForm /> : ""}
        {warn ? (
          <div className={"m-4 flex animate-pulse items-center justify-center rounded-xl bg-red-400 p-4"}>
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
        <div className={"p-4 pt-8 text-center text-2xl font-semibold"}>학교</div>
        <div className={"grid w-full grid-cols-1 gap-6 p-4"}>
          {allSchools
            ? allSchools.map((data, key) => (
                <button
                  key={key}
                  className={`${
                    school === "cnsa" ? "bg-green-500 text-white" : ""
                  }   rounded-xl p-4 text-xl font-semibold shadow-lg transition duration-200 hover:bg-green-500 hover:text-white hover:ring-offset-4`}
                  onClick={() => controlSchool(data.code)}
                >
                  {data.name}
                </button>
              ))
            : ""}

          <button
            className={
              "  rounded-xl bg-white p-4 text-xl font-semibold shadow-lg  transition duration-200 hover:bg-green-500 hover:text-white hover:ring-offset-4"
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
        <div className={"p-4 text-center text-2xl font-semibold "} onClick={() => console.log(diplomas)}>
          디플로마
        </div>
        <div className={"grid grid-cols-2 gap-4 p-4"}>
          {diplomas
            ? diplomas.map((data, key) => (
                <button
                  key={key}
                  onClick={() => {
                    controlDiploma(data.id)
                  }}
                  className={`${
                    diploma === data.id ? "bg-green-500 text-white" : ""
                  }   rounded-xl p-2 text-xl font-medium shadow-lg transition duration-200 hover:bg-green-500 hover:text-white hover:ring-offset-2`}
                >
                  {data.name}
                </button>
              ))
            : ""}
        </div>
      </div>
    )
  }
  // <button
  //   onClick={() => {
  //     controlDiploma("자연과학")
  //   }}
  //   className={`${
  //     diploma === "자연과학" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   자연과학
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("공학")
  //   }}
  //   className={`${
  //     diploma === "공학" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   공학
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("IT")
  //   }}
  //   className={`${
  //     diploma === "IT" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   IT
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("생명과학")
  //   }}
  //   className={`${
  //     diploma === "생명과학" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   생명과학
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("국제인문")
  //   }}
  //   className={`${
  //     diploma === "국제인문" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   국제인문
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("사회과학")
  //   }}
  //   className={`${
  //     diploma === "사회과학" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   사회과학
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("경제경영")
  //   }}
  //   className={`${
  //     diploma === "경제경영" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   경제경영
  // </button>
  // <button
  //   onClick={() => {
  //     controlDiploma("예술체육")
  //   }}
  //   className={`${
  //     diploma === "예술체육" ? "bg-green-500 text-white" : ""
  //   }   p-2 text-xl font-medium rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition shadow-lg`}
  // >
  //   예술체육
  // </button>

  function YearForm() {
    return (
      <div>
        <div className={" p-4 text-center text-2xl font-semibold "}>학년</div>
        <div className={"grid w-full grid-cols-1 gap-6 p-4"}>
          <button
            className={`${
              year === 1 ? "bg-green-500 text-white" : ""
            }   rounded-xl p-4 text-xl font-semibold shadow-lg transition duration-200 hover:bg-green-500 hover:text-white hover:ring-offset-4`}
            onClick={() => controlYear(1)}
          >
            1학년
          </button>
          <button
            className={`${
              year === 2 ? "bg-green-500 text-white" : ""
            }   rounded-xl p-4 text-xl font-semibold shadow-lg transition duration-200 hover:bg-green-500 hover:text-white hover:ring-offset-4`}
            onClick={() => controlYear(2)}
          >
            2학년
          </button>
          <button
            className={`${
              year === 3 ? "bg-green-500 text-white" : ""
            }   rounded-xl p-4 text-xl font-semibold shadow-lg transition duration-200 hover:bg-green-500 hover:text-white hover:ring-offset-4`}
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
        <div className={" p-4 text-center text-2xl font-semibold "}>이름</div>
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register("name", {
              required: { value: true, message: "이름을 입력해주세요" },
              minLength: { value: 2, message: "이름은 두 글자 이상입니다" },
              maxLength: { value: 4, message: "이름은 4글자 이하입니다" },
            })}
            placeholder={"이름을 입력해주세요"}
            className={"m-4 rounded-xl p-4 text-center text-xl"}
          />
          {errors.name && (
            <div className={"m-4 flex animate-pulse items-center justify-center rounded-xl bg-red-400 p-4"}>
              <div className={"text-lg font-semibold text-white"}>{errors.name.message}</div>
            </div>
          )}

          <div className={"absolute bottom-0 flex w-full items-center justify-center pb-4"}>
            <input
              type="submit"
              value={"다음"}
              className={
                "w-4/5 rounded-2xl bg-green-500 py-4 text-2xl font-semibold tracking-wider text-white shadow-xl transition duration-200 hover:bg-green-600"
              }
            />
          </div>
        </form>
      </div>
    )
  }

  function NextButton() {
    return (
      <div className={"absolute bottom-0 flex w-full items-center justify-center pb-4"}>
        <button
          className={
            "w-4/5 rounded-2xl bg-green-500 py-4 text-2xl font-semibold tracking-wider text-white shadow-xl transition duration-200 hover:bg-green-600 "
          }
          onClick={() => pageControl()}
        >
          다음
        </button>
      </div>
    )
  }
}
