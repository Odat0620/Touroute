import { VFC } from "react";
// import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
// import { Box, Divider, Flex, Heading, Stack, Wrap, WrapItem } from "@chakra-ui/layout";
// import { Menu, MenuButton, IconButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
// import { VscEllipsis } from "react-icons/vsc";

// import { PrimaryButton } from "../../atoms/button/PrimaryButton";
// import { CreatedAtArea } from "../../atoms/posts/CreatedAtArea";
// import { ShowPostImage } from "../../molecules/posts/ShowPostImage";
// import { AvatarAndName } from "../../molecules/users/AvatarAndName";
// import { ShowComment } from "../../organisms/comments/ShowComment";
// import { LikesAndCommtnts } from "../../organisms/posts/LikesAndCommtnts";
// import { RouteShow } from "../../organisms/posts/RouteShow";
import { PostType } from "../../../types/api/posts/PostType";
import { currentUserType } from "../../../types/currentUserType";

type Props = {
  post: PostType;
  currentUser: currentUserType;
  id: string;
  onClickUser: () => void;
  onClickEdit: () => void;
  onClickDelete: () => Promise<void>;
  onClickCreateComment: () => Promise<void>;
};

export const PostTemplate: VFC<Props> = (props) => {return (<></>)}
//   const { post, currentUser, id, onClickUser, onClickEdit, onClickDelete, onClickCreateComment } =
//     props;

//   return (
//     <Flex align="center" justify="center" direction="column">
//       <Box my={8} bg="white" p={8} borderRadius={6} shadow="md" w="70%">
//         <Stack justify="center" align="center" spacing={5}>
//           <Heading color="gray.700">{post?.title}</Heading>
//           <Flex align="center" justify="flex-end">
//             <CreatedAtArea createdAt={post.createdAt} />

//             <LikesAndCommtnts id={id} likes={post.likes} commentsCount={post.comments.length} />

//             <AvatarAndName
//               name={post.user.name}
//               avatarUrl={post.user.avatar.url}
//               onClick={onClickUser}
//             />

//             {post.user.uid === currentUser.uid && (
//               <Menu>
//                 <MenuButton
//                   as={IconButton}
//                   icon={<VscEllipsis />}
//                   variant="outline"
//                   ml="10px"
//                   h="30px"
//                   borderRadius="50"
//                 />
//                 <MenuList minW={100}>
//                   <MenuItem icon={<EditIcon />} onClick={onClickEdit}>
//                     編集
//                   </MenuItem>
//                   <MenuItem icon={<DeleteIcon />} color="red" onClick={() => setIsOpenDialog(true)}>
//                     削除
//                   </MenuItem>
//                 </MenuList>
//               </Menu>
//             )}
//           </Flex>
//           <Flex></Flex>
//           <Divider />
//           <Box w="full">
//             <Text textAlign="left" color="gray.700">
//               {post?.text}
//             </Text>
//           </Box>

//           {post.image && (
//             <ShowPostImage thumbUrl={post.image.thumb!.url} imageUrl={post.image.url!} />
//           )}

//           {route?.origin && <RouteShow origin={route?.origin} destination={route?.destination} />}
//         </Stack>
//       </Box>

//       <Box p={6} mb={8} borderRadius={6} align="center" bg="white" shadow="md" w="70%">
//         <Heading mb={3} as="h3" fontSize="x-large">
//           コメント一覧
//         </Heading>
//         {currentUser.uid && <PrimaryButton onClick={onOpen}>コメントする</PrimaryButton>}
//         <Divider my={5} />

//         {post?.comments?.length === 0 && (
//           <Text color="gray.500" py="20px">
//             コメントはありません。
//           </Text>
//         )}
//         <Wrap direction="column">
//           {post?.comments?.map((comment) => (
//             <WrapItem pb={3} key={comment.id}>
//               <ShowComment text={comment.text} createdAt={comment.createdAt} user={comment.user} />
//             </WrapItem>
//           ))}
//         </Wrap>
//       </Box>
//     </Flex>
//   );
// };
