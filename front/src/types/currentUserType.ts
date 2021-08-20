export type currentUserType = {
  id: number | null;
  email: string | null;
  name: string;
  profile: string;
  avatar?: { url: string };
  uid: string;
};
