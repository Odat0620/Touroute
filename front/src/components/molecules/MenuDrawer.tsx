import { memo, VFC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Avatar, Divider } from "@chakra-ui/react";

import { currentUserType } from "../../types/currentUserType";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  currentUser: currentUserType | null | undefined;
  onClickSignUp: () => void;
  onClickSignIn: () => void;
  onClickSignOut: () => void;
  onClickMypage: () => void;
  onClickSetting: () => void;
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
    onClickSetting,
  } = props;

  return (
    <Drawer placement="right" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent bg="gray.100" color="gray.600">
          <DrawerCloseButton w="2rem" h="2rem" />
          <DrawerHeader
            pl="20px"
            display="flex"
            alignItems="center"
            justifyContent={currentUser?.id ? "start" : "center"}
          >
            {currentUser?.id ? (
              <>
                <Avatar
                  src={currentUser.avatar?.url || `${process.env.PUBLIC_URL}/defUserThumb.png`}
                  h="40px"
                  w="40px"
                  mr="10px"
                  showBorder
                  borderColor="gray.400"
                  size="full"
                />
                {currentUser.name}
              </>
            ) : (
              <>メニュー</>
            )}
          </DrawerHeader>
          <Divider borderColor="gray.300" />
          <DrawerBody p={0}>
            {currentUser?.id ? (
              <>
                <Button w="100%" py="2rem" onClick={onClickMypage}>
                  マイページ
                </Button>
                <Button w="100%" py="2rem" onClick={onClickSetting}>
                  プロフィール設定
                </Button>
                <Divider my="1rem" borderColor="gray.300" />
                <Button w="100%" py="2rem" onClick={onClickSignOut} color="red.600">
                  ログアウト
                </Button>
              </>
            ) : (
              <>
                <Button w="100%" py="2rem" onClick={onClickSignIn}>
                  ログイン
                </Button>
                <Button w="100%" py="2rem" onClick={onClickSignUp}>
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
