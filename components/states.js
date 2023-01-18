import { atom, selector } from "recoil"
import axios from "axios"

export const sessionState = atom({
  key: "sessionState",
  default: null,
})

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    if (get(sessionState)) {
      const data = get(sessionState)
      const user = data.user
      return user
    }
  },
})

export const emailSelector = selector({
  key: "emailSelector",
  get: ({ get }) => {
    if (get(userSelector)) {
      const userData = get(userSelector)
      const email = userData.email
      return email
    }
  },
})

export const adminSelector = selector({
  key: "adminSelector",
  get: ({ get }) => {
    if (get(userInfoSelector)) {
      const userData = get(userInfoSelector)
      const admin = userData.admin
      return admin
    }
  },
})

export const userInfoSelector = selector({
  key: "userInfoSelector",
  get: ({ get }) => {
    if (get(emailSelector) && get(sessionState)) {
      const userData = axios
        .post("/api/getUserInfo", {
          userEmail: get(emailSelector),
        })
        .then((response) => {
          return response.data
        })
        .catch((error) => console.log(error))

      return userData
    }
  },
})

export const userNullSelector = selector({
  key: "userNullSelector",
  get: ({ get }) => {
    if (get(userSelector)) {
      const userInfo = get(userInfoSelector)
      const keys = Object.keys(userInfo)
      let nullData = []
      keys.map((key) => {
        if (!userInfo[key]) {
          nullData.push(key)
        }
      })
      nullData = nullData.filter((element) => element !== "emailVerified")
      nullData = nullData.filter((element) => element !== "admin")
      return nullData
    }
  },
})
