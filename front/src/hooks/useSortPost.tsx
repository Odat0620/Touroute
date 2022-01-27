import { PostType } from "../types/api/posts/PostType";

export const useSortPost = (
  posts: PostType[] | null,
  sort: "likes" | "createdAt",
): PostType[] | null => {
  if (!posts) return null;

  let c_posts = posts.slice();
  const compare = (a: PostType, b: PostType) => {
    let sortA: number | Date = a.createdAt;
    let sortB: number | Date = b.createdAt;

    if (sort === "likes") {
      sortA = a.likes.length;
      sortB = b.likes.length;
    }

    let comparison = 0;
    if (sortA > sortB) {
      comparison = 1;
    } else if (sortA < sortB) {
      comparison = -1;
    }
    return comparison * -1;
  };

  return c_posts.sort(compare);
};
