import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import axios from "axios";
import { memo, useState, VFC } from "react";

import { useInput } from "../../../hooks/useInput";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { Redirect } from "react-router";

export const SignUp: VFC = memo(() => {
  const [loading, setLoading] = useState(false);

  const { showMessage } = useMessage();

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");

  // 環境変数から呼び出したAPIのURLとユーザー登録ルートを繋げてサインアップURLを定義
  const SIGNUP_URL = process.env.REACT_APP_API_URL + "/v1/auth";

  // ユーザー登録を行う関数
  const onClickSignUp = () => {
    setLoading(true);
    axios
      .post(SIGNUP_URL, {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirm.value,
      })
      .then((res) => {
        showMessage({ title: "アカウントを作成しました。", status: "success" });
        setLoading(false);
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
  const disableSubmit: boolean =
    !name.value || !email.value || !password.value || !passwordConfirm.value;

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input {...name} autoFocus={true} placeholder="名前" />
          <Input {...email} placeholder="メールアドレス" />
          <Input type="password" {...password} placeholder="パスワード" />
          <Input
            type="password"
            {...passwordConfirm}
            placeholder="パスワード再入力"
          />
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