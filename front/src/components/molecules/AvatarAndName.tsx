import { Avatar, Flex, Text } from "@chakra-ui/react";
import { VFC } from "react";

type Props = {
  name: string;
  avatarUrl?: string;
  onClick: () => void;
};

export const AvatarAndName: VFC<Props> = (props) => {
  const { name, avatarUrl, onClick } = props;

  return (
    <Flex align="center" cursor="pointer" onClick={onClick}>
      <Avatar
        h="40px"
        w="40px"
        src={avatarUrl}
        showBorder
        borderColor="gray.300"
      />
      <Text ml={2} fontWeight="bold" color="gray.600">
        {name}
      </Text>
    </Flex>
  );
};
