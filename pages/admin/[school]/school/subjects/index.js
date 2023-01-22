import Loading from '../../../../../components/Loading'
import ProtectedPage from '../../../../../components/ProtectedPage'
import useSubjects from '../../../../../lib/client/useSubjects'
import useUser from '../../../../../lib/client/useUser'
import { PencilSquareIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useGetRecoilValueInfo_UNSTABLE } from 'recoil'

export default function AdminSubjects() {
  const { subjects } = useSubjects()
  const { user } = useUser()
  const [pop, setPop] = useState()

  return (
    <ProtectedPage>
      {pop ? <EditPopUp /> : ''}
      {subjects ? (
        <div className={'grid grid-cols-1 p-4 gap-4'}>
          {subjects.map((data, key) => (
            <div
              key={key}
              className="bg-white hover:bg-slate-800 group hover:text-white shadow-lg rounded-lg flex justify-between hover:shadow-xl transition duration-200"
            >
              <Link className="w-full p-4" href={`/admin/${user ? user.admin : null}/school/subjects/${data.id}`}>
                <div>
                  <div className="text-sm font-normal text-slate-500 group-hover:text-slate-200 transition duration-1000">
                    {data.diploma.name}
                  </div>
                  <div className="text-xl mt-1 font-semibold text-slate-900 group-hover:text-slate-50 transition duration-200">
                    {data.title}
                  </div>
                </div>
              </Link>

              <div className="flex justify-center items-center mr-4">
                <button
                  onClick={() => setPop(true)}
                  className="bg-slate-200 hover:bg-slate-300 transition duration-200 p-1 rounded-lg"
                >
                  <PencilSquareIcon className="w-6 h-6 text-slate-800" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </ProtectedPage>
  )
  function EditPopUp() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm({
      values: {
        subjectOpen: [],
      },
    })
    const [subjectOpen, setSubjectOpen] = useState([])

    const onSubmit = (data) => {
      console.log(data)
      // setPop(false)
    }

    function controlSubjectOpen(open) {
      let openArray = subjectOpen
      if (openArray.includes(open)) {
        openArray = openArray.filter((item) => item !== open)
      } else {
        openArray.push(open)
      }
      setSubjectOpen(openArray)
      register('subjectOpen', { value: openArray })
      console.log(subjectOpen)
    }

    function isInclude(semi) {
      if (getValues('subjectOpen')) {
        if (getValues('subjectOpen').includes(semi)) {
          return true
        }
      }
    }
    return (
      <div className="fixed top-0 right-0 left-0 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur-sm">
        <div className="h-3/5 w-5/6 rounded-xl bg-white p-4">
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="ml-2 text-xl font-semibold">교과목 수정</div>

              <button onClick={() => setPop(false)} className={'rounded-md transition duration-150 hover:bg-slate-200'}>
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="flex h-full w-full items-center justify-center p-1">
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex h-full w-full flex-col items-center p-1">
                <div className="w-full px-1 text-sm font-semibold">교과목</div>
                <input
                  {...register('subjectName', {
                    required: {
                      value: true,
                      message: '교과목을 입력하세요',
                    },
                  })}
                  className="m-1 w-full rounded-md bg-slate-100 p-1 text-lg font-medium"
                />
                <div className="w-full px-1 text-sm font-semibold">교과목 개설 학기</div>
                <div className="grid grid-cols-2 gap-2 p-1">
                  <button
                    type="button"
                    onClick={() => controlSubjectOpen('1-1')}
                    className={`${
                      isInclude('1-1') ? 'bg-slate-800 text-white' : 'bg-slate-50'
                    }  rounded-lg shadow-sm transition duration-200 p-1`}
                  >
                    1학년 1학기
                  </button>
                  <button
                    type="button"
                    onClick={() => controlSubjectOpen('1-2')}
                    className={`${
                      subjectOpen.includes('1-2') ? 'bg-slate-800 text-white' : 'bg-slate-50'
                    }  rounded-lg shadow-sm transition duration-200 p-1`}
                  >
                    1학년 2학기
                  </button>
                  <button
                    type="button"
                    onClick={() => controlSubjectOpen('2-1')}
                    className={`${
                      subjectOpen.includes('2-1') ? 'bg-slate-800 text-white' : 'bg-slate-50'
                    }  rounded-lg shadow-sm transition duration-200 p-1`}
                  >
                    2학년 1학기
                  </button>
                  <button
                    type="button"
                    onClick={() => controlSubjectOpen('2-2')}
                    className={`${
                      subjectOpen.includes('2-2') ? 'bg-slate-800 text-white' : 'bg-slate-50'
                    }  rounded-lg shadow-sm transition duration-200 p-1`}
                  >
                    2학년 2학기
                  </button>
                  <button
                    type="button"
                    onClick={() => controlSubjectOpen('3-1')}
                    className={`${
                      subjectOpen.includes('3-1') ? 'bg-slate-800 text-white' : 'bg-slate-50'
                    }  rounded-lg shadow-sm transition duration-200 p-1`}
                  >
                    3학년 1학기
                  </button>
                  <button
                    type="button"
                    onClick={() => controlSubjectOpen('3-2')}
                    className={`${
                      subjectOpen.includes('3-2') ? 'bg-slate-800 text-white' : 'bg-slate-50'
                    }  rounded-lg shadow-sm transition duration-200 p-1`}
                  >
                    3학년 2학기
                  </button>
                </div>
                <div className="mt-1">
                  <button className="rounded-full bg-red-400 p-1 px-4 text-white transition duration-200 hover:bg-red-500">
                    삭제
                  </button>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="diplomaName"
                  render={({ message }) => (
                    <p className="m-1 rounded-full bg-red-500 p-1 px-2 text-center text-white">{message}</p>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="diplomaDescription"
                  render={({ message }) => (
                    <p className="m-1 rounded-full bg-red-500 p-1 px-2 text-center text-white">{message}</p>
                  )}
                />

                <button
                  type="submit"
                  className="absolute inset-x-0 bottom-0 mt-4 rounded-full bg-green-500 p-2 px-8 text-lg font-semibold text-white transition duration-150 hover:bg-green-600"
                >
                  제출
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
