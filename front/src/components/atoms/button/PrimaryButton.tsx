import { Button } from "@chakra-ui/button";
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
      bg="blue.500"
      color="white"
      shadow="md"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
