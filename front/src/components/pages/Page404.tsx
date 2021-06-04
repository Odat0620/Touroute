import { Heading } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { Link } from "react-router-dom";

export const Page404: VFC = memo(() => {
  return (
    <div>
      <Heading as="h1">ページが見つかりません</Heading>
      <Link to="/">TOPに戻る</Link>
    </div>
  );
});
