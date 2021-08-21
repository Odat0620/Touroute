import { VFC } from "react";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";

type Props = {
  commentsCount?: number;
};

export const CommentsCount: VFC<Props> = (props) => {
  const { commentsCount } = props;

  return (
    <Tooltip label="コメント" bg="gray.400" fontSize="11px">
      <Flex align="center" mr="10px">
        <Icon mr="3px" fontSize="22px" color="gray.500" as={BiCommentDetail} />
        <Text color="gray.600">{commentsCount}</Text>
      </Flex>
    </Tooltip>
  );
};
