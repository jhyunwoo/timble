import axios from "axios"
import useSWR from "swr"
import { dataUpdateState } from "../../components/recoil/states"
import { useSetRecoilState } from "recoil"
const fetcher = (url, id) =>
  axios
    .post(url, {
      subjectId: id,
    })
    .then((res) => res.data)

/** subjectId로 교과목 정보 반환 */
export default function useSubject(subjectId) {
  const { data, error, isLoading, mutate } = useSWR(
    [subjectId ? "/api/getSubject" : null, subjectId ? subjectId : null],
    ([url, id]) => fetcher(url, id),
  )
  const controlLoading = useSetRecoilState(dataUpdateState)
  controlLoading(isLoading)
  if (data) {
    return {
      subject: data,
      isLoadingSubject: isLoading,
      isErrorSubject: error,
      mutate,
    }
  } else {
    return {
      subject: null,
      isLoadingSubject: isLoading,
      isErrorSubject: error,
      mutate,
    }
  }
}
