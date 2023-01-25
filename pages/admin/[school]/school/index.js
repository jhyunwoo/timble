import ProtectedPage from "../../../../components/ProtectedPage"
import useUser from "../../../../lib/client/useUser"
import Link from "next/link"
import useSchool from "../../../../lib/client/useSchool"
import { useEffect, useState } from "react"

export default function AdminTimetable() {
  const { user } = useUser()
  const { school, color } = useSchool()
  const [schoolColor, setSchoolColor] = useState("#0ea5e9")
  useEffect(() => {
    if (color) {
      setSchoolColor(color)
    }
  }, [color])
  return (
    <ProtectedPage>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {color ? (
          <div className={`bg-[${schoolColor}] col-span-2 rounded-lg p-4 text-center text-white font-bold text-2xl`}>
            <div>{school}</div>
          </div>
        ) : (
          <div className={`bg-sky-500 col-span-2 rounded-lg p-4 text-center text-white font-bold text-2xl`}>
            <div>{school}</div>
          </div>
        )}
        <Link href={`/admin/${user ? user.admin : null}/school/diploma`}>
          <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
            <div className="text-xl font-semibold">디플로마</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/subjects`}>
          <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
            <div className="text-xl font-semibold">교과목</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/types`}>
          <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
            <div className="text-xl font-semibold">교과 종류</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/areas`}>
          <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
            <div className="text-xl font-semibold">교과 영역</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/difficulties`}>
          <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
            <div className="text-xl font-semibold">교과 난이도</div>
          </div>
        </Link>
        <Link href={`/admin/${user ? user.admin : null}/school/info`}>
          <div className="bg-white shadow-sm py-6 p-4 rounded-lg hover:shadow-lg transition duration-200 text-left">
            <div className="text-xl font-semibold">학교 기본 정보</div>
          </div>
        </Link>
      </div>
    </ProtectedPage>
  )
}
