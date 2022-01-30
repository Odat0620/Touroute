import { memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Flex, Box, Stack, Text, WrapItem, Wrap, Divider, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { VscEllipsis } from "react-icons/vsc";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Heading } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { client } from "../../../lib/api/client";
import { PostType } from "../../../types/api/posts/PostType";
import { RouteShow } from "../../organisms/posts/RouteShow";
import { useTextarea } from "../../../hooks/useTextarea";
import { useMessage } from "../../../hooks/useMessage";
import { CreateComment } from "../../organisms/comments/CreateComment";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { ShowComment } from "../../organisms/comments/ShowComment";
import { DeleteAlert } from "../../organisms/DeleteAlert";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { AvatarAndName } from "../../molecules/users/AvatarAndName";
import { LikesAndCommtnts } from "../../organisms/posts/LikesAndCommtnts";
import { CreatedAtArea } from "../../atoms/posts/CreatedAtArea";
import { ShowPostImage } from "../../molecules/posts/ShowPostImage";
import { ShowPrefecture } from "../../molecules/posts/ShowPrefecture";
import { EditPostState } from "../../../store/post";
import { signInUserState } from "../../../store/auth";

export const Post: VFC = memo(() => {
  const currentUser = useRecoilValue(signInUserState);
  const [post, setPost] = useState<PostType>();
  const { id } = useParams<{ id: string }>();
  const setEditPost = useSetRecoilState(EditPostState);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenDeleteComment, setIsOpenDeleteComment] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const comment = useTextarea("");
  const { showMessage } = useMessage();

  const route = post?.route;

  const onClickUser = () => {
    history.push(`/users/${post?.userId}`);
  };
  const onClickEdit = async (p: PostType) => {
    await setEditPost({
      id: p.id,
      title: p.title,
      text: p.text,
      route: p.route,
      userId: p.userId,
      prefecture: p.prefecture,
      image: p.image,
    });

    history.push(`/posts/${id}/edit`);
  };

  const onClickDelete = async () => {
    await client
      .delete(`/posts/${id}`, { data: { userId: currentUser.id } })
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
      user_id: currentUser.id,
    };
    await client
      .post(`/posts/${id}/comments`, data)
      .then(({ data }) => {
        showMessage({ title: "コメントを投稿しました。", status: "success" });

        // コメント後、表示を更新する処理
        const postCopy = { ...post! };
        const newData = {
          ...data,
          user: {
            id: currentUser.id,
            name: currentUser.name,
            avatar: currentUser?.avatar,
          },
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

  const onClickDeleteComment = async (commentId: number, index: number) => {
    await client
      .delete(`/posts/${id}/comments/${commentId}`, { data: { userId: currentUser.id } })
      .then((res) => {
        showMessage({ title: "削除しました。", status: "success" });
        let postCopy = { ...post! };
        postCopy.comments.splice(index, 1);
        setPost(postCopy);
        setIsOpenDeleteComment(false);
      })
      .catch(() => {
        showMessage({ title: "削除に失敗しました。", status: "error" });
      });
  };

  useEffect(() => {
    client.get(`posts/${id}`).then(({ data }) => {
      setPost(data);
      console.log(data);
    });
  }, [id]);

  return (
    <>
      {post ? (
        <Flex align="center" justify="center" direction="column" px="0.5rem">
          <Box
            w={{ base: "full", md: "90%" }}
            my={{ base: "1rem", md: "2rem" }}
            p={{ base: "1rem", md: "1.5rem" }}
            bg="white"
            borderRadius="8px"
            shadow="md"
          >
            <Stack justify="center" align="center" spacing="1.25rem">
              <Heading color="gray.700">{post?.title}</Heading>
              <Stack
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="flex-end"
                spacing={{ base: "0.5rem", md: "" }}
              >
                <Flex>
                  <CreatedAtArea createdAt={post.createdAt} />

                  <LikesAndCommtnts
                    id={id}
                    likes={post.likes}
                    commentsCount={post.comments.length}
                  />
                </Flex>

                <Flex align="center">
                  <AvatarAndName
                    name={post.user.name}
                    avatarUrl={post.user.avatar.url}
                    onClick={onClickUser}
                  />

                  {post.user.uid === currentUser.uid && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<VscEllipsis />}
                        variant="outline"
                        ml="10px"
                        h="30px"
                        borderRadius="50"
                      />
                      <MenuList minW={100}>
                        <MenuItem icon={<EditIcon />} onClick={() => onClickEdit(post)}>
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
              </Stack>
              {post.prefecture && <ShowPrefecture prefectures={post.prefecture} />}

              {post.image && (
                <ShowPostImage thumbUrl={post.image.thumb!.url} imageUrl={post.image.url!} />
              )}
              <Divider />
              <Box w="full">
                <Text textAlign="left" color="gray.700">
                  {post?.text}
                </Text>
              </Box>

              {route?.origin && (
                <RouteShow origin={route?.origin} destination={route?.destination} />
              )}
            </Stack>
          </Box>

          <Box
            w={{ base: "full", md: "90%" }}
            my={{ base: "1rem", md: "2rem" }}
            p={{ base: "1rem", md: "1.5rem" }}
            bg="white"
            align="center"
            borderRadius="8px"
            shadow="md"
          >
            {" "}
            <Heading mb={3} as="h3" fontSize="x-large" color="gray.600">
              コメント一覧
            </Heading>
            {currentUser.uid && <PrimaryButton onClick={onOpen}>コメントする</PrimaryButton>}
            <Divider my={5} />
            {post?.comments?.length === 0 && (
              <Text color="gray.500" py="20px">
                コメントはありません。
              </Text>
            )}
            <Wrap direction="column">
              {post?.comments?.map((comment, index) => (
                <WrapItem pb={3} key={comment.id}>
                  <ShowComment
                    text={comment.text}
                    createdAt={comment.createdAt}
                    user={comment.user}
                    isOpen={isOpenDeleteComment}
                    setIsOpen={setIsOpenDeleteComment}
                    onClickDelete={() => onClickDeleteComment(comment.id, index)}
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

      <DeleteAlert
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onClickDelete={onClickDelete}
      >
        投稿を削除
      </DeleteAlert>
    </>
  );
});
