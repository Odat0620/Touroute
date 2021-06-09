/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useContext, VFC } from "react";
import { useHistory } from "react-router";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import Cookies from "js-cookie";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { signOut } from "../../../lib/api/auth";
import { useMessage } from "../../../hooks/useMessage";

export const Header: VFC = memo(() => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(LoginUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage } = useMessage();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickMypage = useCallback(() => history.push("/mypage"), []);
  const onClickSignUp = useCallback(() => history.push("/signup"), []);
  const onClickSignIn = useCallback(() => history.push("/signin"), []);

  const onClickSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時にはCookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");
        showMessage({ title: "ログアウトしました。", status: "success" });
      } else {
        console.log("Failed in sign out");
      }
    } catch ({ response }) {
      console.log(response);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Flex flexGrow={2} display={{ base: "none", md: "flex" }}>
              <Spacer />
              <Box pr={2}>
                <Button mr={4} color="blue.500" onClick={onClickMypage}>
                  マイページ
                </Button>
                <Button color="blue.500" onClick={onClickSignOut}>
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
    } else {
      return <></>;
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
          <Heading as="h1" fontSize={{ base: "lg", md: 30 }}>
            Touroute
          </Heading>
        </Flex>

        <AuthButtons />
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} onClickHome={onClickHome} />
    </>
  );
});
