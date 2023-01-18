import axios from "axios"
import { useSession } from "next-auth/react"
import useSWR from "swr"
const fetcher = (url, email) =>
  axios
    .post(url, {
      userEmail: email,
    })
    .then((res) => res.data)

export default function useUser() {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR(
    [session ? "/api/getUserInfo" : null, session.user.email],
    ([url, email]) => fetcher(url, email),
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
