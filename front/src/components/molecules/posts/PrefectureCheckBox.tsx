import { Box, Checkbox } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { VFC, memo, ChangeEvent } from 'react';

import {
  PrefectureArray,
  PrefectureDivision,
} from "../../../utils/PrefectureArray";

export const PrefectureCheckBox: VFC<{
  onChange: (e: ChangeEvent<HTMLInputElement>, id: number, check: boolean) => void;
  checkedPrefecture: Array<number>;
}> = memo(({ onChange, checkedPrefecture }) => {
  return (
    <>
      <Accordion allowMultiple>
        {PrefectureDivision.map((region) => (
          <AccordionItem key={region}>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                color="gray.600"
              >
                {region}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel>
              {PrefectureArray.map(
                (prefecture) =>
                  region === prefecture.region && (
                    <Checkbox
                      key={prefecture.id}
                      border="1px solid #ccc"
                      borderRadius="10px"
                      m="5px"
                      py="1px"
                      px="5px"
                      colorScheme="green"
                      isChecked={checkedPrefecture.some(
                        (id) => id === prefecture.id
                      )}
                      onChange={(e) =>
                        onChange(e, prefecture.id, e.target.checked)
                      }
                    >
                      {prefecture.name.length === 3
                        ? "　" + prefecture.name
                        : prefecture.name}
                    </Checkbox>
                  )
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
});
