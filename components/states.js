import axios from "axios"
import { selector, selectorFamily } from "recoil"

export const userInfo = selectorFamily({
  key: "userState",
  get: (userEmail) => async () => {
    if (!userEmail) return ""
    const { data } = await axios.post("/api/getUserInfo")
    return data
  },
})
