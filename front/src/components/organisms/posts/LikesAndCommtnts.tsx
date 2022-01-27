import { Flex } from "@chakra-ui/react";
import { memo } from "react";
import { useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";

import { client } from "../../../lib/api/client";
import { signInUserState } from "../../../store/auth";
import { CommentsCount } from "../../molecules/posts/CommentsCount";
import { Likes } from "../../molecules/posts/Likes";

type Props = {
  id: string | number;
  likes: Array<{ userId: number }>;
  commentsCount: number;
};

export const LikesAndCommtnts: VFC<Props> = memo((props) => {
  const { id, likes, commentsCount } = props;
  const currentUser = useRecoilValue(signInUserState);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedCount, setLikedCount] = useState<number>(0);

  const onClickCreateLike = async () => {
    await client
      .post(`/posts/${id}/likes`, {
        post_id: id,
        user_id: currentUser?.id,
      })
      .then(() => {
        setIsLiked(true);
        setLikedCount(likedCount + 1);
      });
  };
  const onClickDeleteLike = async () => {
    await client
      .delete(`/posts/${id}/likes/${currentUser.id}`, {
        data: {
          post_id: id,
          user_id: currentUser.id,
        },
      })
      .then(() => {
        setIsLiked(false);
        setLikedCount(likedCount - 1);
      });
  };

  useEffect(() => {
    setLikedCount(likes!.length);
    if (!isLiked) {
      likes?.forEach((like) => {
        if (like.userId === currentUser.id) {
          setIsLiked(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <Flex>
        <Likes
          likedCount={likedCount}
          isLiked={isLiked}
          onClickCreateLike={onClickCreateLike}
          onClickDeleteLike={onClickDeleteLike}
        />
        <CommentsCount commentsCount={commentsCount} />
      </Flex>
    </>
  );
});
