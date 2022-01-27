import { atom } from "recoil";

import { EditPostType } from "../types/api/posts/PostType";

export const EditPostState = atom<EditPostType>({
  key: "post/edit",
  default: {
    id: null,
    title: "",
    text: "",
    route: {
      origin: {
        lat: null,
        lng: null,
      },
      destination: {
        lat: null,
        lng: null,
      },
    },
    userId: null,
    prefecture: undefined,
    image: {
      url: "",
      thumb: {
        url: "",
      },
    },
  },
});
