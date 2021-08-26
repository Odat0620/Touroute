/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Center, Divider, Text } from "@chakra-ui/react";
import { useState, VFC, useEffect } from "react";

import { useAuthR } from "../../../hooks/useAuthR";
import { client } from "../../../lib/api/client";
import { UserType } from "../../../types/api/users/UserType";

export const Relationship: VFC<{ user: UserType }> = ({ user }) => {
  const { currentUser } = useAuthR();
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [followers, setFollowers] = useState<number>(0);

  const onClickCreateFollow = async () => {
    await client
      .post("/relationships", {
        uid: currentUser.uid,
        other_user_id: user.id,
      })
      .then((res) => {
        setIsFollow(true);
        setFollowers(followers + 1);
        console.log(res);
      });
  };
  const onClickDeleteFollow = async () => {
    await client
      .delete(`/relationships/${user.id}`, {
        data: {
          uid: currentUser.uid,
          other_user_id: user.id,
        },
      })
      .then(() => {
        setIsFollow(false);
        setFollowers(followers - 1);
      });
  };

  useEffect(() => {
    setFollowers(user.followers!.length);
    if (!isFollow) {
      user.followers!.forEach((f) => {
        if (f.id === currentUser.id) {
          setIsFollow(true);
        }
      });
    }
  }, [currentUser]);

  return (
    <>
      <Center height="50px" p={3} w="lg" borderWidth="0px" borderRadius={6}>
        <Box align="center">
          <Text>フォロー</Text>
          <Text>{user.following!.length}</Text>
        </Box>
        <Divider h="40px" mx={6} orientation="vertical" />
        <Box align="center" mr={6}>
          <Text>フォロワー</Text>
          <Text>{followers}</Text>
        </Box>

        {!currentUser.uid || user.id === currentUser.id || (
          <Button
            borderRadius="100"
            bg={isFollow ? "orange.300" : "white"}
            color={isFollow ? "white" : "orange.300"}
            borderColor={"orange.300"}
            borderWidth="2px"
            _hover={{ opacity: 0.8 }}
            onClick={isFollow ? onClickDeleteFollow : onClickCreateFollow}
          >
            {isFollow ? "フォロー中" : "フォロー"}
          </Button>
        )}
      </Center>
    </>
  );
};
