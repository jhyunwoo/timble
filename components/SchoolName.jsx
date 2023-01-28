import useSchool from "../lib/client/useSchool"

export default function SchoolName() {
  const { school } = useSchool()

  return (
    <div
      className={`w-full h-40 col-span-2 flex justify-center items-center text-2xl font-bold  rounded-xl sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-8`}
    >
      <div
        className={`text-transparent tracking-wide text-3xl font-bold bg-clip-text bg-gradient-to-r from-cnsablue-200 via-cnsablue-300 to-cnsablue-200`}
      >
        {school ? school.name : null}
      </div>
    </div>
  )
}
