/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState, VFC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/layout";
import { Divider, Text, Wrap, WrapItem } from "@chakra-ui/react";

import { client } from "../../lib/api/client";
import { useMessage } from "../../hooks/useMessage";
import { PostType } from "../../types/api/posts/PostType";
import { PostCard } from "../organisms/posts/PostCard";
import { LoadingSpinner } from "../molecules/LoadingSpinner";
import { useAuthR } from "../../hooks/useAuthR";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Home: VFC = memo(() => {
  const currentUser = useAuthR();

  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  // フックス準備
  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickShowPost = useCallback((id) => history.push(`/posts/${id}`), []);

  useEffect(() => {
    const getPosts = async () => {
      await client
        .get<Array<PostType> | null>("posts")
        .then((res) => {
          setPosts(res.data);
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
          textShadow="0px 0px 8px #fff"
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
        <Heading as="h1" my="10px">
          投稿一覧
        </Heading>
        <Divider />
        {!posts ? (
          <LoadingSpinner />
        ) : (
          <Wrap p={{ base: 4, md: 10 }} justify="center">
            {posts?.map((post) => (
              <WrapItem key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  text={post.text}
                  createdAt={post.createdAt}
                  name={post.user.name}
                  commentsCount={post.comments!.length}
                  likesCount={post.likes!.length}
                  onClick={() => onClickShowPost(post.id)}
                />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Box>
    </Box>
  );
});
