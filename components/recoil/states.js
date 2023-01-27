import { atom } from "recoil"

export const schoolCodeState = atom({
  key: "schoolCodeState",
  default: null,
})

export const loadingState = atom({
  key: "loadingState",
  default: false,
})

export const userState = atom({
  key: "userState",
  default: {},
})
