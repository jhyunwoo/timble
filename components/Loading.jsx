import { WaveTopBottomLoading } from "react-loadingg"

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100/50 absolute top-0 right-0 left-0 transition">
      <WaveTopBottomLoading color="#22c55e" />
    </div>
  )
}
