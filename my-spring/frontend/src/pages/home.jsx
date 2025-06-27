//ThreadTable→ThreadListに来た
//APIでスレッド一覧を取得 (fetch でデータを取る)

import { useEffect, useState } from "react";
import MoveCreateThreas from "../button/HomeButton/MoveCreateThreadsBotton";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import kaisou from "../design/images/kaisou.png";
import ThreadsList from "../components/home/ThreadsList";
import MoveUserpageButton from "../button/HomeButton/MoveUserpageButton";
import MoveLoginPage from "../button/HomeButton/MoveLoginPage";
import { useContext } from "react";
import { ThreadsContext } from "../contexts/ThreadsContext";
import { LoginIdContext } from "../contexts/LoginIdContext";
import MoveMyPpageButton from "../button/HomeButton/MoveMyPageButton";

const Home = () => {
  // ここでデータの一覧のAPIを取得してる
  const { getthreads, fetchThreads } = useContext(ThreadsContext);
  const { getUserDate } = useContext(LoginIdContext);

  useEffect(() => {
    // スレッド一覧が既に取得済みなら再取得しない
    if (getthreads.length === 0) {
      console.log("ホームfetchThreads");
      fetchThreads();
    }
    console.log("Home - ユーザー情報:", getUserDate);
    console.log("Home - トークン情報:", localStorage.getItem("jwtToken"));
  }, []);
  return (
    <div className={backgland.body}>
      <header>
        <Header />
      </header>
      <div className={"block"}>
        <h1>ここがホーム画面</h1>
        <MoveUserpageButton />
        <MoveCreateThreas />
        <MoveLoginPage />
        <MoveMyPpageButton />
        {/*↓↓三項演算子とかいうやつとかいうやつ*/}
        {getthreads.length === 0 ? (
          <p>投稿がまだありません</p>
        ) : (
          <div className={"threads"}>
            <ThreadsList />
          </div>
        )}
        <footer>
          <img className={backgland.img} src={kaisou} alt="サンプル画像" />
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Home;
