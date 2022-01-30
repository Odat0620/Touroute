import { memo, useState, VFC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useInput } from "../../../hooks/useInput";
import { useTextarea } from "../../../hooks/useTextarea";
import { latLngType } from "../../../types/api/posts/latLngType";
import { useMessage } from "../../../hooks/useMessage";
import { client } from "../../../lib/api/client";
import { EditPostState } from "../../../store/post";
import { signInUserState } from "../../../store/auth";
import { PostCreateTemplate } from "../../templates/posts/PostCreateTemplate";

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

  // 変数にカスタムフックを設定、中身はvalueとonChange
  const title = useInput(post.title);
  const text = useTextarea(post.text);

  // 画像の追加とプレビューの処理
  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
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
          resetPost();
          history.push(`/posts/${post.id}`);
        })
        .catch(({ response }) => {
          showMessage({
            title: `タイトル${response.data.title}`,
            status: "error",
          });
        });
    } catch (res) {
      showMessage({ title: "更新できませんでした。", status: "error" });
    }
    setLoadingButton(false);
  };

  const goBack = () => {
    resetPost();
    history.goBack();
  };

  return (
    <PostCreateTemplate
      process="edit"
      title={title}
      text={text}
      checkedPrefecture={checkedPrefecture}
      setCheckedPrefecture={setCheckedPrefecture}
      uploadImage={uploadImage}
      defPostUrl={post.image.url}
      origin={origin}
      setOrigin={setOrigin}
      destination={destination}
      setDestination={setDestination}
      loadingButton={loadingButton}
      goBack={goBack}
      onClickSend={onClickPatch}
    />
  );
});
