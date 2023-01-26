import axios from "axios"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** useUser 데이터로 사용자 학교 정보 반환 */
export default function useGroup(groupId) {
  const { data, error, isLoading, mutate } = useSWR(`/api/schools/groups?id=${groupId}`, fetcher)

  return {
    group: data,
    isLoadingGroup: isLoading,
    isErrorGroup: error,
    mutate,
  }
}
