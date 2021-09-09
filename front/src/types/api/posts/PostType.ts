import { CommentType } from "./CommentType";

export type PostType = {
  id: number;
  title: string;
  text: string;
  route: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
  };
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  prefecture: Array<number> | undefined;
  image: { url?: string; thumb?: { url?: string } };
  user: {
    name: string;
    uid?: string;
    avatar: { url?: string; thumb: { url: string } };
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
  image: { url?: string; thumb?: { url?: string } };
  user: {
    name: string;
    uid?: string;
    avatar: { url?: string; thumb: { url: string } };
  };
  comments: Array<any>;
  likes: Array<{ userId: number }>;
};
