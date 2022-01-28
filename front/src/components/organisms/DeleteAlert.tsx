import { ReactNode, useRef, VFC } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

import { BackButton } from "../atoms/button/BackButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  children: ReactNode;
};

export const DeleteAlert: VFC<Props> = (props) => {
  const { isOpen, onClose, onClickDelete, children } = props;
  const cancelRef = useRef<HTMLElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader textAlign="center" fontSize="lg" fontWeight="bold">
            {children}
          </AlertDialogHeader>
          <AlertDialogBody textAlign="center">本当に削除しますか？</AlertDialogBody>
          <AlertDialogFooter justifyContent="center">
            <Button colorScheme="red" onClick={onClickDelete}>
              削除
            </Button>
            <BackButton autoFocus ml={3} onClick={onClose}>
              キャンセル
            </BackButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
