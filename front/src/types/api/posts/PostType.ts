import { CommentType } from "./CommentType";

export type PostType = {
  id: number;
  title: string;
  text: string;
  image: { url?: string; thumb?: { url?: string } };
  route: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
  };
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    uid?: string;
    avatar: { url?: string; thumb: { url: string } };
  };
  comments: Array<CommentType>;
  likes: Array<{ userId: number }>;
};
