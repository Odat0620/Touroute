import { VFC } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { FocusableElement } from "@chakra-ui/utils";

type Props = {
  isOpen: boolean;
  cancelRef: React.RefObject<FocusableElement> | undefined;
  onClose: () => void;
  onClickDelete: () => Promise<void>;
};

export const DeletePostAlert: VFC<Props> = (props) => {
  const { isOpen, cancelRef, onClose, onClickDelete } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader textAlign="center" fontSize="lg" fontWeight="bold">
            投稿を削除
          </AlertDialogHeader>
          <AlertDialogBody textAlign="center">
            本当に削除しますか？
          </AlertDialogBody>
          <AlertDialogFooter justifyContent="center">
            <Button colorScheme="red" onClick={onClickDelete}>
              削除
            </Button>
            <Button ml={3} onClick={onClose}>
              キャンセル
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
