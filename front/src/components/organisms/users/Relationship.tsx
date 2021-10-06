/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, memo } from "react";
import { Box, Center, Divider, Text } from "@chakra-ui/react";

import { useAuthR } from "../../../hooks/api/useAuthR";
import { UserType } from "../../../types/api/users/UserType";
import { RelationshipButton } from "../../atoms/button/RelationshipButton";
import { useRelationship } from "../../../hooks/api/useRelationship";

export const Relationship: VFC<{
  user: UserType;
}> = memo(({ user }) => {
  const { currentUser } = useAuthR();
  const { isFollow, followersCount, onClickCreateFollow, onClickDeleteFollow } =
    useRelationship(user);

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
          <Text>{followersCount}</Text>
        </Box>

        {!currentUser.uid || user.id === currentUser.id || (
          <RelationshipButton
            isFollow={isFollow}
            onClickCreateFollow={onClickCreateFollow}
            onClickDeleteFollow={onClickDeleteFollow}
          />
        )}
      </Center>
    </>
  );
});
