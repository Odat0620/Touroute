export type PostType = {
  id: number;
  title: string;
  text: string;
  route: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
  };
  user_id: number;
  created_at: Date;
  updated_at: Date;
};