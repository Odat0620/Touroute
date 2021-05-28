import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import { memo, VFC } from "react";

import { useInput } from "../../../hooks/useInput";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const SignUp: VFC = memo(() => {
  // 変数にカスタムフックを設定、中身はvalueとonChange
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const password_confirm = useInput("");


  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input {...name} placeholder="名前" />
          <Input {...email} placeholder="メールアドレス" />
          <Input type="password" {...password} placeholder="パスワード" />
          <Input
            type="password"
            {...password_confirm}
            placeholder="パスワード再入力"
          />
          <PrimaryButton>登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
