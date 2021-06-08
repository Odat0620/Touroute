import { memo, useContext, VFC } from "react";
import { useHistory } from "react-router";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import Cookies from "js-cookie";

import { LoginUserContext } from "../../../providers/LoginUserProvider";
import { useInput } from "../../../hooks/useInput";
import { useMessage } from "../../../hooks/useMessage";
import { SingUpParams } from "../../../types/api/user";
import { signUp } from "../../../lib/api/auth";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const SignUp: VFC = memo(() => {
  // グローバルステートを持ってくる
  const { loading, setLoading, setIsSignedIn, setCurrentUser } =
    useContext(LoginUserContext);

  // フック使用準備
  const { showMessage } = useMessage();
  const history = useHistory();

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");

  // ユーザー登録をする関数
  const onClickSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const params: SingUpParams = {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirm.value,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログイン
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        history.push("/");
        showMessage({ title: "アカウントを作成しました", status: "success" });
        setLoading(false);
      } else {
        showMessage({ title: "ユーザー登録に失敗しました。", status: "error" });
        setLoading(false);
      }
    } catch ({ response }) {
      const errorTitle: Array<string> = response.data.errors;
      showMessage({ title: `${errorTitle}`, status: "error" });
      setLoading(false);
    }
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
