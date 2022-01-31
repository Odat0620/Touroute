export type currentUserType = {
  id: number | null;
  email: string | null;
  name: string;
  profile: string;
  location: string;
  avatar: { url?: string | undefined; thumb: { url?: string | undefined } };
  uid: string;
};
