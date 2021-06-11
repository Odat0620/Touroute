import { memo, useContext, VFC } from "react";
import { useHistory } from "react-router";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";

import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { useInput } from "../../../hooks/useInput";
import { useMessage } from "../../../hooks/useMessage";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { auth } from "../../../utils/Firebase";
import { AuthContext } from "../../../providers/auth/AuthProvider";

export const SignIn: VFC = memo(() => {
  // グローバル変数を持ってくる
  const { loading, setLoading } = useContext(LoginUserContext);
  const { user } = useContext(AuthContext);

  // フック使用準備
  const history = useHistory();
  const { showMessage } = useMessage();

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const email = useInput("");
  const password = useInput("");

  const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      history.push("/");
      showMessage({ title: "ログインしました。", status: "success" });
    } catch (error) {
      showMessage({ title: "ログインに失敗しました。", status: "error" });
      console.log(error);
    }
    setLoading(false);
  };

  if (user) {
    history.push("/");
  }

  // 入力欄が全て入力されたらfalse(ログインボタンが押せるようになる)
  const disableSubmit: boolean = !email.value || !password.value;

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input {...email} placeholder="メールアドレス" />
          <Input type="password" {...password} placeholder="パスワード" />
          <PrimaryButton
            disabled={disableSubmit}
            loading={loading}
            onClick={onClickSignIn}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
