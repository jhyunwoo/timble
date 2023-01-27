import axios from "axios"
import { useSession } from "next-auth/react"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** session email 데이터로 사용자 데이터 반환 */
export default function useUser() {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR(session ? `/api/users/${session.user.id}` : null, fetcher)
  let nullList = []
  if (data) {
    const keys = Object.keys(data)
    keys.map((key) => {
      if (!data[key]) {
        nullList.push(key)
      }
    })
    nullList = nullList.filter((element) => element !== "admin")
    nullList = nullList.filter((element) => element !== "emailVerified")
    nullList = nullList.filter((element) => element !== "studentgroupId")
    nullList = nullList.filter((element) => element !== "diplomaId")
    nullList = nullList.filter((element) => element !== "school")
  }

  return {
    user: data,
    nullData: nullList,
    isLoadingUser: isLoading,
    isErrorUser: error,
    mutate,
  }
}
