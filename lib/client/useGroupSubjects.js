import axios from "axios"
import { useSession } from "next-auth/react"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** useUser 데이터로 사용자 학교 교과목 정보 반환 */
export default function useGroupSubjects(groupId) {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR(
    session ? `/api/schools/subjects/${session.user.school.code}/group?id=${groupId}` : null,
    fetcher,
  )

  return {
    groupSubjects: data,
    isLoadingSubjects: isLoading,
    isErrorSubjects: error,
    mutate,
  }
}
