import { memo, useContext, useState, VFC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Flex, Box, Stack, Button, Heading } from "@chakra-ui/react";

import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { RouteCreate } from "../../organisms/posts/RouteCreate";
import { latLngType } from "../../../types/latLngType";
import { AuthContext } from "../../../providers/auth/AuthProvider";
import { useMessage } from "../../../hooks/useMessage";

export const CreatePost: VFC = memo(() => {
  const { currentUser } = useContext(AuthContext);

  const [origin, setOrigin] = useState<latLngType | null>(null);
  const [destination, setDestination] = useState<latLngType | null>(null);

  const title = useInput("");
  const text = useTextarea("");

  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickPost = (e: React.MouseEvent<HTMLButtonElement>) => {};

  // ログインしていない場合ログインページへ移動
  useEffect(() => {
    if (!currentUser) {
      console.log("log");
      history.push("/signin");
      showMessage({ title: "ログインしてください。", status: "error" });
    }
  });

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
