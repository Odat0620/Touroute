/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { signInUserState } from "../../recoil/auth";
import { auth } from "../../utils/Firebase";
import { fetchUserData } from "../../lib/api/user";

export const useAuthR = () => {
  const [currentUser, setCurrentUser] = useRecoilState(signInUserState);
  const resetStatus = useResetRecoilState(signInUserState);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (!currentUser.id) {
          fetchUserData(authUser).then((userData) => {
            setCurrentUser({
              id: userData.id,
              email: authUser.email,
              name: userData.name,
              profile: userData.profile,
              uid: authUser.uid,
              avatar: userData.avatar,
            });
            console.log("auth");
          });
        }
      } else {
        resetStatus();
      }
    });
    return () => unSub();
  }, [currentUser.id]);

  return { currentUser, setCurrentUser };
};
