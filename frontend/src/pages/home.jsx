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

const Home = () => {
  // ここでデータの一覧のAPIを取得してる
  const { getthreads } = useContext(ThreadsContext);
  const { memoizationUserData } = useContext(LoginIdContext);
  useEffect(() => {
    console.log("Home - ユーザー情報:", memoizationUserData);
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
        {/* <ThreadsList /> */}
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
