import { PostType } from "../posts/PostType";

type Follow = {
  id: number;
  name: string;
  profile: string;
  created_at: Date;
  avatar: {
    url: string;
    thumb: {
      url: string;
    };
  };
};

export type UserType = {
  id: number;
  name: string;
  profile?: string;
  avatar?: { url: string; thumb: { url: string } };
  posts?: Array<PostType>;
  following?: Array<Follow>;
  followers?: Array<Follow>;
};
