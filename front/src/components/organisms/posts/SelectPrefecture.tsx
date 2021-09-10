import { memo, useEffect, VFC } from "react";
import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import { PrefectureCheckBox } from "../../molecules/posts/PrefectureCheckBox";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { PrefectureArray } from "../../../utils/PrefectureArray";

type Props = {
  checkedPrefecture: Array<number>;
  setCheckedPrefecture: React.Dispatch<React.SetStateAction<Array<number>>>;
};

export const SelectPrefecture: VFC<Props> = memo((props) => {
  const { checkedPrefecture, setCheckedPrefecture } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (id: number, check: boolean) => {
    let c_checkedPrefecture = checkedPrefecture.slice();

    if (check) {
      if (c_checkedPrefecture.findIndex((prefId) => prefId === id) !== -1)
        return;
      setCheckedPrefecture([...checkedPrefecture, id]);
    } else {
      const deletePrefecture = c_checkedPrefecture.findIndex(
        (pref) => pref === id
      );
      if (deletePrefecture === -1) return;
      c_checkedPrefecture.splice(deletePrefecture, 1);
      setCheckedPrefecture(c_checkedPrefecture);
    }
  };

  const onClickCancel = (id: number) => {
    let c_checkedPrefecture = checkedPrefecture.slice();
    const deletePrefecture = c_checkedPrefecture.findIndex(
      (pref) => pref === id
    );
    if (deletePrefecture === -1) return;
    c_checkedPrefecture.splice(deletePrefecture, 1);
    setCheckedPrefecture(c_checkedPrefecture);
  };

  useEffect(() => {
    console.log(checkedPrefecture);
  }, [checkedPrefecture]);

  return (
    <>
      <PrimaryButton onClick={onOpen}>エリア選択</PrimaryButton>
      <Flex pb="50px">
        {checkedPrefecture.map((id) => (
          <Tag
            key={id}
            size="lg"
            borderRadius="full"
            variant="subtle"
            colorScheme="green"
            m="3px"
          >
            <TagLabel fontWeight="semibold">
              {PrefectureArray.find((prefecture) => prefecture.id === id)?.name}
            </TagLabel>
            <TagCloseButton onClick={() => onClickCancel(id)} />
          </Tag>
        ))}
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>エリアを選択する</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="full">
            <PrefectureCheckBox
              onChange={handleChange}
              checkedPrefecture={checkedPrefecture}
            />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={onClose}>完了</PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
