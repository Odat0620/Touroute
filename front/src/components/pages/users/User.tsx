/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, VFC, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

import { client } from "../../../lib/api/client";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { UserType } from "../../../types/api/users/UserType";
import { PostsContainer } from "../../organisms/posts/PostsContainer";
import { UserInfomationContainer } from "../../organisms/users/UserInfomationContainer";
import { FollowingAndFollowerList } from "../../organisms/users/FollowingAndFollowerList";

export const User: VFC = memo(() => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

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

            <Tabs
              isFitted
              variant="solid-rounded"
              bg="white"
              my={8}
              mr={8}
              borderRadius={6}
              borderTopRadius={40}
              shadow="md"
              flex="1"
              colorScheme="cyan"
            >
              <TabList mb="1em" bg="gray.200" borderRadius="50">
                <Tab>ツーリング記録</Tab>
                <Tab>フォロー</Tab>
                <Tab>フォロワー</Tab>
                <Tab>いいね</Tab>
              </TabList>
              <TabPanels bg="white">
                <TabPanel>
                  <PostsContainer
                    posts={user.posts}
                    userName={user.name}
                    avatarUrl={user.avatar?.thumb.url}
                    onClick={onClickShowPost}
                  />
                </TabPanel>
                <TabPanel>
                  <Stack align="center">
                    <FollowingAndFollowerList
                      follow={user.following}
                      noFollowText="フォローしていません"
                    />
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack align="center">
                    <FollowingAndFollowerList
                      follow={user.followers}
                      noFollowText="フォローされていません"
                    />
                  </Stack>{" "}
                </TabPanel>
                <TabPanel>
                  <PostsContainer
                    posts={user.likedPosts}
                    onClick={onClickShowPost}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </>
      )}
    </>
  );
});
