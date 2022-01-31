import { CommentType } from "./CommentType";
import { latLngType } from "./latLngType";

export type PostType = {
  id: number;
  title: string;
  text: string;
  route: {
    origin: latLngType;
    destination: latLngType;
  };
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  prefecture: Array<number> | undefined;
  image: { url?: string; thumb?: { url?: string } };
  user: {
    name: string;
    uid?: string;
    avatar: { url?: string | undefined; thumb?: { url?: string | undefined } };
  };
  comments: Array<CommentType>;
  likes: Array<{ userId: number }>;
};

export type PostCardType = {
  id: number;
  title: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  prefecture: Array<number> | undefined;
  image: { url?: string; thumb?: { url?: string } };
  user: {
    name: string;
    uid?: string;
    avatar: { url?: string | undefined; thumb: { url?: string | undefined } };
  };
  comments: Array<any>;
  likes: Array<{ userId: number }>;
};

export type EditPostType = {
  id: number | null;
  title: string;
  text: string;
  route: {
    origin: latLngType;
    destination: latLngType;
  };
  userId: number | null;
  prefecture: Array<number> | undefined;
  image: { url?: string; thumb?: { url?: string } };
};
