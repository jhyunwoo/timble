import axios from "axios"
import useSWR from "swr"

const fetcher = (url, id) =>
  axios
    .post(url, {
      groupId: id,
    })
    .then((res) => res.data)

/** useUser 데이터로 사용자 학교 정보 반환 */
export default function useGroup(groupId) {
  const { data, error, isLoading, mutate } = useSWR(["/api/getGroup", groupId], ([url, id]) => fetcher(url, id))

  if (data) {
    return {
      groupData: data,
      isLoadingGroup: isLoading,
      isErrorGroup: error,
      mutate,
    }
  } else {
    return {
      groupData: null,
      isLoadingGroup: isLoading,
      isErrorGroup: error,
      mutate,
    }
  }
}
