import { Button, ButtonProps } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = ButtonProps & {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Button
      bg="#fD9946"
      color="white"
      shadow="md"
      borderRadius="8px"
      transitio="all 0.3s"
      _hover={{ opacity: 0.8 }}
      _active={{
        bg: "#ca7a38",
        shadow: "inset 0 0 10px 1px rgba(120, 120, 100, 5)",
      }}
      textShadow="0 0 10px #ffaa44, 1px 1px 2px #582b00"
      {...props}
    >
      <Text>{children}</Text>
    </Button>
  );
});
