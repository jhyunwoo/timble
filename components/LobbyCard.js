import { TableCellsIcon, UserGroupIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function LobbyCard(props) {
  return (
    <Link href={props.link}>
      <div
        className={`group/card flex flex-col rounded-2xl p-6 shadow-xl transition duration-200 hover:shadow-2xl  ${
          props.color ? props.color : "bg-white"
        }`}
      >
        <div className={"flex flex-col"}>
          <div className={"w-full text-lg "}>{props.subtitle}</div>
          <div className={"my-2 w-full text-2xl  font-semibold "}>
            {props.title}
          </div>
        </div>
        <div className={"mb-4 mr-4 mt-6 flex items-end justify-end "}>
          {props.subtitle === "시간표" ? (
            <TableCellsIcon className={"h-10 w-10"} />
          ) : (
            ""
          )}
          {props.subtitle === "친구" ? (
            <UserGroupIcon className={"h-10 w-10"} />
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  )
}
