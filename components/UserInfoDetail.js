export default function UserInfoDetail(porps) {
  return (
    <div className="mb-2">
      <div className="text-xl font-semibold">{porps.title}</div>
      <div className="text-lg">{porps.content}</div>
    </div>
  )
}
