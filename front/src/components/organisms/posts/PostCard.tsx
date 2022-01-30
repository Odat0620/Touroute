import { memo, VFC } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { AspectRatio, HStack, Image, Tag } from "@chakra-ui/react";

import { CreatedAtArea } from "../../atoms/posts/CreatedAtArea";
import { LikesAndCommtnts } from "./LikesAndCommtnts";
import { AvatarAndName } from "../../molecules/users/AvatarAndName";
import DefaultImage from "../../../img/PostDefaultImg.jpg";
import { PrefectureArray } from "../../../utils/PrefectureArray";

type Props = {
  id: number;
  title: string;
  image: string | undefined;
  createdAt: Date;
  prefectures: Array<number> | undefined;
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
    prefectures,
    name,
    commentsCount,
    likes,
    avatarUrl,
    onClick,
  } = props;

  return (
    <Box
      w="280px"
      h="360px"
      bg="white"
      shadow="md"
      position="relative"
      border="1px solid #ccc"
      borderRadius="12px"
      _hover={{ cursor: "pointer", opacity: "0.8" }}
      onClick={() => onClick(id)}
    >
      {prefectures && (
        <HStack
          top="0px"
          left="0px"
          px="0.3em"
          py="0.3em"
          zIndex="1"
          position="absolute"
          bg="#00000066"
          borderTopLeftRadius="12px"
          borderBottomRightRadius="12px"
        >
          {prefectures.map((id, index) =>
            index <= 1 ? (
              <Tag key={index} colorScheme="green" variant="subtle" fontWeight="bold">
                {PrefectureArray.find((prefecture) => prefecture.id === id)?.name}
              </Tag>
            ) : (
              index === 3 && (
                <Tag key={index} color="black" bg="gray.300" fontWeight="bold" borderRadius="50">
                  +{prefectures.length - 2}
                </Tag>
              )
            ),
          )}
        </HStack>
      )}
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
        <AvatarAndName name={name} avatarUrl={avatarUrl} />
      </Stack>
    </Box>
  );
});
