import { memo, useState, VFC } from "react";
import { Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Flex, Box, Stack, Button } from "@chakra-ui/react";

import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { RouteCreate } from "../../organisms/posts/RouteCreate";
import { latLngType } from "../../../types/latLngType";

export const CreatePost: VFC = memo(() => {
  const [origin, setOrigin] = useState<latLngType | null>(null);
  const [destination, setDestination] = useState<latLngType | null>(null);

  const title = useInput("");
  const text = useTextarea("");

  const onClickPost = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <Flex align="center" justify="center">
        <Box bg="white" p={8} shadow="md">
          <Stack justify="center" align="center" spacing={5}>
            <Heading color="gray.600" textAlign="center">
              ツーリング記録を作成
            </Heading>
            <Input {...title} autoFocus={true} placeholder="タイトル" />
            <Textarea h={200} {...text} placeholder="本文" />
            <RouteCreate
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
            />
            <Button
              bg="blue.500"
              color="white"
              w="50%"
              _hover={{ opacity: 0.8 }}
              onClick={onClickPost}
            >
              投稿
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
