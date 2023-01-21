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
export default function useStudents() {
  const { user } = useUser()
  const { data, error, isLoading, mutate } = useSWR(
    [user ? "/api/getStudents" : null, user ? user.schoolId : null],
    ([url, id]) => fetcher(url, id),
  )

  if (data) {
    return {
      students: data,
      isLoadingSchool: isLoading,
      isErrorSchool: error,
      mutate,
    }
  } else {
    return {
      students: null,
      isLoadingSchool: isLoading,
      isErrorSchool: error,
      mutate,
    }
  }
}
