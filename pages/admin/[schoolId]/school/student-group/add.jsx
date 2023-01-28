import MoveBack from "../../../../../components/MoveBack"
import ProtectedPage from "../../../../../components/ProtectedPage"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import axios from "axios"
import useSchool from "../../../../../lib/client/useSchool"
import { useRouter } from "next/router"

export default function StudentGroupAdd() {
  const { school } = useSchool()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    await axios.post(`/api/schools/groups`, {
      data: {
        name: data.groupName,
        entrance: Number(data.groupEntrance),
        code: school.code,
      },
    })
    router.push(`/admin/${school ? school.code : null}/school/student-group`)
  }
  return (
    <ProtectedPage>
      <MoveBack title={"학생 그룹"} />
      <div className="p-4">
        <div className="text-xl font-semibold m-2">학생 그룹 추가</div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col p-2 bg-white rounded-lg">
            <div>그룹 이름</div>
            <input
              className="bg-slate-50 p-1 rounded-md"
              {...register("groupName", { required: { value: true, message: "그룹 이름을 입력하세요" } })}
            />
            <ErrorMessage
              errors={errors}
              name="groupName"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 rounded-full text-center m-2 mx-4">{message}</p>
              )}
            />
            <div>학생 입학 연도</div>
            <input
              className="bg-slate-50 p-1 rounded-md"
              type={"number"}
              {...register("groupEntrance", {
                required: {
                  value: true,
                  message: "입학연도를 입력해야합니다",
                },
                min: { value: 1900, message: "올바른 연도를 입력하세요" },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="groupEntrance"
              render={({ message }) => (
                <p className="bg-red-500 text-white p-1 rounded-full text-center m-2 mx-4">{message}</p>
              )}
            />
            <input
              type="submit"
              className="bg-green-500 text-white p-2 hover:bg-green-600 transition duration-200 rounded-full m-4"
            />
          </form>
        </div>
      </div>
    </ProtectedPage>
  )
}
