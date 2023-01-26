import axios from "axios"
import { useSession } from "next-auth/react"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** useUser 데이터로 사용자 학교 정보 반환 */
export default function useTypes() {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR(
    session ? `/api/schools/types/${session.user.school.code}` : null,
    fetcher,
  )

  return {
    types: data,
    isLoadingTypes: isLoading,
    isErrorTypes: error,
    mutate,
  }
}
