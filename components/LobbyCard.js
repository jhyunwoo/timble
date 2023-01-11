import { TableCellsIcon, UserGroupIcon } from "@heroicons/react/24/solid"
export default function LobbyCard(props) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-xl flex flex-col group/card transition duration-200 hover:shadow-2xl  ${
        props.color ? props.color : "bg-white"
      }`}
    >
      <div className={"flex flex-col"}>
        <div className={"text-lg w-full "}>{props.subtitle}</div>
        <div className={"text-2xl font-semibold my-2  w-full "}>
          {props.title}
        </div>
      </div>
      <div className={"flex justify-end items-end mb-4 mr-4 mt-6 "}>
        {props.subtitle === "시간표" ? (
          <TableCellsIcon className={"w-10 h-10"} />
        ) : (
          ""
        )}
        {props.subtitle === "친구" ? (
          <UserGroupIcon className={"w-10 h-10"} />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
