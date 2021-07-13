export type CommentType = {
  id: number;
  text: string;
  user_id: number;
  post_id: number;
  createdAt: Date;
  updatedAt: Date;
  user: { id: number; name: string; };
};