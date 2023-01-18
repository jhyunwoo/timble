import axios from "axios"
import { useSession } from "next-auth/react"
import useSWR from "swr"
const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useUser() {
  const session = useSession()
  const { data, error, isLoading, mutate } = useSWR(
    () => "/api/getUserInfo?userEmail=" + session.data.user.email,
    fetcher,
  )
  let nullList = []
  if (data) {
    const keys = Object.keys(data)

    keys.map((key) => {
      if (!data[key]) {
        nullList.push(key)
      }
    })
    nullList = nullList.filter((element) => element !== "admin")
  }
  return {
    user: data,
    isLoading,
    isError: error,
    nullData: nullList,
    mutate,
  }
}
