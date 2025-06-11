import React from "react";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import RetrunPickupThreadPage from "../button/NewCommentPageButton/RetrunPickupThreadPage";

export const NewComment = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <h1>新規コメント作成のページになる予定の場所</h1>
      <p>～現在白紙～</p>
      <p>1つの投稿にお返事を書く的な所。リプ？とかいうのの新規作成場所</p>
      <RetrunPickupThreadPage />
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default NewComment;
