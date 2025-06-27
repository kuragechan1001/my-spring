import React, { useContext, useEffect } from "react";
import DeleteUserButton from "../../button/UserPageButton/DeleteUserButton";
import UpdateUserButton from "../../button/UserPageButton/UpdateUserButton";
import { LoginIdContext } from "../../contexts/LoginIdContext";
import { useNavigate } from "react-router-dom";
import { Api } from "../../hooks/Api";

const UpdateUser = ({ userDate }) => {
  const { fetchCurrentUser } = useContext(LoginIdContext);
  const navigate = useNavigate();

  const deleteUser = async () => {
    const id = userDate?.id;
    if (!id) {
      alert("ユーザーIDが取得できませんでした");
      return;
    }

    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/users/delete/${id}`, "PUT");

      console.log("削除成功！");
      navigate("/"); // 成功時はホームへリダイレクト
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。もう一度お試しください。");
    }
  };

  if (!userDate) {
    return <p>ユーザーが見つかりません…</p>;
  }
  return (
    <div key={userDate.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <h3>名前: {userDate.username}</h3>
      <p>メールアドレス: {userDate.mailadress}</p>
      <p>電話番号: {userDate.phoneNumber}</p>
      <p>パスワード: {"🪼".repeat(userDate.password.length)}</p>
      <DeleteUserButton deleteUser={deleteUser} id={userDate.id} />
      <UpdateUserButton userDate={userDate} />
    </div>
  );
};

export default UpdateUser;
