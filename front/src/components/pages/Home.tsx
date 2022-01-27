/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState, VFC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { MdFiberNew } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { useRecoilValue } from "recoil";

import { client } from "../../lib/api/client";
import { useMessage } from "../../hooks/useMessage";
import { PostType } from "../../types/api/posts/PostType";
import { LoadingSpinner } from "../molecules/LoadingSpinner";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { PostsContainer } from "../organisms/posts/PostsContainer";
import { DashBoardButton } from "../atoms/button/DashBoardButton";
import { signInUserState } from "../../store/auth";
import { useSortPost } from "../../hooks/useSortPost";

export const Home: VFC = memo(() => {
  const currentUser = useRecoilValue(signInUserState);
  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  // フックス準備
  const history = useHistory();
  const { showMessage } = useMessage();
  const sortByLikes = useSortPost(posts, "likes");
  const sortByCreatedAt = useSortPost(posts, "createdAt");

  const onClickShowPost = useCallback((id) => history.push(`/posts/${id}`), []);

  useEffect(() => {
    client
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
  }, []);

  return (
    <Box align="center">
      <Box bg="#00a3c4" w="full" mb="1rem" h="200px" align="center" justify="center">
        <Heading
          as="h1"
          pt="30px"
          fontSize="50px"
          color="white"
          textShadow="0px 0px 10px rgba(50, 100, 150, 20)"
        >
          Touroute
        </Heading>
        <Text mb="20px" color="whiteAlpha.900" fontWeight="bold">
          ツーリングルートの共有アプリです。
        </Text>
        {currentUser.uid && (
          <>
            <PrimaryButton onClick={() => history.push("/createpost")}>投稿する</PrimaryButton>
          </>
        )}
      </Box>
      <Flex>
        <Box w="20%" maxW="200px" h="200px" m="0.5rem" borderRadius="8px" bg="white" shadow="md">
          <DashBoardButton
            borderTopRadius="8px"
            icon={<MdFiberNew />}
            onClick={() => setPosts(sortByCreatedAt)}
          >
            新着
          </DashBoardButton>
          <Divider />
          <DashBoardButton icon={<AiFillHeart />} onClick={() => setPosts(sortByLikes)}>
            いいね数
          </DashBoardButton>
        </Box>

        <Box w="80%">
          {!posts ? <LoadingSpinner /> : <PostsContainer posts={posts} onClick={onClickShowPost} />}
        </Box>
      </Flex>
    </Box>
  );
});
