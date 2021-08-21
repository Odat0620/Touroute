import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false, loading = false, onClick } = props;
  return (
    <Button
      bg="#fD9946"
      color="white"
      shadow="md"
      borderRadius="50"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
      textShadow="0 0 10px #ffaa44, 1px 1px 2px #582b00"
    >
      <Text>{children}</Text>
    </Button>
  );
});
