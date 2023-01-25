import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import { PencilSquareIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ErrorMessage } from "@hookform/error-message"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import axios from "axios"
import useUser from "../../../../lib/client/useUser"
import { mutate } from "swr"
import { useSetRecoilState } from "recoil"
import { dataUpdateState } from "../../../../components/recoil/states"
import MoveBack from "../../../../components/moveBack"

export default function AdminSubjectTypes() {
  const [pop, setPop] = useState()
  const [typeId, setTypeId] = useState(0)
  const { id, code, subjectTypes } = useSchool()
  const { user } = useUser()
  const controlUpdate = useSetRecoilState(dataUpdateState)

  function updateData() {
    function mutateData() {
      mutate(["/api/getSchool", user ? user.schoolId : null])
    }
    setTimeout(mutateData, 2000)
  }

  return (
    <ProtectedPage>
      {pop === "edit" ? <EditPopUp /> : ""}
      {pop === "add" ? <AddPopUp /> : ""}
      <div className="flex h-full w-full flex-col items-center">
        <MoveBack title={"학교"} link={`/admin/${code}/school`} />
        <div className="w-full px-6 text-left text-2xl font-semibold">교과 종류</div>
        {subjectTypes ? (
          <div className="grid w-full grid-cols-1 gap-4 p-4">
            {subjectTypes.map((data, key) => (
              <div
                key={key}
                className="flex w-full justify-between rounded-lg bg-white pr-4 shadow-sm transition duration-200 hover:shadow-xl"
              >
                <div className="  py-4 pl-4 pr-2">
                  <div className="text-lg font-bold">{data.name}</div>
                </div>
                <div className=" flex items-center justify-center ">
                  <button
                    onClick={() => {
                      setPop("edit")
                      setTypeId(key)
                    }}
                    className="h-8 w-8 rounded-md bg-slate-100 p-1 transition duration-150 hover:bg-slate-200"
                  >
                    <PencilSquareIcon className="h-full w-full" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setPop("add")}
              className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-center shadow-lg transition duration-200 hover:bg-slate-700 hover:text-white hover:shadow-xl"
            >
              <SquaresPlusIcon className="h-8 w-8" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </ProtectedPage>
  )

  function EditPopUp() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()

    const onSubmit = (data) => {
      controlUpdate(true)
      postArea("adminSubjectTypeUpdate", subjectTypes[typeId].id, {
        typeName: data.typeName,
      })
      setPop(false)
      updateData()
      controlUpdate(false)
    }

    async function postArea(postData, idData, data) {
      await axios.post("/api/adminPost", {
        post: postData,
        dataId: idData,
        data: data,
      })
    }

    useEffect(() => {
      if (subjectTypes) {
        setValue("typeName", subjectTypes[typeId].name)
      }
    }, [setValue])

    return (
      <div className="fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur-sm">
        <div className="h-3/5 w-5/6 rounded-xl bg-white p-4">
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="ml-2 text-xl font-semibold">교과 종류 수정</div>

              <button onClick={() => setPop(null)} className={"rounded-md transition duration-150 hover:bg-slate-200"}>
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="flex h-full w-full items-center justify-center p-1">
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex h-full w-full flex-col items-center p-1">
                <div className="w-full px-1 text-sm font-semibold">교과 종류</div>
                <input
                  {...register("typeName", {
                    required: {
                      value: true,
                      message: "교과 종류를 입력하세요",
                    },
                  })}
                  className="m-1 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />

                <div className="mt-1">
                  <button
                    onClick={() => postArea("adminSubjectTypeDelete", subjectTypes[typeId].id, "delete")}
                    className="rounded-full bg-red-400 p-1 px-4 text-white transition duration-200 hover:bg-red-500"
                  >
                    삭제
                  </button>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="typeName"
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

  function AddPopUp() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
      controlUpdate(true)
      postArea("adminSubjectTypeCreate", {
        typeName: data.typeName,
        schoolId: id,
      })
      setPop(false)
      updateData()
      controlUpdate(false)
    }

    async function postArea(postData, data) {
      await axios.post("/api/adminPost", {
        post: postData,
        data: data,
      })
    }

    return (
      <div className="fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur-sm">
        <div className="h-3/5 w-5/6 rounded-xl bg-white p-4">
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="ml-2 text-xl font-semibold">교과 종류 추가</div>
              <button onClick={() => setPop(null)} className={"rounded-md transition duration-150 hover:bg-slate-200"}>
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="flex h-full w-full items-center justify-center  p-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative flex h-full w-full flex-col items-center   p-1"
              >
                <div className="w-full  px-1 text-sm font-semibold">교과 종류</div>
                <input
                  {...register("typeName", {
                    required: {
                      value: true,
                      message: "교과 종류를 입력하세요",
                    },
                  })}
                  className="m-1 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />

                <ErrorMessage
                  errors={errors}
                  name="typeName"
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
