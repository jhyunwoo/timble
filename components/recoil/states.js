import { atom } from "recoil"
import { v1 } from "uuid"

export const dataUpdateState = atom({
  key: `dataUpdateState${v1()}`,
  default: false,
})
