/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Menu } from "@chakra-ui/menu";
import {
  Avatar,
  Divider,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useMessage } from "../../../hooks/useMessage";
import { auth } from "../../../utils/Firebase";
import { useAuthR } from "../../../hooks/api/useAuthR";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const Header: VFC = memo(() => {
  const { currentUser } = useAuthR();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage } = useMessage();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickMypage = useCallback((id) => history.push(`/users/${id}`), []);
  const onClickSignUp = useCallback(() => history.push("/signup"), []);
  const onClickSignIn = useCallback(() => history.push("/signin"), []);
  const onClickUserEdit = useCallback((id) => {
    history.push(`/users/edit/${id}`);
  }, []);

  const onClickSignOut = async () => {
    try {
      await auth.signOut();
      history.push("/");
      showMessage({ title: "ログアウトしました。", status: "success" });
    } catch (error) {
      showMessage({ title: "ログアウトできませんでした", status: "error" });
      console.log(error);
    }
  };

  // 認証完了後はサインアウト用のボタンを表示
  // 未認証時は認証用のボタンを表示
  const AuthButtons = memo(() => {
    if (currentUser.uid) {
      return (
        <>
          <Flex flexGrow={2} display={{ base: "none", md: "flex" }}>
            <Spacer />
            <Menu>
              <MenuButton
                h="40px"
                w="40px"
                mr={6}
                cursor="pointer"
                as={Avatar}
                icon={
                  <Avatar
                    src={currentUser.avatar?.url}
                    showBorder
                    size="full"
                  />
                }
                variant="outline"
                _hover={{ bg: "gray.400", opacity: 0.8 }}
              />
              <MenuList minW={100}>
                <MenuItem
                  color="gray.600"
                  onClick={() => onClickMypage(currentUser.id)}
                >
                  マイページ
                </MenuItem>
                <MenuItem
                  color="gray.600"
                  onClick={() => onClickUserEdit(currentUser.id)}
                >
                  プロフィール設定
                </MenuItem>
                <Divider />
                <MenuItem color="red" onClick={onClickSignOut}>
                  ログアウト
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </>
      );
    } else {
      return (
        <>
          <Flex flexGrow={2} display={{ base: "none", md: "flex" }}>
            <Spacer />
            <Flex pr={2} align="center">
              <PrimaryButton onClick={onClickSignUp}>
                アカウント登録
              </PrimaryButton>
              <Text mx="6px">or</Text>
              <PrimaryButton onClick={onClickSignIn}>ログイン</PrimaryButton>
            </Flex>
          </Flex>
        </>
      );
    }
  });

  return (
    <>
      <Flex
        as="nav"
        bg="blue.800"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 2, md: 2 }}
        shadow="md"
        pos="sticky"
        top="0"
        zIndex="1000"
        w="100%"
      >
        <Flex
          align="center"
          as="a"
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading
            as="h1"
            fontSize={{ base: "lg", md: 30 }}
            ml={4}
            transition="all 0.3s"
            _hover={{ textShadow: "0px 0px 10px #aaa" }}
          >
            Touroute
          </Heading>
        </Flex>

        <AuthButtons />
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        currentUser={currentUser}
        onClickSignUp={onClickSignUp}
        onClickSignIn={onClickSignIn}
        onClickSignOut={onClickSignOut}
        onClickMypage={() => onClickMypage(currentUser.id)}
      />
    </>
  );
});
