import LobbyCard from "../components/LobbyCard"
import LayOut from "../components/LayOut"
import { useEffect } from "react"
import { initializeApp } from "firebase/app"

import { getMessaging, onMessage, getToken } from "firebase/messaging"
import useUser from "../lib/client/useUser"
import axios from "axios"
export default function Lobby() {
  const { user } = useUser()
  console.log(user)

  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission()
    if (permission !== "granted") return

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
    })

    const messaging = getMessaging(firebaseApp)

    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEBPUSHCERT })
      .then(async (currentToken) => {
        if (currentToken) {
          // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
          console.log(currentToken)
          await axios.put(`/api/users/message?id=${user.id}`, {
            data: {
              message: currentToken,
            },
          })
        } else {
          console.log("No registration token available. Request permission to generate one.")
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err)
      })

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload)
    })
  }

  useEffect(() => {
    onMessageFCM()
  }, [])
  return (
    <LayOut pageLocation="lobby">
      <div className={"grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
        <LobbyCard title={"시간표 구성하기"} subtitle={"시간표"} link={"/timetable/generate"} />
        <LobbyCard
          title={"친구랑 시간표 맞추기"}
          subtitle={"친구"}
          color={"bg-emerald-500 text-white"}
          link={"/timetable/matchwithfriend"}
        />
        <LobbyCard title={"디플로마 시간표 추천"} subtitle={"시간표"} link={"/timetable/advise"} />
        <LobbyCard title={"과목 정보"} subtitle={"시간표"} link={"/timetable/class"} />
        <LobbyCard title={"친구 추가"} subtitle={"친구"} link={"/friends/add"} />
      </div>
    </LayOut>
  )
}
