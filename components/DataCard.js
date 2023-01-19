import Link from "next/link"

export default function DataCard(props) {
  return (
    <Link href={props.link}>
      <div className="flex flex-col rounded-xl bg-white p-4 shadow-lg transition duration-200 hover:shadow-xl">
        <div className="text-base">{props.title}</div>
        <div className="mx-4 text-right text-2xl font-bold">
          {props.children}
        </div>
      </div>
    </Link>
  )
}
