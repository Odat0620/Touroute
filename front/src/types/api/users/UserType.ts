import { PostType } from "../posts/PostType";

export type UserType = {
  id: number;
  name: string;
  profile?: string;
  avatar?: { url: string };
  posts?: Array<PostType>;
  following?: Array<any>;
  followers?: Array<any>;
};
