import { useRouter } from "next/router"
import MoveBack from "../../../../../../components/MoveBack"
import ProtectedPage from "../../../../../../components/ProtectedPage"
import useGroup from "../../../../../../lib/client/useGroup"
import { useForm } from "react-hook-form"
export default function CompulsorySubjects() {
  const router = useRouter()
  const { group } = useGroup(getGroupId())
  function getGroupId() {
    let id = router.query.studentgroup
    return id
  }

  return (
    <ProtectedPage>
      <MoveBack title={group ? group.name : null} />
      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="text-xl font-semibold mx-2">필수 이수 과목 설정</div>
        <AddCompulsory year={1} />
        <AddCompulsory year={2} />
        <AddCompulsory year={3} />
      </div>
    </ProtectedPage>
  )

  function AddCompulsory(props) {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm()

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-lg font-medium">{props.year}학년 필수 이수 과목</div>
        <div></div>
      </div>
    )
  }
}
