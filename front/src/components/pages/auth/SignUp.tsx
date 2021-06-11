import { memo, useContext, VFC } from "react";
import { useHistory } from "react-router";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";

import { useInput } from "../../../hooks/useInput";
import { useMessage } from "../../../hooks/useMessage";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { AuthContext } from "../../../providers/auth/AuthProvider";
import { auth } from "../../../utils/Firebase";
import { client } from "../../../lib/api/client";
import { LoginUserContext } from "../../../providers/LoginUserProvider";

export const SignUp: VFC = memo(() => {
  // グローバルステートを持ってくる
  const { user } = useContext(AuthContext);
  const { loading, setLoading } = useContext(LoginUserContext);

  // フック使用準備
  const { showMessage } = useMessage();
  const history = useHistory();

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");

  const onClickSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
      const token = await auth.currentUser?.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      const user = { name: name.value, email: email.value };
      try {
        await client.post("users", user, config).then((res) => {
          showMessage({
            title: "アカウントを作成しました。",
            status: "success",
          });
          console.log(res.data);
        });
      } catch ({ response }) {
        showMessage({ title: `${response.data.errors}`, status: "error" });
        console.log(response);
      }
      history.push("/");
    } catch (error) {
      showMessage({ title: "ユーザー登録に失敗しました。", status: "error" });
      console.log(error);
    }
    setLoading(false);
  };

  // ユーザーが存在する場合はトップページへ遷移
  if (user) {
    history.push("/");
  }

  // 入力欄が全て入力されたらfalse
  const disableSubmit: boolean = !name.value || !email.value || !password.value;

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
