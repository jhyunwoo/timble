import axios from "axios"
import { atom, selector } from "recoil"

export const emailState = atom({
  key: "emailState",
  default: "",
})

export const userState = selector({
  key: "userState",
  get: async ({ get }) => {
    try {
      const { data } = await axios.post("/api/getUserInfo", {
        userEmail: get(emailState),
      })
      return data
    } catch (err) {
      throw err
    }
  },
})
