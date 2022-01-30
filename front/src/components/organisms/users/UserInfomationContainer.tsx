import { memo, VFC } from "react";
import { Avatar, Box, Divider, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { Relationship } from "./Relationship";
import { UserType } from "../../../types/api/users/UserType";

export const UserInfomationContainer: VFC<{
  user: UserType;
}> = memo(({ user }) => {
  return (
    <Box
      w={{ base: "full", md: "30%" }}
      minW={{ md: "300px" }}
      h="80vh"
      p={{ base: "1rem", md: "1.5rem" }}
      minHeight="lg"
      bg="white"
      borderRadius={6}
      shadow="md"
    >
      <Stack justify="center" align="center" spacing={5}>
        <Box align="center">
          <Avatar size="xl" src={user.avatar?.url} showBorder borderColor="gray.300" />
          <Heading color="gray.600">{user?.name}</Heading>
        </Box>

        <Relationship user={user} />

        {user.location ? (
          <Stack w="full" p={3} border="1px solid #ddd" borderRadius="8px" position="relative">
            <Flex
              position="absolute"
              top="0"
              left="2px"
              px="6px"
              transform="translateY(-50%)"
              bg="white"
              align="center"
            >
              <Icon color="gray.500" as={HiOutlineLocationMarker} />
              <Text color="gray.500">活動地域</Text>
            </Flex>
            <Text>{user.location}</Text>
          </Stack>
        ) : (
          <Divider />
        )}

        {user.profile && (
          <>
            <Divider />
            <Box p={2} w="full">
              <Text whiteSpace="pre-wrap">{user?.profile}</Text>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
});
