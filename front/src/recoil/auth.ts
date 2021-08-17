import { atom } from "recoil";

import { currentUserType } from "../types/currentUserType";

export const signInUserState = atom<currentUserType>({
  key: "auth/signIn",
  default: {
    id: null,
    email: "",
    name: "",
    profile: "",
    uid: "",
  },
});
