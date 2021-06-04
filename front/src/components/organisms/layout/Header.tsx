/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from "react";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { useHistory } from "react-router";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { Button } from "@chakra-ui/button";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickSignUp = useCallback(() => history.push("/signup"), []);
  const onClickSignIn = useCallback(() => history.push("/signin"), []);

  return (
    <>
      <Flex
        as="nav"
        bg="blue.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 4 }}
      >
        <Flex
          align="center"
          as="a"
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: 30 }}>
            Touroute
          </Heading>
        </Flex>
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
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} onClickHome={onClickHome} />
    </>
  );
});
