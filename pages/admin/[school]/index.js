import { useRouter } from "next/router"

export default function SchoolAdmin() {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div>{router.asPath.replace("/admin/", "")}</div>
    </div>
  )
}
