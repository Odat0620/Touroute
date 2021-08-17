import { PostType } from "../posts/PostType";

export type UserType = {
  id: number;
  name: string;
  profile?: string;
  posts?: Array<PostType>;
};