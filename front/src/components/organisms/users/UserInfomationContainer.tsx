import { memo, VFC } from "react";
import { Avatar, Box, Divider, Heading, Stack, Text } from "@chakra-ui/react";

import { Relationship } from "./Relationship";
import { UserType } from "../../../types/api/users/UserType";

export const UserInfomationContainer: VFC<{ user: UserType }> = memo(
  ({ user }) => {
    return (
      <Box
        m={8}
        bg="white"
        p={8}
        h="80vh"
        minHeight="lg"
        borderRadius={6}
        shadow="md"
        w="sm"
      >
        <Stack justify="center" align="center" spacing={5}>
          <Box align="center">
            <Avatar
              size="xl"
              src={user.avatar?.url}
              showBorder
              borderColor="gray.300"
            />
            <Heading color="gray.600">{user?.name}</Heading>
          </Box>

          <Relationship user={user} />

          <Divider />
          {user.profile && (
            <Box p={3} w="max-auto">
              <Text whiteSpace="pre-wrap">{user?.profile}</Text>
            </Box>
          )}
        </Stack>
      </Box>
    );
  }
);
