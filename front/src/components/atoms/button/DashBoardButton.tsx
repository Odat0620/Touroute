import { ReactNode, VFC } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

type Props = FlexProps & {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
};

export const DashBoardButton: VFC<Props> = (props) => {
  const { children, onClick, icon } = props;
  return (
    <Flex
      w="full"
      py="0.25rem"
      pl="1em"
      color="gray.600"
      fontWeight="bold"
      fontSize="xl"
      _hover={{ cursor: "pointer", bg: "gray.200" }}
      onClick={onClick}
      {...props}
      align="center"
    >
      <Flex mr="0.5rem">{icon}</Flex>
      {children}
    </Flex>
  );
};
