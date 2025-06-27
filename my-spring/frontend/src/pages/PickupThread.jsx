import React, { useContext, useEffect } from "react";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import MoveNewCommentspage from "../button/PickupThreadButton/MoveNewCommentspage";
import OneThread from "../components/PickupThread/OneThread";
import RetrunHomeBotton from "../button/NewThreadsPageBotton/RetrunHomeBotton";
import { CommentsProvider } from "../contexts/CommentContext";
import { useParams } from "react-router-dom";

const PickupThread = () => {
  // ここでデータの一覧のAPIを取得してる
  // const { comments, fetchComments } = useContext(CommentsContext);
  const { id } = useParams(); // URLからIDを取得
  // useEffect(() => {
  //   // スレッド一覧が既に取得済みなら再取得しない
  //   if (comments.length === 0) {
  //     console.log("ホームfetchComments");
  //     fetchComments(id);
  //   }
  // }, []);
  return (
    <div>
      <header>
        <Header />
      </header>
      <h1>一つの投稿を表示する場所</h1>
      <RetrunHomeBotton />
      {/* <MoveNewCommentspage /> */}
      <CommentsProvider threadId={id}>
        <OneThread />
      </CommentsProvider>
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};
export default PickupThread;
