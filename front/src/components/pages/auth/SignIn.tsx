import { memo, useContext, VFC } from "react";
import { useHistory } from "react-router";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import Cookies from "js-cookie";

import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { useInput } from "../../../hooks/useInput";
import { useMessage } from "../../../hooks/useMessage";
import { SingInParams } from "../../../types/api/user";
import { signIn } from "../../../lib/api/auth";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const SignIn: VFC = memo(() => {
  // グローバル変数を持ってくる
  const { loading, setLoading, setIsSignedIn, setCurrentUser } =
    useContext(LoginUserContext);

  // フック使用準備
  const history = useHistory();
  const { showMessage } = useMessage();

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const email = useInput("");
  const password = useInput("");

  // ログインする関数
  const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const params: SingInParams = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        history.push("/");
        showMessage({ title: "ログインしました。", status: "success" });
        setLoading(false);
        console.log(res.headers);
      }
    } catch ({ response }) {
      const errorTitle: Array<string> = response.data.errors;
      showMessage({ title: `${errorTitle}`, status: "error" });
      setLoading(false);
      console.log(errorTitle);
    }
  };

  // 入力欄が全て入力されたらfalse
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
