import { memo, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";

type Props = {
  text: string;
  createdAt: Date;
  user: { id: number; name: string };
};

export const ShowComment: VFC<Props> = memo((props) => {
  const { text, createdAt, user } = props;

  const history = useHistory();

  const onClickUser = () => {
    history.push(`/users/${user.id}`);
  };

  return (
    <Box w="100%" pt={4} px={6} bg="blue.50" borderRadius={8}>
      <Text color="gray.700" textAlign="left">
        {text}
      </Text>
      <Flex justify="flex-end" align="center" my={3}>
        <Text mr={6} color="gray.500">
          {moment(createdAt).format("YYYY年MM月DD日 H:mm")}
        </Text>
        <Button onClick={onClickUser}>{user.name}</Button>
      </Flex>
    </Box>
  );
});
