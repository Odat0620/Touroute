import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router";

import { client } from "../../../lib/api/client";
import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { useAuthR } from "../../../hooks/useAuthR";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useHistory } from "react-router-dom";

export const EditUser: VFC = () => {
  const { id } = useParams<{ id: string }>();
  const signInUser = useAuthR();

  const userName = useInput(signInUser.name);
  const profile = useTextarea(signInUser.profile || "");
  const { showMessage } = useMessage();
  const history = useHistory();

  const onClickUpdate = () => {
    const userData = {
      name: userName.value,
      email: signInUser.email,
      profile: profile.value,
      uid: signInUser.uid,
    };
    client
      .patch(`users/${id}`, userData)
      .then((res) => {
        console.log(res);
        showMessage({ title: "保存しました。", status: "success" });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Flex align="center" justify="center" direction="column">
        <Box my={8} bg="white" p={8} borderRadius={6} shadow="md" w="70%">
          <Heading textAlign="center" mb={8}>
            プロフィール編集
          </Heading>
          <Stack justify="center" align="center" spacing={5}>
            <Box w="2xl" p={6} borderWidth="1px" borderRadius={6}>
              <Stack>
                <Text>ユーザーネーム</Text>
                <Input {...userName} autoFocus />
              </Stack>
            </Box>
            <Box w="2xl" p={6} borderWidth="1px" borderRadius={6}>
              <Stack>
                <Text>プロフィール</Text>
                <Textarea {...profile} />
              </Stack>
            </Box>

            <PrimaryButton onClick={onClickUpdate}>保存</PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
