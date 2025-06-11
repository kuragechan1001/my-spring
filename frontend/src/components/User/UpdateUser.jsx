import React, { useContext } from "react";
import { useResolvedPath } from "react-router-dom";
import DeleteUserButton from "../../button/UserPageButton/DeleteUserButton";
import UpdateUserButton from "../../button/UserPageButton/UpdateUserButton";
import { LoginIdContext } from "../../contexts/LoginIdContext";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { memoizationUserData } = useContext(LoginIdContext);
  const navigate = useNavigate();

  // ここでデータの削除のAPI実行する関数
  const deleteUser = async () => {
    const id = memoizationUserData?.id;
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;

    const response = await fetch(
      `http://localhost:8080/userApp/users/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .catch((error) => {
        console.error("削除失敗：", error);
        alert("削除に失敗しました");
      })

      .then((response) => {
        //削除した後の処理
        if (response.ok) {
          console.error("削除成功！");
          navigate("/"); //成功時は強制ログアウト
        } else {
          alert("削除に失敗しました。");
        }
      });
    if (!memoizationUserData) {
      return <p>ユーザーが見つかりません…</p>; // 投稿が存在しない場合の処理
    }
  };

  return (
    <div key={memoizationUserData.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <h3>名前: {memoizationUserData.name}</h3>
      <p>メールアドレス: {memoizationUserData.mailadress}</p>
      <p>電話番号: {memoizationUserData.phoneNumber}</p>
      <p>パスワード: {memoizationUserData.password}</p>
      <DeleteUserButton deleteUser={deleteUser} id={memoizationUserData.id} />
      <UpdateUserButton />
    </div>
  );
};

export default UpdateUser;
