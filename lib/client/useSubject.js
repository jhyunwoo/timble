import axios from "axios"
import useSWR from "swr"
const fetcher = (url) => axios.get(url).then((res) => res.data)

/** subjectId로 교과목 정보 반환 */
export default function useSubject(subjectId) {
  const { data, error, isLoading, mutate } = useSWR(`/api/schools/subjects?id=${subjectId}`, fetcher)
  return {
    subject: data,
    isLoadingSubject: isLoading,
    isErrorSubject: error,
    mutate,
  }
}
