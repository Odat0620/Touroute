import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import axios from "axios";
import { memo, useState, VFC } from "react";

import { useInput } from "../../../hooks/useInput";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { SingInParams } from "../../../types/api/user";
import { signIn } from "../../../lib/api/auth";
import Cookies from "js-cookie";

export const SignIn: VFC = memo(() => {
  const [loading, setLoading] = useState(false);

  const { showMessage } = useMessage();

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const email = useInput("");
  const password = useInput("");

  // 環境変数から呼び出したAPIのURLとログインルートを繋げてサインインURLを定義
  const SIGNIN_URL = process.env.REACT_APP_API_URL + "/v1/auth/sign_in";

  const params: SingInParams = {
    email: email.value,
    password: password.value,
  };

  // const onClickSignUP = () => {
  //   try {
  //     const res = await signIn(params)
  //     console.log(res)

  //     if (res.status === 200) {
  //       // ログインに成功した場合はCookieに各値を格納
  //       Cookies.set("_x_access_token", res.headers["x-access-token"])

  //     }
  //   }
  // }

  // ユーザー登録を行う関数
  const onClickSignUp = () => {
    setLoading(true);
    axios
      .post(SIGNIN_URL, {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        showMessage({ title: "アカウントを作成しました。", status: "success" });
        setLoading(false);
        console.log(res);
      })
      .catch(({ response }) => {
        const errorTitle: Array<string> = response.data.errors.full_messages;
        errorTitle.forEach((t) => {
          showMessage({
            title: `${t}`,
            status: "error",
          });
        });
        setLoading(false);
        console.log(response);
      });
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
            onClick={onClickSignUp}
          >
            登録
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
