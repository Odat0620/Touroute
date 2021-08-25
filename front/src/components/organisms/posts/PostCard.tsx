import { memo, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { AspectRatio, Image } from "@chakra-ui/react";

import { CreatedAtArea } from "../../atoms/posts/CreatedAtArea";
import { LikesAndCommtnts } from "./LikesAndCommtnts";
import { AvatarAndName } from "../../molecules/AvatarAndName";
import DefaultImage from "../../../img/PostDefaultImg.jpg";

type Props = {
  id: number;
  title: string;
  image: string | undefined;
  createdAt: Date;
  commentsCount: number;
  likes: Array<{ userId: number }>;
  name: string;
  userId: number;
  avatarUrl?: string;
  onClick: (id: number) => void;
};

export const PostCard: VFC<Props> = memo((props) => {
  const {
    id,
    title,
    image,
    createdAt,
    name,
    commentsCount,
    likes,
    userId,
    avatarUrl,
    onClick,
  } = props;

  const history = useHistory();

  return (
    <Box
      w="280px"
      h="360px"
      bg="white"
      shadow="md"
      border="1px solid #aaa"
      borderRadius="12px"
      _hover={{ cursor: "pointer", opacity: "0.8" }}
      onClick={() => onClick(id)}
    >
      <AspectRatio ratio={16 / 10}>
        <Image
          w="280px"
          h="180px"
          borderRadius="10px 10px 0px 0px"
          src={image || DefaultImage}
          alt="post image"
        />
      </AspectRatio>

      <Stack align="center" spacing="10px">
        <Text py="6px" fontSize="x-large" fontWeight="bold">
          {title}
        </Text>
        <CreatedAtArea createdAt={createdAt} />
        <LikesAndCommtnts likes={likes} commentsCount={commentsCount} id={id} />
        <AvatarAndName
          name={name}
          avatarUrl={avatarUrl}
          onClick={() => history.push(`/users/${userId}`)}
        />
      </Stack>
    </Box>
  );
});
