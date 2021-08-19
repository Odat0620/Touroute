import { Box, Button, Center, Divider, Text } from "@chakra-ui/react";
import { useState, VFC } from "react";

import { useAuthR } from "../../../hooks/useAuthR";
import { client } from "../../../lib/api/client";
import { UserType } from "../../../types/api/users/UserType";
import { useEffect } from "react";

type Props = {
  user: UserType;
  id: string;
};

export const Relationship: VFC<Props> = (props) => {
  const { user, id } = props;
  const currentUser = useAuthR();
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [following, setFollowing] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);

  const onClickCreateFollow = async () => {
    await client
      .post("/relationships", {
        uid: currentUser.uid,
        other_user_id: id,
      })
      .then((res) => {
        setIsFollow(true);
        setFollowers(followers + 1);
        console.log(res);
      });
  };
  const onClickDeleteFollow = async () => {
    await client
      .delete(`/relationships/${id}`, {
        data: {
          uid: currentUser.uid,
          other_user_id: id,
        },
      })
      .then(() => {
        setIsFollow(false);
        setFollowers(followers - 1);
      });
  };

  useEffect(() => {
    setFollowing(user.following!.length);
    setFollowers(user.followers!.length);
    if (!isFollow) {
      user.followers!.forEach((f) => {
        if (f.id === currentUser.id) {
          setIsFollow(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <Center height="50px" p={3} w="lg" borderWidth="0px" borderRadius={6}>
        <Box align="center">
          <Text>フォロー</Text>
          <Text>{following}</Text>
        </Box>
        <Divider h="40px" mx={6} orientation="vertical" />
        <Box align="center" mr={6}>
          <Text>フォロワー</Text>
          <Text>{followers}</Text>
        </Box>

        <Button
          borderRadius="100"
          bg={isFollow ? "blue.400" : "white"}
          color={isFollow ? "white" : "blue.400"}
          borderColor={isFollow ? "blue.400" : "blue.400"}
          borderWidth="2px"
          _hover={{ opacity: 0.8 }}
          onClick={isFollow ? onClickDeleteFollow : onClickCreateFollow}
        >
          {isFollow ? "フォロー中" : "フォロー"}
        </Button>
      </Center>
    </>
  );
};
