import { atom, selector } from "recoil"
import axios from "axios"

export const emailState = atom({
  key: "emailState",
  default: "",
})

export const sessionState = atom({
  key: "sessionState",
  default: {},
})

export const userState = selector({
  key: "userState",
  get: ({ get }) => {
    if (get(emailState) !== "") {
      const userData = axios
        .post("/api/getUserInfo", {
          userEmail: get(emailState),
        })
        .then((response) => {
          return response.data
        })
        .catch((error) => console.log(error))

      return userData
    }
    return
  },
})

export const userNullState = selector({
  key: "userNullState",
  get: ({ get }) => {
    if (get(userState) && get(sessionState)) {
      const userInfo = get(userState)
      const keys = Object.keys(userInfo)
      let nullData = []
      keys.map((key) => {
        if (!userInfo[key]) {
          nullData.push(key)
        }
      })
      // nullData = nullData.filter((element) => element !== "emailVerified")
      // nullData = nullData.filter((element) => element !== "admin")
      return nullData
    }
    // if (get(sessionState)) {
    //   const user = get(sessionState).user
    //   const userInfo = user[0]
    //   const keys = Object.keys(userInfo)
    //   let nullData = []
    //   keys.map((key) => {
    //     if (!userInfo[key]) {
    //       nullData.push(key)
    //     }
    //   })
    //   // nullData = nullData.filter((element) => element !== "emailVerified")
    //   // nullData = nullData.filter((element) => element !== "admin")
    //   return nullData
    // }
    // if (get(sessionState)) {
    //   const userData = get(sessionState)
    //   const user = userData.user

    //   return user
    // }
  },
})
