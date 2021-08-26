/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, VFC, useState, useCallback } from "react";
import { useParams } from "react-router";
import { Heading } from "@chakra-ui/layout";
import { Box, Divider, Flex, Stack } from "@chakra-ui/react";

import { client } from "../../../lib/api/client";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { UserType } from "../../../types/api/users/UserType";
import { PostsContainer } from "../../organisms/posts/PostsContainer";
import { UserInfomationContainer } from "../../organisms/users/UserInfomationContainer";

export const User: VFC = memo(() => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  console.log();

  const onClickShowPost = useCallback(
    (postId) => history.push(`/posts/${postId}`),
    []
  );

  useEffect(() => {
    client.get(`users/${id}`).then(({ data }) => {
      setUser(data);
    });
  }, [id]);

  return (
    <>
      {!user ? (
        <LoadingSpinner />
      ) : (
        <>
          <Flex>
            <UserInfomationContainer user={user} />

            <Box
              Box
              my={8}
              mr={8}
              bg="white"
              p={8}
              borderRadius={6}
              shadow="md"
              flex="1"
            >
              <Stack justify="center" align="center" spacing={5}>
                <Heading color="gray.600" fontSize={25}>
                  ツーリング記録
                </Heading>
                <Divider />

                <PostsContainer
                  posts={user.posts}
                  userName={user.name}
                  avatarUrl={user.avatar?.thumb.url}
                  onClick={onClickShowPost}
                />
              </Stack>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
});
