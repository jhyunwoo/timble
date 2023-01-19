import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import {
  PencilSquareIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import axios from "axios"
import useUser from "../../../../lib/client/useUser"
import { mutate } from "swr"

export default function AdminDiploma() {
  const [pop, setPop] = useState(false)
  const [diplomaId, setDiplomaId] = useState(0)
  const { diplomas } = useSchool()
  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    postDiploma("adminDiplomaUpdate", diplomas[diplomaId].id, {
      diplomaName: data.diplomaName,
      diplomaDescription: data.diplomaDescription,
    })
    setPop(false)
    mutate(["/api/getSchool", user ? user.schoolId : null])
  }

  async function postDiploma(postData, idData, data) {
    await axios.post("/api/adminPost", {
      post: postData,
      dataId: idData,
      data: data,
    })
  }

  useEffect(() => {
    if (diplomas) {
      reset({
        diplomaName: diplomas[diplomaId].name,
        diplomaDescription: diplomas[diplomaId].description,
      })
    }
  }, [diplomas, diplomaId])

  useEffect(() => {
    mutate(["/api/getSchool", user ? user.schoolId : null])
  }, [pop])

  return (
    <ProtectedPage>
      {pop ? <PopUp /> : ""}
      <div className="flex h-full w-full justify-center p-2">
        <div className="w-full rounded-lg shadow-lg">
          <table className="w-full table-fixed rounded-lg bg-slate-50">
            <thead className="">
              <tr className=" ">
                <th className="w-1/5 rounded-tl-lg border-r-2 border-slate-200 bg-slate-200">
                  디플로마
                </th>
                <th className="w-3/5 border-x-2 border-slate-200 bg-slate-200">
                  설명
                </th>
                <th className="w-1/5 rounded-tr-lg border-l-2 border-slate-200 bg-slate-200">
                  수정
                </th>
              </tr>
            </thead>
            <tbody>
              {diplomas
                ? diplomas.map((data, key) => (
                    <tr
                      key={key}
                      className={`${key % 2 === 1 ? "bg-slate-100" : ""}`}
                    >
                      <td className="border-r-2 border-slate-200 text-center">
                        {data.name}
                      </td>
                      <td className="border-x-2 border-slate-200 pl-2">
                        {data.description}
                      </td>
                      <td className="border-l-2 border-slate-200">
                        <button
                          className="flex h-full w-full items-center justify-center"
                          onClick={() => {
                            setPop("edit")
                            setDiplomaId(key)
                          }}
                        >
                          <PencilSquareIcon className="mx-auto h-full max-h-6 rounded-md p-[2px] text-slate-900 transition duration-150 hover:bg-slate-400/50 " />
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
          <div className="flex w-full justify-center p-2">
            <button
              onClick={() => setPop("add")}
              className="rounded-md bg-slate-100 p-1 transition duration-150 hover:bg-slate-800 hover:text-white"
            >
              <SquaresPlusIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )

  function PopUp() {
    return (
      <div className="fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur-sm">
        <div className="h-3/5 w-4/5 rounded-xl bg-white p-4">
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">
                {pop === "add" ? "디플로마 추가" : "디플로마 수정"}
              </div>
              <button
                onClick={() => setPop(null)}
                className={
                  "rounded-md transition duration-150 hover:bg-slate-200"
                }
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="flex h-full w-full items-center justify-center  p-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex h-full w-full flex-col items-center justify-center  p-1"
              >
                <div className="w-full px-1 text-sm font-semibold">
                  디플로마
                </div>
                <input
                  {...register("diplomaName")}
                  className="m-1 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />
                <div className="w-full px-1 text-sm font-semibold">설명</div>
                <textarea
                  {...register("diplomaDescription")}
                  className="m-1 h-2/5 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />

                <input
                  type="submit"
                  className="mt-4 rounded-full bg-green-500 p-2 px-8 text-lg font-semibold text-white transition duration-150 hover:bg-green-600"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
