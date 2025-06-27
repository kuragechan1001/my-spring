//ここはユーザー情報の編集機能
import React, { useContext, useEffect } from "react";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import UpdateUser from "../components/User/UpdateUser";
import RetrunHomeBotton from "../button/NewThreadsPageBotton/RetrunHomeBotton";
import { LoginIdContext } from "../contexts/LoginIdContext";

export const User = () => {
  const { getUserDate, userDate, fetchCurrentUser } =
    useContext(LoginIdContext);
  console.error("getUserDateの中身：", getUserDate);
  useEffect(() => {
    if (getUserDate?.user?.id) {
      fetchCurrentUser(getUserDate.user.id);
    }
  }, [getUserDate?.user?.id]); // ← 初期化後やログイン後にだけ発火！
  console.error("userDateの中身：", userDate);
  // console.log(Array.isArray(userDate)); // true なら配列、false なら配列じゃない

  if (!userDate) {
    return <p>ユーザーが見つかりません…</p>; // 投稿が存在しない場合の処理
  }

  return (
    <div>
      <header>
        <Header />
      </header>
      <h1>ユーザー機能の編集のページ予定の場所</h1>
      <p>～現在白紙～</p>
      <RetrunHomeBotton />
      <ul>
        {/* commentsはコメントの一覧データ。それを.mapで展開してる。んで、展開した一つのデータをoneCommentと命名*/}

        {Array.isArray(userDate) && //ユーザー情報が配列の時、.mapで展開するけど、それ以外はしない
          userDate.map((userDate) => {
            console.log("展開されたユーザー情報", userDate);
            return <UpdateUser key={userDate.id} userDate={userDate} />;
          })}
      </ul>
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default User;
