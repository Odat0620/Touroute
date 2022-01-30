import { useCallback, useState, VFC } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Textarea,
  Image,
} from "@chakra-ui/react";

import { BackButton } from "../../atoms/button/BackButton";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { RouteCreate } from "../../organisms/posts/RouteCreate";
import { SelectPrefecture } from "../../organisms/posts/SelectPrefecture";
import { latLngType } from "../../../types/api/posts/latLngType";

type Props = {
  process: "create" | "edit";
  title: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  text: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  checkedPrefecture: number[];
  setCheckedPrefecture: React.Dispatch<React.SetStateAction<number[]>>;
  uploadImage: (e: any) => void;
  defPostUrl?: string | undefined;
  origin: latLngType | null;
  setOrigin: React.Dispatch<React.SetStateAction<latLngType | null>>;
  destination: latLngType | null;
  setDestination: React.Dispatch<React.SetStateAction<latLngType | null>>;
  loadingButton: boolean;
  goBack: () => void;
  onClickSend: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export const PostCreateTemplate: VFC<Props> = (props) => {
  const {
    process,
    title,
    text,
    checkedPrefecture,
    setCheckedPrefecture,
    uploadImage,
    defPostUrl,
    origin,
    setOrigin,
    destination,
    setDestination,
    loadingButton,
    goBack,
    onClickSend,
  } = props;
  const [preview, setPreview] = useState<string | undefined>(defPostUrl || "");

  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(window.URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }, []);

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
          <Stack justify="center" align="center" spacing="2rem">
            <Heading color="gray.600" textAlign="center">
              {process === "create" ? "ツーリング記録を作成" : "ツーリング記録を編集"}
            </Heading>
            <Input {...title} autoFocus={true} placeholder="タイトル（必須、20文字以内）" />
            <Textarea h={200} {...text} placeholder="本文" />

            <SelectPrefecture
              checkedPrefecture={checkedPrefecture}
              setCheckedPrefecture={setCheckedPrefecture}
            />

            <Stack w="100%" justifyContent="center" align="center">
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
                <Box justifyContent="center">
                  <CloseButton onClick={() => setPreview("")} />
                  <Image maxH="md" maxw="md" src={preview} alt="preview img" />
                </Box>
              ) : null}
            </Stack>

            <RouteCreate
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
            />

            <HStack spacing="3rem">
              <BackButton onClick={goBack} disabled={loadingButton} loading={loadingButton}>
                戻る
              </BackButton>
              <PrimaryButton onClick={onClickSend} disabled={loadingButton} loading={loadingButton}>
                {process === "create" ? "作成" : "更新"}
              </PrimaryButton>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
