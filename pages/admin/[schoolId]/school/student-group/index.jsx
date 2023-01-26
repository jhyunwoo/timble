import ProtectedPage from "../../../../../components/ProtectedPage"
import useSchool from "../../../../../lib/client/useSchool"
import MoveBack from "../../../../../components/moveBack"
import Link from "next/link"
import { DocumentPlusIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import { mutate } from "swr"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useSetRecoilState } from "recoil"
import { dataUpdateState } from "../../../../../components/recoil/states"
import axios from "axios"
import useGroups from "../../../../../lib/client/useGroups"

export default function StudentGroup() {
  const { groups } = useGroups()
  const { school } = useSchool()
  const [groupKey, setGroupKey] = useState()
  const controlUpdate = useSetRecoilState(dataUpdateState)

  const [pop, setPop] = useState(false)
  function updateData() {
    function mutateData() {
      mutate(`/api/schools/groups/${school.code}`)
    }
    setTimeout(mutateData, 2000)
  }
  return (
    <ProtectedPage>
      {pop ? <EditPopUp /> : ""}
      <MoveBack title={"학교"} link={`/admin/${school ? school.code : null}/school`} />
      <div className="p-4">
        <div className="text-2xl font-bold my-4">학생 그룹 설정</div>
        <div className="grid grid-cols-1 gap-4">
          {groups
            ? groups.map((data, key) => (
                <div
                  key={key}
                  className="flex justify-between bg-white shadow-sm p-4 rounded-lg hover:shadow-lg transition duration-200"
                >
                  <div>
                    <div className="text-lg font-medium m-2">{data.name}</div>
                    <div className="ml-2 text-base font-normal text-slate-700">입학연도: {data.entrance}</div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => {
                        setGroupKey(key)
                        setPop(true)
                      }}
                      className="bg-slate-100 p-1 hover:bg-slate-200 transition duration-200 rounded-md"
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))
            : ""}
          <Link
            href={`/admin/${school ? school.code : null}/school/student-group/add`}
            className="bg-white flex shadow-sm justify-center items-center p-4 hover:bg-slate-700 transition duration-200 rounded-lg hover:text-white"
          >
            <DocumentPlusIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </ProtectedPage>
  )
  function EditPopUp() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm()

    async function deleteGroup() {
      controlUpdate(true)
      await axios.delete(`/api/schools/groups?id=${groups[groupKey].id}`)
      setPop(false)
      updateData()
      controlUpdate(false)
    }

    const onSubmit = async (data) => {
      controlUpdate(true)
      await axios.put(`/api/schools/groups?id=${groups[groupKey].id}`, {
        data: {
          name: data.groupName,
          entrance: Number(data.groupEntrance),
        },
      })
      setPop(false)
      updateData()
      controlUpdate(false)
    }

    useEffect(() => {
      if (groups) {
        reset({
          groupName: groups[groupKey].name,
          groupEntrance: groups[groupKey].entrance,
        })
      }
    }, [reset])

    return (
      <div className="fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur-sm">
        <div className="h-3/5 w-5/6 rounded-xl bg-white p-4">
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="ml-2 text-xl font-semibold">학생 그룹 수정</div>

              <button onClick={() => setPop(null)} className={"rounded-md transition duration-150 hover:bg-slate-200"}>
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="flex h-full w-full items-center justify-center p-1">
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex h-full w-full flex-col items-center p-1">
                <div className="w-full px-1 text-sm font-semibold">학생 그룹</div>
                <input
                  {...register("groupName", { required: { value: true, message: "그룹 이름을 입력하세요" } })}
                  className="m-1 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />
                <div className="w-full px-1 text-sm font-semibold">입학연도</div>
                <input
                  type={"number"}
                  {...register("groupEntrance", {
                    required: {
                      value: true,
                      message: "입학연도를 입력해야합니다",
                    },
                    min: { value: 1900, message: "올바른 연도를 입력하세요" },
                  })}
                  className="m-1 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => deleteGroup()}
                    className="rounded-full bg-red-400 p-1 px-4 text-white transition duration-200 hover:bg-red-500"
                  >
                    삭제
                  </button>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="diplomaName"
                  render={({ message }) => (
                    <p className="m-1 rounded-full bg-red-500 p-1 px-2 text-center text-white">{message}</p>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="diplomaDescription"
                  render={({ message }) => (
                    <p className="m-1 rounded-full bg-red-500 p-1 px-2 text-center text-white">{message}</p>
                  )}
                />

                <input
                  type="submit"
                  className="absolute inset-x-0 bottom-0 mt-4 rounded-full bg-green-500 p-2 px-8 text-lg font-semibold text-white transition duration-150 hover:bg-green-600"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
