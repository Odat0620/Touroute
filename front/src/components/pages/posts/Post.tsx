import { memo, useEffect, useState, VFC, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  Text,
  Button,
  WrapItem,
  Wrap,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Heading } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import moment from "moment";

import { client } from "../../../lib/api/client";
import { PostType } from "../../../types/api/posts/PostType";
import { RouteShow } from "../../organisms/posts/RouteShow";
import { useTextarea } from "../../../hooks/useTextarea";
import { AuthContext } from "../../../providers/auth/AuthProvider";
import { useMessage } from "../../../hooks/useMessage";
import { CreateComment } from "../../organisms/comments/CreateComment";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { ShowComment } from "../../organisms/comments/ShowComment";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { DeletePostAlert } from "../../organisms/posts/DeletePostAlert";

export const Post: VFC = memo(() => {
  const { currentUser } = useContext(AuthContext);

  const [post, setPost] = useState<PostType>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const cancelRef = useRef<HTMLElement>(null);

  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const comment = useTextarea("");
  const { showMessage } = useMessage();

  const route = post?.route;

  const onClickUser = () => {
    history.push(`/users/${post?.userId}`);
  };

  const onClickEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const onClickDelete = async () => {
    await client
      .delete(`/posts/${id}`, { data: { userId: currentUser?.id } })
      .then((res) => {
        showMessage({ title: "削除しました。", status: "success" });
        console.log(res);
        history.push("/");
      })
      .catch(() => {
        showMessage({ title: "削除に失敗しました。", status: "error" });
      });
  };

  const onClickCreateComment = async () => {
    const data = {
      text: comment.value,
      post_id: id,
      user_id: currentUser?.id,
    };
    await client
      .post(`/posts/${id}/comments`, data)
      .then(({ data }) => {
        showMessage({ title: "コメントを投稿しました。", status: "success" });

        // コメント後、表示を更新する処理
        const postCopy = { ...post! };
        const newData = {
          ...data,
          user: { id: currentUser!.id, name: currentUser!.name },
        };
        postCopy!.comments!.push(newData);
        setPost(postCopy);

        onClose();
      })
      .catch(({ response }) => {
        console.log(response);
        showMessage({
          title: `コメント${response.data.text}`,
          status: "error",
        });
      });
  };

  useEffect(() => {
    client.get(`posts/${id}`).then(({ data }) => {
      setPost(data);
    });
  }, [id]);

  return (
    <>
      {post ? (
        <Flex align="center" justify="center" direction="column">
          <Box my={8} bg="white" p={8} borderRadius={6} shadow="md" w="70%">
            <Stack justify="center" align="center" spacing={5}>
              <Heading color="gray.700">{post?.title}</Heading>
              <Flex align="center" justify="flex-end">
                <Text mr={6} color="gray.500">
                  {moment(post?.createdAt).format("YYYY年MM月DD日 h:mm")}
                </Text>
                <Button onClick={onClickUser}>{post?.user.name}</Button>
                {post.userId === currentUser?.id && (
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<ChevronDownIcon />}
                      variant="outline"
                    />
                    <MenuList minW={100}>
                      <MenuItem icon={<EditIcon />} onClick={onClickEdit}>
                        編集
                      </MenuItem>
                      <MenuItem
                        icon={<DeleteIcon />}
                        color="red"
                        onClick={() => setIsOpenDialog(true)}
                      >
                        削除
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
              <Divider />
              <Box w="full">
                <Text textAlign="left" color="gray.700">
                  {post?.text}
                </Text>
              </Box>
              {route?.origin && (
                <RouteShow
                  origin={route?.origin}
                  destination={route?.destination}
                />
              )}
            </Stack>
          </Box>

          <Box
            p={6}
            borderRadius={6}
            align="center"
            bg="white"
            shadow="md"
            w="70%"
          >
            <Heading mb={3} as="h3" fontSize="x-large">
              コメント一覧
            </Heading>
            {currentUser && (
              <PrimaryButton onClick={onOpen}>コメントする</PrimaryButton>
            )}
            <Divider my={5} />

            {post?.comments?.length === 0 && (
              <Text color="gray.500">コメントはありません。</Text>
            )}
            <Wrap direction="column">
              {post?.comments?.map((comment) => (
                <WrapItem pb={3} key={comment.id}>
                  <ShowComment
                    text={comment.text}
                    createdAt={comment.createdAt}
                    user={comment.user}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Flex>
      ) : (
        <LoadingSpinner />
      )}

      <CreateComment
        isOpen={isOpen}
        onClose={onClose}
        {...comment}
        onClick={onClickCreateComment}
      />

      <DeletePostAlert
        isOpen={isOpenDialog}
        cancelRef={cancelRef}
        onClose={() => setIsOpenDialog(false)}
        onClickDelete={onClickDelete}
      />
    </>
  );
});
