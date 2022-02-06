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
import { PostCardType } from "../../types/api/posts/PostType";
import { LoadingSpinner } from "../molecules/LoadingSpinner";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { PostsContainer } from "../organisms/posts/PostsContainer";
import { DashBoardButton } from "../atoms/button/DashBoardButton";
import { signInUserState } from "../../store/auth";
import { useSortPost } from "../../hooks/useSortPost";
import { auth } from "../../utils/Firebase";

export const Home: VFC = memo(() => {
  const currentUser = useRecoilValue(signInUserState);
  const [posts, setPosts] = useState<Array<PostCardType> | null>(null);
  const [sort, setSort] = useState<string>("新着");
  const [loading, setLoading] = useState<boolean>(false);

  // フックス準備
  const history = useHistory();
  const { showMessage } = useMessage();
  const PostsSortedByLikes = useSortPost(posts, "likes");
  const PostsSortedByCreatedAt = useSortPost(posts, "createdAt");

  const sortByCreatedAt = () => {
    setPosts(PostsSortedByCreatedAt);
    setSort("新着");
  };

  const sortByLikes = () => {
    setPosts(PostsSortedByLikes);
    setSort("いいね数");
  };

  const onClickShowPost = useCallback((id) => history.push(`/posts/${id}`), []);

  // ゲストログイン（仮）
  const guestLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(
        process.env.REACT_APP_GUEST_EMAIL!,
        process.env.REACT_APP_GUEST_PASSWORD!,
      );
      showMessage({ title: "ログインしました。", status: "success" });
      history.push("/");
    } catch (error) {
      showMessage({ title: "ログインに失敗しました。", status: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    client
      .get<Array<PostCardType> | null>("posts")
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
      <Box bg="#00a3c4" w="full" mb="1.5rem" h="200px" align="center" justify="center">
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
        {currentUser.uid ? (
          <>
            <PrimaryButton onClick={() => history.push("/createpost")}>投稿する</PrimaryButton>
          </>
        ) : (
          <PrimaryButton isLoading={loading} onClick={guestLogin}>
            ゲストログイン
          </PrimaryButton>
        )}
      </Box>
      <Flex direction={{ base: "column", md: "row" }} justify="center">
        <Flex
          direction={{ base: "row", md: "column" }}
          w={{ balse: "full", md: "20%" }}
          minW="150px"
          h={{ base: "fit-content", md: "200px" }}
          mx="0.5rem"
          mb={{ base: "1rem", md: "none" }}
          borderRadius="8px"
          bg="white"
          shadow="md"
        >
          <DashBoardButton
            px="1rem"
            borderRadius={{ base: "8px" }}
            borderTopRadius={{ md: "8px" }}
            borderBottomRadius={{ md: "none" }}
            icon={<MdFiberNew />}
            onClick={sortByCreatedAt}
          >
            新着
          </DashBoardButton>
          <Divider display={{ base: "none", md: "block" }} />
          <DashBoardButton
            px="1rem"
            borderRadius={{ base: "8px", md: "none" }}
            icon={<AiFillHeart />}
            onClick={sortByLikes}
          >
            いいね数
          </DashBoardButton>
        </Flex>

        <Box w={{ base: "full", md: "80%" }} justify="center">
          <Flex display={{ base: "", md: "flex" }} mx="0.5rem" borderBottom="3px solid #A0AEC0">
            <Text
              ml={{ base: "none", md: "1rem" }}
              fontWeight="bold"
              fontSize="lg"
              color="gray.600"
            >
              {sort}
            </Text>
          </Flex>
          {!posts ? <LoadingSpinner /> : <PostsContainer posts={posts} onClick={onClickShowPost} />}
        </Box>
      </Flex>
    </Box>
  );
});
