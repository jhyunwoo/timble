import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"

export default function MoveBack(props) {
  const router = useRouter()
  return (
    <div className="w-full flex justify-start items-center px-4 py-2">
      <button onClick={() => router.back()} className="flex justify-start items-center">
        <ChevronLeftIcon className="w-4 h-4" />
        <div>{props.title}</div>
      </button>
    </div>
  )
}
