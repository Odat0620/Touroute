/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useState, VFC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/layout";
import { Button, Wrap, WrapItem } from "@chakra-ui/react";

import { AuthContext } from "../../providers/auth/AuthProvider";
import { client } from "../../lib/api/client";
import { useMessage } from "../../hooks/useMessage";
import { PostType } from "../../types/PostType";
import { PostCard } from "../organisms/posts/PostCard";

export const Home: VFC = memo(() => {
  const { currentUser } = useContext(AuthContext);

  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  // フックス準備
  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickShowPost = useCallback((id) => history.push(`/posts/${id}`), []);

  const getPosts = useCallback(() => {
    client
      .get<Array<PostType> | null>("posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        showMessage({ title: "投稿を取得できませんでした。", status: "error" });
      });
  }, []);

  useEffect(() => getPosts(), []);

  return (
    <Box align="center">
      <Heading as="h1">Home</Heading>
      {currentUser ? (
        <>
          <Button
            bg="blue.500"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={() => history.push("/createpost")}
          >
            投稿する
          </Button>
        </>
      ) : (
        <h2>ログインしていません</h2>
      )}
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {posts?.map((post) => (
          <WrapItem key={post.id}>
            <PostCard
              id={post.id}
              title={post.title}
              text={post.text}
              onClick={() => onClickShowPost(post.id)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
});
