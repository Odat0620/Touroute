import { memo, useState, VFC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Flex, Box, Stack, Heading, CloseButton, Image, HStack } from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { RouteCreate } from "../../organisms/posts/RouteCreate";
import { latLngType } from "../../../types/api/posts/latLngType";
import { useMessage } from "../../../hooks/useMessage";
import { client } from "../../../lib/api/client";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SelectPrefecture } from "../../organisms/posts/SelectPrefecture";
import { EditPostState } from "../../../store/post";
import { BackButton } from "../../atoms/button/BackButton";
import { signInUserState } from "../../../store/auth";

export const EditPost: VFC = memo(() => {
  const currentUser = useRecoilValue(signInUserState);
  const post = useRecoilValue(EditPostState);
  const resetPost = useResetRecoilState(EditPostState);

  // stateを定義
  const [origin, setOrigin] = useState<latLngType | null>(post.route.origin || null);
  const [destination, setDestination] = useState<latLngType | null>(post.route.destination || null);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [checkedPrefecture, setCheckedPrefecture] = useState<Array<number>>(post.prefecture || []);
  const [preview, setPreview] = useState<string>(post.image.url || "");

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const title = useInput(post.title);
  const text = useTextarea(post.text);

  // 画像の追加とプレビューの処理
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(window.URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }, []);

  // フックの読み込み
  const history = useHistory();
  const { showMessage } = useMessage();

  const createFormData = () => {
    const formData = new FormData();

    formData.append("title", title.value);
    if (text.value) formData.append("text", text.value);
    if (image) formData.append("image", image);

    if (checkedPrefecture) {
      checkedPrefecture.forEach((id) => {
        // eslint-disable-next-line no-useless-concat
        formData.append("prefecture" + "[]", JSON.stringify(id));
      });
    }

    formData.append("user_id", JSON.stringify(currentUser.id));
    formData.append("route", JSON.stringify({ origin, destination }));

    return formData;
  };

  // 投稿作成の処理
  const onClickPatch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoadingButton(true);

    const data = createFormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    try {
      await client
        .patch(`posts/${post.id}`, data, config)
        .then((res) => {
          showMessage({
            title: "更新しました。",
            status: "success",
          });
          console.log(res);
          resetPost();
          history.push("/");
        })
        .catch(({ response }) => {
          showMessage({
            title: `タイトル${response.data.title}`,
            status: "error",
          });
          console.log(response);
        });
    } catch (res) {
      showMessage({ title: "更新できませんでした。", status: "error" });
      console.log(res);
    }
    setLoadingButton(false);
  };

  const goBack = () => {
    resetPost();
    history.goBack();
  };

  return (
    <>
      <Flex align="center" justify="center">
        <Box bg="white" p={8} shadow="md" my="8" borderRadius={6}>
          <Stack justify="center" align="center" spacing={5}>
            <Heading color="gray.600" textAlign="center" mb="8">
              ツーリング記録を編集
            </Heading>
            <Input {...title} autoFocus={true} placeholder="タイトル（必須、20文字以内）" />
            <Textarea h={200} {...text} placeholder="本文" />

            <SelectPrefecture
              checkedPrefecture={checkedPrefecture}
              setCheckedPrefecture={setCheckedPrefecture}
            />

            <Heading as="h2" fontSize="x-large" color="gray.600" textAlign="center">
              画像を追加
            </Heading>
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
                <Image maxH="md" maxw="md" src={preview} alt="preview img" />
              </Box>
            ) : null}

            <RouteCreate
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
            />

            <HStack spacing="3rem">
              <BackButton
                onClick={goBack}
                disabled={loadingButton || !currentUser.uid}
                loading={loadingButton}
              >
                戻る
              </BackButton>
              <PrimaryButton
                onClick={onClickPatch}
                disabled={loadingButton || !currentUser.uid}
                loading={loadingButton}
              >
                更新
              </PrimaryButton>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
