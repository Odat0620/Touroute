import { memo, VFC } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";

type Props = {
  id: number;
  title: string;
  text: string;
  onClick: (id: number) => void;
};

export const PostCard: VFC<Props> = memo((props) => {
  const { id, title, text, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: "0.8" }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray">
          {text}
        </Text>
      </Stack>
    </Box>
  );
});