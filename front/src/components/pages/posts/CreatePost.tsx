import { memo, useState, VFC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { latLngType } from "../../../types/api/posts/latLngType";
import { useMessage } from "../../../hooks/useMessage";
import { client } from "../../../lib/api/client";
import { signInUserState } from "../../../store/auth";
import { PostCreateTemplate } from "../../templates/posts/PostCreateTemplate";

export const CreatePost: VFC = memo(() => {
  const currentUser = useRecoilValue(signInUserState);

  // stateを定義
  const [origin, setOrigin] = useState<latLngType | null>(null);
  const [destination, setDestination] = useState<latLngType | null>(null);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [checkedPrefecture, setCheckedPrefecture] = useState<Array<number>>([]);

  // フックの設定
  const history = useHistory();
  const { showMessage } = useMessage();
  const title = useInput("");
  const text = useTextarea("");

  // 画像追加の処理
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  // FormDataの作成処理
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
  const onClickPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        .post("posts", data, config)
        .then((res) => {
          showMessage({
            title: "投稿しました。",
            status: "success",
          });
          history.push("/");
        })
        .catch(({ response }) => {
          showMessage({
            title: `タイトル${response.data.title}`,
            status: "error",
          });
        });
    } catch (res) {
      showMessage({ title: "投稿できませんでした。", status: "error" });
    }
    setLoadingButton(false);
  };

  useEffect(() => {
    if (!currentUser.id) {
      history.push("/");
    }
  }, [currentUser.id, history]);

  return (
    <PostCreateTemplate
      process="create"
      title={title}
      text={text}
      checkedPrefecture={checkedPrefecture}
      setCheckedPrefecture={setCheckedPrefecture}
      uploadImage={uploadImage}
      origin={origin}
      setOrigin={setOrigin}
      destination={destination}
      setDestination={setDestination}
      loadingButton={loadingButton}
      goBack={() => history.goBack()}
      onClickSend={onClickPost}
    />
  );
});
