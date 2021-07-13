import { memo, useContext, useState, VFC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Flex, Box, Stack, Button, Heading } from "@chakra-ui/react";

import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { RouteCreate } from "../../organisms/posts/RouteCreate";
import { latLngType } from "../../../types/api/posts/latLngType";
import { AuthContext } from "../../../providers/auth/AuthProvider";
import { useMessage } from "../../../hooks/useMessage";
import { client } from "../../../lib/api/client";

export const CreatePost: VFC = memo(() => {
  const { currentUser } = useContext(AuthContext);

  // stateを定義
  const [origin, setOrigin] = useState<latLngType | null>(null);
  const [destination, setDestination] = useState<latLngType | null>(null);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const title = useInput("");
  const text = useTextarea("");

  // フックの読み込み
  const history = useHistory();
  const { showMessage } = useMessage();

  // 投稿作成の処理
  const onClickPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoadingButton(true);
    const post_data = {
      title: title.value,
      text: text.value,
      user_id: currentUser?.id,
      route: { origin, destination },
    };
    try {
      await client
        .post("posts", post_data)
        .then((res) => {
          showMessage({
            title: "投稿しました。",
            status: "success",
          });
          setIsDone(true);
          console.log(res);
        })
        .catch(({ response }) => {
          showMessage({
            title: `タイトル${response.data.title}`,
            status: "error",
          });
          console.log(response);
        });
    } catch (res) {
      showMessage({ title: "投稿できませんでした。", status: "error" });
      console.log(res);
    }
    setLoadingButton(false);
  };

  useEffect(() => {
    if (isDone) {
      history.push("/");
    }
  }, [history, isDone]);

  return (
    <>
      <Flex align="center" justify="center">
        <Box bg="white" p={8} shadow="md">
          <Stack justify="center" align="center" spacing={5}>
            <Heading color="gray.600" textAlign="center">
              ツーリング記録を作成
            </Heading>
            <Input
              {...title}
              autoFocus={true}
              placeholder="タイトル（必須、20文字以内）"
            />
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
              disabled={loadingButton || !currentUser}
              isLoading={loadingButton}
            >
              投稿
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
