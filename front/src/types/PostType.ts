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
  user: { name: string };
};
