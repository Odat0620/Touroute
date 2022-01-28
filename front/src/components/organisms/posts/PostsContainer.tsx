import { memo, VFC } from "react";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";

import { PostCard } from "./PostCard";
import { PostCardType } from "../../../types/api/posts/PostType";

export const PostsContainer: VFC<{
  posts?: Array<PostCardType>;
  userName?: string;
  avatarUrl?: string;
  onClick: (id: number) => void;
}> = memo(({ posts, userName, avatarUrl, onClick }) => {
  return (
    <>
      {posts?.length === 0 ? (
        <Text color="gray.500" align="center">
          投稿はありません
        </Text>
      ) : (
        <Wrap p={{ base: 2, md: 2 }} justify="center">
          {posts!.map((post) => (
            <WrapItem key={post.id}>
              <PostCard
                id={post.id}
                title={post.title}
                image={post.image?.thumb?.url}
                createdAt={post.createdAt}
                prefectures={post.prefecture}
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
      )}
    </>
  );
});
