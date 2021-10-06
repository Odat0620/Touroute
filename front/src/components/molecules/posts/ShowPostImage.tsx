import {
  Flex,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

type Props = {
  thumbUrl?: string;
  imageUrl?: string;
};

export const ShowPostImage: VFC<Props> = memo((props) => {
  const { thumbUrl, imageUrl } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Image
          borderRadius="8px"
          border="1px solid #aaa"
          cursor="pointer"
          onClick={onOpen}
          _hover={{ opacity: 0.8, shadow: "md" }}
          src={thumbUrl}
        />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            color="white"
            bg="gray.500"
            opacity="0.5"
            _hover={{ opacity: 0.8 }}
          />
          <Image src={imageUrl} />
        </ModalContent>
      </Modal>
    </>
  );
});
