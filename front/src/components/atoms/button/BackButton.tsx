import { VFC } from "react";
import { Button, ButtonProps } from "@chakra-ui/button";

type Props = ButtonProps & {
  loading?: boolean;
  disabled?: boolean;
};

export const BackButton: VFC<Props> = (props) => {
  const { loading, disabled } = props;

  return (
    <Button
      bg="gray.400"
      color="white"
      shadow="md"
      _hover={{ opacity: 0.8 }}
      isLoading={loading}
      disabled={disabled || loading}
      {...props}
    />
  );
};
