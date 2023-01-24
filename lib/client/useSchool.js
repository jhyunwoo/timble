import axios from "axios"
import useSWR from "swr"
import useUser from "./useUser"

const fetcher = (url, id) =>
  axios
    .post(url, {
      schoolId: id,
    })
    .then((res) => res.data)

/** useUser 데이터로 사용자 학교 정보 반환 */
export default function useSchool() {
  const { user } = useUser()
  const { data, error, isLoading, mutate } = useSWR(
    [user ? "/api/getSchool" : null, user ? user.schoolId : null],
    ([url, id]) => fetcher(url, id),
  )

  if (data) {
    return {
      id: data.id,
      code: data.code,
      school: data.name,
      color: data.color,
      subjects: data.subjects,
      diplomas: data.diplomas,
      subjectTypes: data.subjectType,
      subjectAreas: data.subjectArea,
      difficulties: data.difficulty,
      isLoadingSchool: isLoading,
      isErrorSchool: error,
      mutate,
    }
  } else {
    return {
      id: null,
      code: null,
      school: null,
      color: null,
      subjects: null,
      diplomas: null,
      isLoadingSchool: isLoading,
      isErrorSchool: error,
      mutate,
    }
  }
}
