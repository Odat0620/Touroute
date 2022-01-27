/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { client } from "../../lib/api/client";
import { UserType } from "../../types/api/users/UserType";
import { signInUserState } from "../../store/auth";

export const useRelationship = (user: UserType) => {
  const currentUser = useRecoilValue(signInUserState);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [followersCount, setFollowersCount] = useState<number>(0);

  const onClickCreateFollow = async () => {
    await client
      .post("/relationships", {
        uid: currentUser.uid,
        other_user_id: user.id,
      })
      .then(() => {
        setIsFollow(true);
        setFollowersCount(followersCount + 1);
      });
  };
  const onClickDeleteFollow = async () => {
    await client
      .delete(`/relationships/${user.id}`, {
        data: {
          uid: currentUser.uid,
          other_user_id: user.id,
        },
      })
      .then(() => {
        setIsFollow(false);
        setFollowersCount(followersCount - 1);
      });
  };

  useEffect(() => {
    setIsFollow(false);
    setFollowersCount(user.followers!.length);
    if (!isFollow) {
      user.followers!.forEach((f) => {
        if (f.id === currentUser.id) {
          setIsFollow(true);
          return;
        }
      });
    }
  }, [currentUser, user]);

  return { isFollow, followersCount, onClickCreateFollow, onClickDeleteFollow };
};
