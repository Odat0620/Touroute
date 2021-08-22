import { VFC } from "react";
import moment from "moment";
import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

export const CreatedAtArea: VFC<{ createdAt: Date }> = ({ createdAt }) => {
  return (
    <>
      <Tooltip label="投稿日時" bg="gray.400" fontSize="11px">
        <Flex align="center">
          <TimeIcon mr={1} color="gray.500" />
          <Text mr={6} color="gray.500">
            {moment(createdAt).format("YYYY年MM月DD日 H:mm")}
          </Text>
        </Flex>
      </Tooltip>
    </>
  );
};
