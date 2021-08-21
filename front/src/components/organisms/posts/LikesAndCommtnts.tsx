import { useEffect, useState, VFC } from "react";

import { useAuthR } from "../../../hooks/useAuthR";
import { client } from "../../../lib/api/client";
import { CommentsCount } from "../../molecules/CommentsCount";
import { Likes } from "../../molecules/Likes";

type Props = {
  id: string;
  likes?: Array<{ userId: number }>;
  commentsCount?: number;
};

export const LikesAndCommtnts: VFC<Props> = (props) => {
  const { id, likes, commentsCount } = props;
  const currentUser = useAuthR();

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
      <Likes
        likedCount={likedCount}
        isLiked={isLiked}
        onClickCreateLike={onClickCreateLike}
        onClickDeleteLike={onClickDeleteLike}
      />
      <CommentsCount commentsCount={commentsCount} />
    </>
  );
};
