import { Button } from "@chakra-ui/react";
import { memo } from "react";
import { VFC } from "react";

export const RelationshipButton: VFC<{
  isFollow: boolean;
  onClickCreateFollow: () => Promise<void>;
  onClickDeleteFollow: () => Promise<void>;
}> = memo(({ isFollow, onClickCreateFollow, onClickDeleteFollow }) => {
  return (
    <>
      <Button
        borderRadius="100"
        bg={isFollow ? "orange.300" : "white"}
        color={isFollow ? "white" : "orange.300"}
        borderColor={"orange.300"}
        borderWidth="2px"
        _hover={{ opacity: 0.8 }}
        onClick={isFollow ? onClickDeleteFollow : onClickCreateFollow}
      >
        {isFollow ? "フォロー中" : "フォロー"}
      </Button>
    </>
  );
});
