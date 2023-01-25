import axios from "axios"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

/** 등록된 학교 리스트 반환 */
export default function useAllSchools() {
  const { data, error, isLoading, mutate } = useSWR("/api/getAllSchools", fetcher)

  if (data) {
    return {
      allSchools: data,
      isLoadingSchool: isLoading,
      isErrorSchool: error,
      mutate,
    }
  } else {
    return {
      allSchools: null,
      isLoadingSchool: isLoading,
      isErrorSchool: error,
      mutate,
    }
  }
}
