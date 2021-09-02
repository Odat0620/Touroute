import { VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import { FollowType } from "../../../types/api/users/UserType";
import { AvatarAndName } from "../../molecules/users/AvatarAndName";

export const FollowingAndFollowerList: VFC<{
  follow?: Array<FollowType>;
  noFollowText: string;
}> = ({ follow, noFollowText }) => {
  const history = useHistory();

  return (
    <>
      {follow?.length === 0 ? (
        <Text color="gray.500" align="center">
          {noFollowText}
        </Text>
      ) : (
        follow!.map((f) => (
          <Box
            key={f.id}
            w="500px"
            h="200"
            bg="white"
            shadow="md"
            border="1px solid #ccc"
            borderRadius="12px"
            _hover={{ cursor: "pointer", opacity: "0.8" }}
            onClick={() => history.push(`/users/${f.id}`)}
          >
            <Box m={3}>
              <AvatarAndName
                name={f.name}
                avatarUrl={f.avatar.thumb.url}
                large
              />
            </Box>
            <Box p={3} w="max-auto">
              <Text whiteSpace="pre-wrap">{f.profile}</Text>
            </Box>
          </Box>
        ))
      )}
    </>
  );
};
