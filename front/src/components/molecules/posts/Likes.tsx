import { VFC, memo } from "react";
import { Text, Icon, Flex, Tooltip } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useAuthR } from "../../../hooks/api/useAuthR";

type Props = {
  likedCount: number;
  isLiked: boolean;
  onClickCreateLike: () => Promise<void>;
  onClickDeleteLike: () => Promise<void>;
};

export const Likes: VFC<Props> = memo((props) => {
  const { likedCount, isLiked, onClickCreateLike, onClickDeleteLike } = props;
  const { currentUser } = useAuthR();

  return (
    <>
      <Tooltip label="いいね！" bg="gray.400" fontSize="11px">
        {currentUser.uid ? (
          <Flex mr={3}>
            <Text
              cursor="pointer"
              onClick={isLiked ? onClickDeleteLike : onClickCreateLike}
            >
              <Icon
                mr="3px"
                fontSize="22px"
                as={isLiked ? AiFillHeart : AiOutlineHeart}
                color={isLiked ? "#ff6666" : "gray.500"}
              />
            </Text>
            <Text color="gray.600">{likedCount}</Text>
          </Flex>
        ) : (
          <Flex mr={3}>
            <Icon mr="1" fontSize="22px" color="gray.500" as={AiOutlineHeart} />
            <Text>{likedCount}</Text>
          </Flex>
        )}
      </Tooltip>
    </>
  );
});
