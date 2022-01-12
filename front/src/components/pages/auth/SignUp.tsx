import { memo, useState, VFC, useEffect } from "react";
import { useHistory } from "react-router";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";

import { useInput } from "../../../hooks/useInput";
import { useMessage } from "../../../hooks/useMessage";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { auth } from "../../../utils/Firebase";
import { client } from "../../../lib/api/client";
import { useAuthR } from "../../../hooks/api/useAuthR";

export const SignUp: VFC = memo(() => {
  const { currentUser } = useAuthR();

  const [loading, setLoading] = useState<boolean>(false);

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
      const user_data = { name: name.value, email: email.value };
      try {
        await client.post("users", user_data, config).then(({ data }) => {
          showMessage({
            title: "アカウントを作成しました。",
            status: "success",
          });
          console.log(data);
          history.push("/");
        });
      } catch (data: any) {
        showMessage({ title: `${data.data.errors}`, status: "error" });
        console.log(data);
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        showMessage({
          title: "そのメールアドレスはすでに使われています。",
          status: "error",
        });
      } else {
        showMessage({ title: "ユーザー登録に失敗しました。", status: "error" });
      }
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser.uid) {
      history.push("/");
    }
  }, [currentUser.uid, history]);

  // 入力欄が全て入力されたらfalse
  const disableSubmit: boolean = !name.value || !email.value || !password.value;

  return (
    <Flex align="center" justify="center" height="80vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input {...name} autoFocus placeholder="名前" borderRadius="50" />
          <Input
            type="email"
            {...email}
            placeholder="メールアドレス"
            borderRadius="50"
          />
          <Input
            type="password"
            {...password}
            placeholder="パスワード"
            borderRadius="50"
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
