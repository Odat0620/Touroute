/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Menu } from "@chakra-ui/menu";
import { Avatar, Divider, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useMessage } from "../../../hooks/useMessage";
import { auth } from "../../../utils/Firebase";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { signInUserState } from "../../../store/auth";

export const Header: VFC = memo(() => {
  const currentUser = useRecoilValue(signInUserState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage } = useMessage();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickMypage = useCallback((id) => {
    history.push(`/users/${id}`);
    onClose();
  }, []);
  const onClickSignUp = useCallback(() => {
    history.push("/signup");
    onClose();
  }, []);
  const onClickSignIn = useCallback(() => {
    history.push("/signin");
    onClose();
  }, []);
  const onClickSetting = useCallback((id) => {
    history.push(`/users/edit/${id}`);
    onClose();
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
    onClose();
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
                icon={<Avatar src={currentUser.avatar?.url} showBorder size="full" />}
                variant="outline"
                _hover={{ bg: "gray.400", opacity: 0.8 }}
              />
              <MenuList minW={100}>
                <MenuItem color="gray.600" onClick={() => onClickMypage(currentUser.id)}>
                  マイページ
                </MenuItem>
                <MenuItem color="gray.600" onClick={() => onClickSetting(currentUser.id)}>
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
              <PrimaryButton onClick={onClickSignUp}>アカウント登録</PrimaryButton>
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
        padding="2"
        shadow="md"
        pos="sticky"
        top="0"
        zIndex="1000"
        w="100%"
      >
        <Flex align="center" as="a" _hover={{ cursor: "pointer" }} onClick={onClickHome}>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "30px" }}
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
        onClickSetting={() => onClickSetting(currentUser.id)}
      />
    </>
  );
});
