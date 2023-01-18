import { useRouter } from "next/router"
import { useEffect } from "react"

/** 사용자 데이터 중 입력되지 않은 값이 있을 경우 정보 입력창으로 redirect */
export default function useCheckUserNull(nullData) {
  const router = useRouter()
  useEffect(() => {
    if (nullData) {
      if (nullData.length >= 1) {
        router.push("/user/addinfo").then()
      }
    }
  }, [nullData, router])
}
