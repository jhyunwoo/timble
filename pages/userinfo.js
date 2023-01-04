import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Userinfo() {
  // router 설정
  const router = useRouter()
  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()
  // NullData 저장
  const [nullData, setNullData] = useState([])
  const [page, setPage] = useState(0)
  const [school, setSchool] = useState("")
  const [diploma, setDiploma] = useState("")
  const [year, setYear] = useState(0)

  // 로그인 되지 않은 사용자 메인 페이지로 이동
  function checkUserAuth() {
    if (!session) {
      router.push("/").then((r) => console.log("Redirect to Main Page"))
    }
  }

  // 사용자 Null 데이터 받아오기
  function getUserNull() {
    if (session) {
      axios
        .post("/api/getUserNullData", {
          userEmail: session.user.email,
        })
        .then((response) => setNullData(response.data))
        .catch((error) => console.log(error))
    }
  }

  // school control
  function controlSchool(value) {
    if (school === "") {
      setSchool(value)
    } else {
      setSchool("")
    }
  }
  // diploma control
  function controlDiploma(value) {
    if (school === "") {
      setDiploma(value)
    } else {
      setDiploma("")
    }
  }

  // year control
  function controlYear(value) {
    if (school === "") {
      setYear(value)
    } else {
      setYear(0)
    }
  }

  // 사용자 데이터 서버에 수정
  function postUserInfo(pageData, userData) {
    axios.post("api/postUserInfo", {
      post: pageData,
      userEmail: session.user.email,
      data: userData,
    })
  }

  // nullData에서 다음 클릭시 다음장으로 이동
  function pageControl() {
    if (nullData[page] === "school") {
      postUserInfo(nullData[page], school)
      setPage(page + 1)
    } else if (nullData[page] === "diploma") {
      postUserInfo(nullData[page], diploma)
      setPage(page + 1)
    } else if (nullData[page] === "year") {
      postUserInfo(nullData[page], year)
      setPage(page + 1)
    }
  }

  useEffect(() => {
    checkUserAuth()
    getUserNull()
  }, [])

  return (
    <div className={"bg-green-50 w-full h-screen flex flex-col"}>
      {nullData[page] === "school" ? (
        <div>
          <div className={"text-2xl text-center p-4 font-semibold pt-8"}>
            학교
          </div>
          <div className={"grid p-4 grid-cols-1 w-full gap-6"}>
            <button
              className={`${
                school === "충남삼성고등학교"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-4 text-xl font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
              onClick={() => controlSchool("충남삼성고등학교")}
            >
              충남삼성고등학교
            </button>
            <button
              className={
                "ring-4 ring-green-500 p-4 text-xl font-semibold rounded-xl text-green-900 hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition"
              }
              onClick={() =>
                alert("충남삼성고등학교 외 학교는 지원 예정입니다.")
              }
            >
              그 외
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {nullData[page] === "diploma" ? (
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
                diploma === "자연과학"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              자연과학
            </button>
            <button
              onClick={() => {
                controlDiploma("공학")
              }}
              className={`${
                diploma === "공학"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              공학
            </button>
            <button
              onClick={() => {
                controlDiploma("IT")
              }}
              className={`${
                diploma === "IT" ? "bg-green-500 text-white" : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              IT
            </button>
            <button
              onClick={() => {
                controlDiploma("생명과학")
              }}
              className={`${
                diploma === "생명과학"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              생명과학
            </button>
            <button
              onClick={() => {
                controlDiploma("국제인문")
              }}
              className={`${
                diploma === "국제인문"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              국제인문
            </button>
            <button
              onClick={() => {
                controlDiploma("사회과학")
              }}
              className={`${
                diploma === "사회과학"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              사회과학
            </button>
            <button
              onClick={() => {
                controlDiploma("경제경영")
              }}
              className={`${
                diploma === "경제경영"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              경제경영
            </button>
            <button
              onClick={() => {
                controlDiploma("예술체육")
              }}
              className={`${
                diploma === "예술체육"
                  ? "bg-green-500 text-white"
                  : "text-green-900"
              } ring-4 ring-green-500 p-2 text-xl font-semibold rounded-xl hover:ring-offset-2 hover:bg-green-500 hover:text-white duration-200 transition`}
            >
              예술체육
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {nullData[page] === "year" ? (
        <div>
          <div
            className={"bg-green-300 text-2xl text-center p-4 font-semibold "}
          >
            학년
          </div>
          <div className={"grid p-4 grid-cols-1 w-full gap-6"}>
            <button
              className={`${
                year === 1 ? "bg-green-500 text-white" : "text-green-900"
              } ring-4 ring-green-500 p-4 text-xl font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
              onClick={() => controlYear(1)}
            >
              1학년
            </button>
            <button
              className={`${
                year === 2 ? "bg-green-500 text-white" : "text-green-900"
              } ring-4 ring-green-500 p-4 text-xl font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
              onClick={() => controlYear(2)}
            >
              2학년
            </button>
            <button
              className={`${
                year === 3 ? "bg-green-500 text-white" : "text-green-900"
              } ring-4 ring-green-500 p-4 text-xl font-semibold rounded-xl hover:ring-offset-4 hover:bg-green-500 hover:text-white duration-200 transition`}
              onClick={() => controlYear(3)}
            >
              3학년
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className={
          "bottom-0 w-full absolute pb-4 flex justify-center items-center"
        }
      >
        <button
          className={
            "bg-green-500 w-4/5 py-4 rounded-2xl text-white font-semibold text-2xl tracking-wider hover:bg-green-600 transition duration-200 shadow-xl"
          }
          onClick={() => pageControl()}
        >
          다음
        </button>
      </div>
    </div>
  )
}
