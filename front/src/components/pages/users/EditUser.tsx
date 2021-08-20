import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import React, { useState, VFC, useCallback } from "react";
import { useParams } from "react-router";

import { client } from "../../../lib/api/client";
import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { useAuthR } from "../../../hooks/useAuthR";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useHistory } from "react-router-dom";
import { auth } from "../../../utils/Firebase";
import { DeleteAlert } from "../../organisms/DeleteAlert";
import { useEffect } from "react";

export const EditUser: VFC = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAuthR();

  const [avatar, setAvatar] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const userName = useInput(currentUser.name);
  const profile = useTextarea(currentUser.profile || "");

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showMessage } = useMessage();
  const history = useHistory();

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setAvatar(file);
  }, []);

  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(window.URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }, []);

  const createFormData = () => {
    const formData = new FormData();

    formData.append("name", userName.value);
    if (profile.value) formData.append("profile", profile.value);
    if (avatar) formData.append("avatar", avatar);
    formData.append("email", currentUser.email!);
    formData.append("uid", currentUser.uid);

    return formData;
  };

  const onClickUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = createFormData();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await client
      .patch(`users/${id}`, data, config)
      .then((res) => {
        console.log(res);
        showMessage({ title: "保存しました。", status: "success" });
        history.push(`/users/${id}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showMessage({ title: "保存に失敗しました。", status: "error" });
        setLoading(false);
      });
  };

  const onClickDeleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;

    user
      ?.delete()
      .then(() => {
        client
          .delete(`users/${id}`, {
            params: {
              uid: currentUser.uid,
            },
          })
          .then(() => {
            setLoading(false);
            showMessage({
              title: "アカウントを削除しました。",
              status: "success",
            });
          })
          .catch((error) => {
            setLoading(false);
            showMessage({
              title: "アカウントを削除に失敗しました。",
              status: "error",
            });
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          title: "アカウントを削除に失敗しました。",
          status: "error",
        });
        console.log(error);
      });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!currentUser.uid) {
      history.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

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
                <Input {...userName} />
              </Stack>
            </Box>
            <Box w="2xl" p={6} borderWidth="1px" borderRadius={6}>
              <Stack>
                <Text>アバター</Text>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    uploadImage(e);
                    previewImage(e);
                  }}
                />
                {preview ? (
                  <Box>
                    <CloseButton onClick={() => setPreview("")} />
                    <Image src={preview} alt="preview img" />
                  </Box>
                ) : null}
              </Stack>
            </Box>
            <Box w="2xl" p={6} borderWidth="1px" borderRadius={6}>
              <Stack>
                <Text>プロフィール</Text>
                <Textarea {...profile} autoFocus />
              </Stack>
            </Box>

            <PrimaryButton loading={loading} onClick={onClickUpdate}>
              保存
            </PrimaryButton>

            <Button colorScheme="red" onClick={() => setIsOpen(true)}>
              アカウント削除
            </Button>
          </Stack>
        </Box>
      </Flex>

      <DeleteAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickDelete={onClickDeleteUser}
      >
        アカウントの削除
      </DeleteAlert>
    </>
  );
};
