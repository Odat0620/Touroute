import { VFC, useState, useEffect } from "react";
import { Text, Icon, Flex, Tooltip } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { client } from "../../../lib/api/client";
import { useAuthR } from "../../../hooks/useAuthR";

type Props = {
  likes: Array<any> | undefined;
  id: string;
};

export const Likes: VFC<Props> = (props) => {
  const { likes, id } = props;
  const currentUser = useAuthR();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedCount, setLikedCount] = useState<number>(0);

  const onClickCreatekLike = async () => {
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
        console.log(like);
        if (like.userId === currentUser.id) {
          setIsLiked(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <Tooltip label="いいね！" bg="gray.400" fontSize="11px">
        {currentUser.uid ? (
          <Flex mr={3}>
            <Text
              cursor="pointer"
              onClick={isLiked ? onClickDeleteLike : onClickCreatekLike}
            >
              <Icon
                mr="2.5"
                fontSize="22px"
                as={isLiked ? AiFillHeart : AiOutlineHeart}
                color={isLiked ? "red" : ""}
              />
            </Text>
            <Text>{likedCount}</Text>
          </Flex>
        ) : (
          <Flex mr={3}>
            <Icon mr="2.5" fontSize="22px" as={AiOutlineHeart} />
            <Text>{likedCount}</Text>
          </Flex>
        )}
      </Tooltip>
    </>
  );
};
