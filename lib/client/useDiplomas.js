import axios from "axios"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import useSchool from "./useSchool"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** useUser 데이터로 사용자 학교 정보 반환 */
export default function useDiplomas() {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR(
    session ? (session.user.school ? `/api/schools/diplomas/${session.user.school.code}` : null) : null,
    fetcher,
  )

  return {
    diplomas: data,
    isLoadingdiplomas: isLoading,
    isErrordiplomas: error,
    mutate,
  }
}
