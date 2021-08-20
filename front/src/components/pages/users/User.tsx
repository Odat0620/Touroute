/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, VFC, useState, useCallback } from "react";
import { useParams } from "react-router";
import { Heading } from "@chakra-ui/layout";
import {
  Box,
  Divider,
  Flex,
  Stack,
  Wrap,
  WrapItem,
  Text,
  Avatar,
} from "@chakra-ui/react";

import { client } from "../../../lib/api/client";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { PostCard } from "../../organisms/posts/PostCard";
import { useHistory } from "react-router-dom";
import { UserType } from "../../../types/api/users/UserType";
import { Relationship } from "../../organisms/users/Relationship";

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
      console.log(data.followers);
    });
  }, [id]);

  return (
    <>
      {!user ? (
        <LoadingSpinner />
      ) : (
        <Flex align="center" justify="center" direction="column">
          <Box my={8} bg="white" p={8} borderRadius={6} shadow="md" w="70%">
            <Stack justify="center" align="center" spacing={5}>
              <Box align="center">
                <Avatar size="xl" src={user.avatar?.url} />
                <Heading color="gray.700">{user?.name}</Heading>
              </Box>

              <Relationship user={user} id={id} />

              {user.profile && (
                <Box p={3} w="max-auto" borderWidth="1px" borderRadius={6}>
                  <Text>{user?.profile}</Text>
                </Box>
              )}

              <Divider />

              <Heading color="gray.700" fontSize={25}>
                ツーリング記録
              </Heading>

              <Wrap p={{ base: 4, md: 10 }} justify="center">
                {user?.posts?.map((post) => (
                  <WrapItem key={post.id}>
                    <PostCard
                      id={post.id}
                      title={post.title}
                      text={post.text}
                      createdAt={post.createdAt}
                      name={user.name}
                      commentsCount={post.comments!.length}
                      likesCount={post.likes!.length}
                      onClick={() => onClickShowPost(post.id)}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
});
