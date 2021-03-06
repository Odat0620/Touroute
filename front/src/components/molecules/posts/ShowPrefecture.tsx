import { VFC } from "react";
import { Flex, Tag, TagLabel } from "@chakra-ui/react";

import { PrefectureArray } from "../../../utils/PrefectureArray";

export const ShowPrefecture: VFC<{ prefectures: number[] }> = ({ prefectures }) => {
  return (
    <Flex>
      {prefectures.map((id) => (
        <Tag key={id} size="lg" borderRadius="6px" variant="subtle" colorScheme="green" m="3px">
          <TagLabel fontWeight="semibold">
            {PrefectureArray.find((prefecture) => prefecture.id === id)?.name}
          </TagLabel>
        </Tag>
      ))}
    </Flex>
  );
};
