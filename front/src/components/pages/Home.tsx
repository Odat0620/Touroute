/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState, VFC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { MdFiberNew } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

import { client } from "../../lib/api/client";
import { useMessage } from "../../hooks/useMessage";
import { PostType } from "../../types/api/posts/PostType";
import { LoadingSpinner } from "../molecules/LoadingSpinner";
import { useAuthR } from "../../hooks/api/useAuthR";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { PostsContainer } from "../organisms/posts/PostsContainer";
import { DashBoardButton } from "../atoms/button/DashBoardButton";

export const Home: VFC = memo(() => {
  const { currentUser } = useAuthR();
  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  // フックス準備
  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickShowPost = useCallback((id) => history.push(`/posts/${id}`), []);

  const sortByCreatedAt = () => {
    if (!posts) return;
    let c_posts = posts.slice();
    const compare = (a: PostType, b: PostType) => {
      const creA = a.createdAt;
      const creB = b.createdAt;
      let comparison = 0;
      if (creA > creB) {
        comparison = 1;
      } else if (creA < creB) {
        comparison = -1;
      }
      return comparison * -1;
    };

    c_posts.sort(compare);
    setPosts(c_posts);
  };

  const sortByLikeCounts = () => {
    if (!posts) return;
    let c_posts = posts.slice();
    const compare = (a: PostType, b: PostType) => {
      const likeA = a.likes.length;
      const likeB = b.likes.length;
      let comparison = 0;
      if (likeA > likeB) {
        comparison = 1;
      } else if (likeA < likeB) {
        comparison = -1;
      }
      return comparison * -1;
    };

    c_posts.sort(compare);
    setPosts(c_posts);
  };

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
  console.log(posts);

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
        <Box w="20%" h="300px" m="0.5rem" borderRadius="8px" bg="white" shadow="md">
          <DashBoardButton
            borderTopRadius="8px"
            icon={<MdFiberNew />}
            onClick={() => sortByCreatedAt()}
          >
            新着
          </DashBoardButton>
          <Divider />
          <DashBoardButton icon={<AiFillHeart />} onClick={() => sortByLikeCounts()}>
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
