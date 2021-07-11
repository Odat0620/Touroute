import { ChangeEvent, memo, VFC } from "react";
import { ModalCloseButton, Textarea } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => Promise<void>;
};

export const CreateComment: VFC<Props> = memo((props) => {
  const { isOpen, onClose, value, onChange, onClick } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>コメントを作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea autoFocus value={value} onChange={onChange} />
          </ModalBody>

          <ModalFooter justifyContent="center">
            <PrimaryButton onClick={onClick}>送信</PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
