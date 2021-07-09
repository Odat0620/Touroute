import { memo, VFC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

import { currentUserType } from "../../types/currentUserType";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  currentUser: currentUserType | null | undefined;
  onClickSignUp: () => void;
  onClickSignIn: () => void;
  onClickSignOut: () => void;
  onClickMypage: (id: string) => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    currentUser,
    onClickSignUp,
    onClickSignIn,
    onClickSignOut,
    onClickMypage,
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            {currentUser ? (
              <>
                <Button w="100%" onClick={() => onClickMypage}>
                  マイページ
                </Button>
                <Button w="100%" onClick={onClickSignOut}>
                  ログアウト
                </Button>
              </>
            ) : (
              <>
                <Button w="100%" onClick={onClickSignIn}>
                  ログイン
                </Button>
                <Button w="100%" onClick={onClickSignUp}>
                  新規登録
                </Button>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
