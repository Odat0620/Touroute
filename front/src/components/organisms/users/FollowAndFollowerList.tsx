import { VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import { FollowType } from "../../../types/api/users/UserType";
import { AvatarAndName } from "../../molecules/users/AvatarAndName";

export const FollowAndFollowerList: VFC<FollowType> = (props) => {
  const { id, name, profile, avatar } = props;

  const history = useHistory();

  return (
    <>
      <Box
        w="500px"
        h="200"
        bg="white"
        shadow="md"
        border="1px solid #aaa"
        borderRadius="12px"
        _hover={{ cursor: "pointer", opacity: "0.8" }}
        onClick={() => history.push(`/users/${id}`)}
      >
        <Box m={3}>
          <AvatarAndName name={name} avatarUrl={avatar.thumb.url} large />
        </Box>
        <Box p={3} w="max-auto">
          <Text whiteSpace="pre-wrap">{profile}</Text>
        </Box>
      </Box>
    </>
  );
};
