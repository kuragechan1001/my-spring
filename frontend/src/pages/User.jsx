//ここはユーザー情報の編集機能
import React, { useContext } from "react";
import RetrunHomeBotton from "../button/UserPageButton/RetrunHomeBotton";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import UpdateUser from "../components/User/UpdateUser";

export const User = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <h1>ユーザー機能の編集のページ予定の場所</h1>
      <p>～現在白紙～</p>
      <RetrunHomeBotton />
      <UpdateUser />
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default User;
