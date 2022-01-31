import { Avatar, Flex, Text } from "@chakra-ui/react";
import { VFC, memo } from "react";

type Props = {
  name: string;
  avatarUrl?: string;
  onClick?: () => void;
  large?: true | undefined;
};

export const AvatarAndName: VFC<Props> = memo((props) => {
  const { name, avatarUrl, onClick, large } = props;

  return (
    <Flex align="center" cursor={onClick && "pointer"} onClick={onClick}>
      <Avatar
        h={large ? "60px" : "40px"}
        w={large ? "60px" : "40px"}
        src={avatarUrl || ""}
        showBorder
        borderColor="gray.300"
      />
      <Text ml={2} fontWeight="bold" color="gray.600" fontSize={large && "32px"}>
        {name}
      </Text>
    </Flex>
  );
});
