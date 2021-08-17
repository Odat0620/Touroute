/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { Menu } from "@chakra-ui/menu";
import { IconButton, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useMessage } from "../../../hooks/useMessage";
import { auth } from "../../../utils/Firebase";
import { useAuthR } from "../../../hooks/useAuthR";

export const Header: VFC = memo(() => {
  const currentUser = useAuthR();

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

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (currentUser) {
      return (
        <>
          <Flex flexGrow={2} display={{ base: "none", md: "flex" }}>
            <Spacer />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
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
            <Box pr={2}>
              <Button
                mr={4}
                color="blue.800"
                _hover={{ opacity: 0.8 }}
                onClick={onClickSignUp}
              >
                アカウント登録
              </Button>
              <Button
                color="blue.800"
                _hover={{ opacity: 0.8 }}
                onClick={onClickSignIn}
              >
                ログイン
              </Button>
            </Box>
          </Flex>
        </>
      );
    }
  };

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
      >
        <Flex
          align="center"
          as="a"
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "lg", md: 30 }} ml={4}>
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
        onClickMypage={() => onClickMypage(currentUser?.id)}
      />
    </>
  );
});
