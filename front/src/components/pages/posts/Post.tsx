import { memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/layout";
import moment from "moment";

import { client } from "../../../lib/api/client";
import { PostType } from "../../../types/PostType";
import { RouteShow } from "../../organisms/posts/RouteShow";
import { Flex, Box, Stack, Text, Button, Link } from "@chakra-ui/react";

export const Post: VFC = memo(() => {
  const [post, setPost] = useState<PostType>();
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const route = post?.route;

  const onClickUser = () => {
    history.push(`/users/${post?.userId}`);
  };

  useEffect(() => {
    client.get(`posts/${id}`).then(({ data }) => {
      setPost(data);
      console.log(data);
    });
  }, [id]);

  return (
    <>
      <Flex align="center" justify="center">
        <Box bg="white" p={8} shadow="md">
          <Stack justify="center" align="center" spacing={5}>
            <Heading>{post?.title}</Heading>
            <Flex>
              <Text>
                {moment(post?.createdAt).format("YYYY年MM月DD日 h:mm")}
              </Text>
              <Button onClick={onClickUser}>{post?.user.name}</Button>
            </Flex>
            <Text>{post?.text}</Text>
            {route?.origin && (
              <RouteShow
                origin={route?.origin}
                destination={route?.destination}
              />
            )}
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
