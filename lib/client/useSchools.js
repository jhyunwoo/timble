import axios from "axios"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** 등록된 학교 리스트 반환 */
export default function useSchools() {
  const { data, error, isLoading, mutate } = useSWR("/api/schools", fetcher)

  return {
    schools: data,
    isLoadingSchools: isLoading,
    isErrorSchools: error,
    mutate,
  }
}
