import { PostType } from "../posts/PostType";

export type FollowType = {
  id: number;
  name: string;
  profile: string | undefined;
  created_at?: Date;
  avatar: {
    url: string | undefined;
    thumb: {
      url: string | undefined;
    };
  };
};

export type UserType = {
  id: number;
  name: string;
  profile?: string;
  avatar?: { url: string; thumb: { url: string } };
  posts?: Array<PostType>;
  following?: Array<FollowType>;
  followers?: Array<FollowType>;
};
