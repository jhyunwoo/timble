import ProtectedPage from "../../../../components/ProtectedPage"
import useSchool from "../../../../lib/client/useSchool"
import useUser from "../../../../lib/client/useUser"
import { useState } from "react"
import { Tab } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function AdminStudents() {
  const { students, diplomas } = useSchool()
  const { user } = useUser()
  return (
    <ProtectedPage>
      <div className="" onClick={() => console.log(diplomas)}>
        <FliterBar />
      </div>
      <div className="grid-col-1 m-2 grid rounded-lg bg-white">
        <div className="grid grid-cols-3 rounded-t-lg bg-slate-100 py-2 text-center font-semibold">
          <div>학년</div>
          <div>이름</div>
          <div>디플로마</div>
        </div>
        {students
          ? students.map((data, key) => (
              <div
                key={key}
                className={`grid grid-cols-3 py-1 text-center last:rounded-b-lg ${
                  key % 2 === 1 ? "bg-slate-100" : ""
                }`}
              >
                <div>{data.year}</div>
                <div>{data.name}</div>
                <div>{data.diploma["name"]}</div>
              </div>
            ))
          : ""}
      </div>
    </ProtectedPage>
  )
}

function FliterBar() {
  let [categories] = useState({
    학년: [
      {
        id: 1,
        title: "1학년",
      },
      {
        id: 2,
        title: "2학년",
      },
      {
        id: 3,
        title: "3학년",
      },
    ],
    이름: [
      {
        id: 1,
        title: "검색",
      },
    ],
    디플로마: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
      },
    ],
  })

  return (
    <div className="w-full p-2  sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md",
                        "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2",
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
