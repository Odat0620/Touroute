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
  Divider,
} from "@chakra-ui/react";
import React, { useState, VFC, useCallback, useEffect, memo } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";

import { client } from "../../../lib/api/client";
import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useMessage } from "../../../hooks/useMessage";
import { useHistory } from "react-router-dom";
import { auth } from "../../../utils/Firebase";
import { DeleteAlert } from "../../organisms/DeleteAlert";
import { signInUserState } from "../../../store/auth";

export const EditUser: VFC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const [currentUser, setCurrentUser] = useRecoilState(signInUserState);

  const [avatar, setAvatar] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const userName = useInput(currentUser.name);
  const location = useInput(currentUser.location || "");
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
    if (location.value) formData.append("location", location.value);
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
      .then(({ data }) => {
        showMessage({ title: "?????????????????????", status: "success" });
        history.push(`/users/${id}`);
        setCurrentUser({
          id: data.id,
          email: data.email,
          name: data.name,
          profile: data.profile,
          location: data.location,
          uid: currentUser.uid,
          avatar: data.avatar,
        });
        setLoading(false);
      })
      .catch((error) => {
        showMessage({ title: "??????????????????????????????", status: "error" });
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
              title: "???????????????????????????????????????",
              status: "success",
            });
          })
          .catch((error) => {
            setLoading(false);
            showMessage({
              title: "????????????????????????????????????????????????",
              status: "error",
            });
          });
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          title: "????????????????????????????????????????????????",
          status: "error",
        });
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
      <Flex align="center" justify="center" px="0.5rem">
        <Box
          w={{ base: "full", md: "90%" }}
          my={{ base: "1rem", md: "2rem" }}
          p={{ base: "1rem", md: "1.5rem" }}
          bg="white"
          shadow="md"
          borderRadius="8px"
        >
          <Heading textAlign="center" mb={8}>
            ????????????????????????
          </Heading>
          <Stack justify="center" align="center" spacing="4rem">
            <Box w="full">
              <Stack>
                <Text fontWeight="bold">?????????????????????</Text>
                <Input {...userName} />
              </Stack>
            </Box>
            <Box w="full">
              <Stack>
                <Text fontWeight="bold">????????????</Text>
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
                    <Image src={preview} maxH="sm" maxw="sm" alt="preview img" />
                  </Box>
                ) : null}
              </Stack>
            </Box>
            <Box w="full">
              <Stack>
                <Text fontWeight="bold">??????????????????</Text>
                <Textarea {...profile} autoFocus />
              </Stack>
            </Box>
            <Box w="full">
              <Stack>
                <Text fontWeight="bold">????????????</Text>
                <Input {...location} />
              </Stack>
            </Box>

            <PrimaryButton isLoading={loading} onClick={onClickUpdate}>
              ??????
            </PrimaryButton>
            {currentUser.email !== process.env.REACT_APP_GUEST_EMAIL && (
              <>
                <Divider />

                <Button
                  colorScheme="red"
                  borderRadius={30}
                  isLoading={loading}
                  onClick={() => setIsOpen(true)}
                >
                  ?????????????????????
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Flex>

      <DeleteAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickDelete={onClickDeleteUser}
      >
        ????????????????????????
      </DeleteAlert>
    </>
  );
});
