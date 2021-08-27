import { memo, VFC } from "react";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";

import { PostCard } from "./PostCard";
import { PostType } from "../../../types/api/posts/PostType";

export const PostsContainer: VFC<{
  posts?: Array<PostType>;
  userName?: string;
  avatarUrl?: string;
  onClick: (id: number) => void;
}> = memo(({ posts, userName, avatarUrl, onClick }) => {
  return (
    <>
      {posts?.length === 0 && <Text color="gray.500">投稿はありません</Text>}
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {posts?.map((post) => (
          <WrapItem key={post.id}>
            <PostCard
              id={post.id}
              title={post.title}
              image={post.image?.thumb?.url}
              createdAt={post.createdAt}
              commentsCount={post.comments!.length}
              likes={post.likes!}
              name={userName || post.user.name}
              userId={post.userId}
              avatarUrl={avatarUrl || post.user.avatar?.thumb.url}
              onClick={() => onClick(post.id)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
});