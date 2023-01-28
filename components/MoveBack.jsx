import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function MoveBack(props) {
  return (
    <div className="w-full flex justify-start items-center px-4 py-2">
      <Link href={props.link} className="flex justify-start items-center">
        <ChevronLeftIcon className="w-4 h-4" />
        <div>{props.title}</div>
      </Link>
    </div>
  )
}
