import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useSWRConfig } from "swr"

import useUser from "../../lib/client/useUser"
import Loading from "../../components/Loading"
import useSchools from "../../lib/client/useSchools"
import useGroups from "../../lib/client/useGroups"
import useDiplomas from "../../lib/client/useDiplomas"
import { mutate } from "swr"

export default function Userinfo() {
  // router 설정
  const router = useRouter()

  // 사용자 로그인 정보 가져오기
  const { data: session } = useSession()
  const { schools } = useSchools()
  const { groups } = useGroups()
  const { diplomas } = useDiplomas()
  const [school, setSchool] = useState(null)
  const [diploma, setDiploma] = useState(null)
  const [group, setGroup] = useState(null)
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
    putUserName(data.name)
  }

  // school control
  function controlSchool(value) {
    console.log(value)
    if (school !== value) {
      setSchool(value)
      setWarn(false)
    } else {
      setSchool(null)
    }
    console.log(school)
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

  // group control
  function controlGroup(value) {
    if (group === 0 || group !== value) {
      setGroup(value)
      setWarn(false)
    } else {
      setGroup(null)
    }
  }
  function updateData() {
    window.location.reload()
  }
  // 사용자 데이터 서버에 수정
  async function putUserSchool(data) {
    setLoading(true)
    await axios.put(`/api/users/school?id=${session.user.id}`, {
      data,
    })
    setLoading(false)
    updateData()
  }
  async function putUserDiploma(data) {
    setLoading(true)
    await axios.put(`/api/users/diploma?id=${session.user.id}`, {
      data,
    })
    setLoading(false)
    updateData()
  }
  async function putUserGroup(data) {
    setLoading(true)
    await axios.put(`/api/users/group?id=${session.user.id}`, {
      data,
    })
    setLoading(false)
    updateData()
  }
  async function putUserName(data) {
    setLoading(true)
    await axios.put(`/api/users/name?id=${session.user.id}`, {
      data,
    })
    setLoading(false)
    updateData()
  }

  // nullData에서 다음 클릭시 다음장으로 이동
  function pageControl() {
    if (nullData[0] === "schoolId") {
      if (school === null) {
        setWarn(true)
      } else {
        putUserSchool(school)
        setWarn(false)
      }
    } else if (nullData[0] === "diploma") {
      if (diploma === null) {
        setWarn(true)
      } else {
        putUserDiploma(diploma)
        setWarn(false)
      }
    } else if (nullData[0] === "studentgroup") {
      if (group === null) {
        setWarn(true)
      } else {
        putUserGroup(group)
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
        {nullData[0] === "studentgroup" ? <GroupForm /> : ""}
        {nullData[0] === "diploma" ? <DiplomaForm /> : ""}
        {nullData[0] === "name" ? <NameForm /> : ""}
        {warn ? (
          <div className={"m-4 flex animate-pulse items-center justify-center rounded-xl bg-red-400 p-4"}>
            <div className={"text-lg font-semibold text-white"}>
              {nullData[0] === "school" ? "학교를" : null}
              {nullData[0] === "diploma" ? "디플로마를" : null}
              {nullData[0] === "studentgroup" ? "학생 그룹을" : null} 선택해주세요
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
          {schools
            ? schools.map((data, key) => (
                <button
                  key={key}
                  className={`${
                    school === data.code ? "bg-green-500 text-white" : ""
                  }   rounded-xl p-4 text-xl font-semibold shadow-lg transition duration-200 hover:ring-offset-4`}
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

  function GroupForm() {
    return (
      <div>
        <div className={" p-4 text-center text-2xl font-semibold "}>학생 그룹</div>
        <div className={"grid w-full grid-cols-1 gap-6 p-4"}>
          {groups
            ? groups.map((data, key) => (
                <button
                  key={key}
                  className={`${
                    group === data.id ? "bg-green-500 text-white" : ""
                  }   rounded-xl p-4 text-xl font-semibold shadow-lg transition duration-200 hover:ring-offset-4`}
                  onClick={() => controlGroup(data.id)}
                >
                  {data.name}
                </button>
              ))
            : ""}
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
