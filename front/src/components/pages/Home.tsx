/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState, VFC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/layout";
import { Divider, Text } from "@chakra-ui/react";

import { client } from "../../lib/api/client";
import { useMessage } from "../../hooks/useMessage";
import { PostType } from "../../types/api/posts/PostType";
import { LoadingSpinner } from "../molecules/LoadingSpinner";
import { useAuthR } from "../../hooks/useAuthR";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { PostsContainer } from "../organisms/posts/PostsContainer";

export const Home: VFC = memo(() => {
  const { currentUser } = useAuthR();
  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  // フックス準備
  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickShowPost = useCallback((id) => history.push(`/posts/${id}`), []);

  useEffect(() => {
    const getPosts = async () => {
      await client
        .get<Array<PostType> | null>("posts")
        .then(({ data }) => {
          setPosts(data);
        })
        .catch(() => {
          showMessage({
            title: "投稿を取得できませんでした。",
            status: "error",
          });
        });
    };
    getPosts();
  }, []);

  return (
    <Box align="center">
      <Box bg="#5ac" w="full" h="200px" align="center" justify="center">
        <Heading
          as="h1"
          pt="30px"
          fontSize="50px"
          textShadow="0px 2px 8px #fff"
        >
          Touroute
        </Heading>
        <Text mb="20px">ツーリングルートの共有アプリです。</Text>
        {currentUser.uid && (
          <>
            <PrimaryButton onClick={() => history.push("/createpost")}>
              投稿する
            </PrimaryButton>
          </>
        )}
      </Box>

      <Box w="80%">
        <Box
          bg="orange.200"
          w="220px"
          py="1px"
          my="10px"
          borderRadius="50"
          shadow="md"
        >
          <Heading as="h1" color="gray.600" my="10px">
            投稿一覧
          </Heading>
        </Box>
        <Divider />
        {!posts ? (
          <LoadingSpinner />
        ) : (
          <PostsContainer posts={posts} onClick={onClickShowPost} />
        )}
      </Box>
    </Box>
  );
});
