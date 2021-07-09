/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useContext, VFC } from "react";
import { useHistory } from "react-router";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useMessage } from "../../../hooks/useMessage";
import { AuthContext } from "../../../providers/auth/AuthProvider";
import { auth } from "../../../utils/Firebase";

export const Header: VFC = memo(() => {
  const { currentUser, setCurrentUser, user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage } = useMessage();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickMypage = useCallback((id) => history.push(`/users/${id}`), []);
  const onClickSignUp = useCallback(() => history.push("/signup"), []);
  const onClickSignIn = useCallback(() => history.push("/signin"), []);

  const onClickSignOut = async () => {
    try {
      await auth.signOut();
      // ログアウト時currentUserをundefinedにする
      setCurrentUser(undefined);
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
    if (user) {
      return (
        <>
          <Flex flexGrow={2} display={{ base: "none", md: "flex" }}>
            <Spacer />
            <Box pr={2}>
              <Button
                mr={4}
                color="blue.500"
                onClick={() => onClickMypage(currentUser?.id)}
              >
                マイページ
              </Button>
              <Button onClick={onClickSignOut} color="blue.500">
                ログアウト
              </Button>
            </Box>
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
                color="blue.500"
                _hover={{ opacity: 0.8 }}
                onClick={onClickSignUp}
              >
                アカウント登録
              </Button>
              <Button
                color="blue.500"
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
        bg="blue.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 2, md: 2 }}
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
