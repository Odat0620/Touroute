import { client } from "./client";
import firebase from "firebase/app";

export const fetchUserIdAndName = async (
  user: firebase.User | null | undefined
) => {
  const token = await user?.getIdToken(true);
  const config = { headers: { authorization: `Bearer ${token}` } };
  try {
    return await (
      await client.get("/users/fetch_user_id_and_name", config)
    ).data;
  } catch (error) {
    console.error(`user_idとnameの取得に失敗しました。${error}`);
  }
};
