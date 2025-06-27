import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import kaisou from "../design/images/kaisou.png";
import { useContext } from "react";
import { LoginIdContext } from "../contexts/LoginIdContext";
import MoveUserpageButton from "../button/HomeButton/MoveUserpageButton";
import MoveLoginPage from "../button/HomeButton/MoveLoginPage";
import MoveHomeBotton from "../button/LoginPageButton/MoveHomeBotton";
import MoveCreateThread from "../button/HomeButton/MoveCreateThreadsBotton";
import MyThreadsList from "../components/MyPage/MyThreadsList";
import MyCommentsList from "../components/MyPage/MyCommentsList";
import { MyCommentsProvider } from "../contexts/MyCommentsContext";
import { MyThreadsProvider } from "../contexts/MyThreadsContext";

const MyPage = () => {
  // ここでデータの一覧のAPIを取得してる
  // const { getthreads, fetchThreads } = useContext(ThreadsContext);
  const { getUserDate } = useContext(LoginIdContext);

  console.log("Mypage - ユーザーid確認用:", getUserDate.user.id); // getUserDateはPOSTで投げた際返ってきたユーザー情報
  // useEffect(() => {
  //   fetchThreads();

  // }, []);
  return (
    <div className={backgland.body}>
      <header>
        <Header />
      </header>
      <div className={"block"}>
        <h1>マイページ</h1>
        <MoveUserpageButton />
        <MoveCreateThread />
        <MoveLoginPage />
        <MoveHomeBotton />
        {/*↓↓三項演算子とかいうやつとかいうやつ*/}
        {getUserDate.length === 0 ? (
          <p>投稿がまだありません</p>
        ) : (
          <div className={"threads"} style={{ display: "flex" }}>
            <div>
              <h1>投稿一覧</h1>
              <MyThreadsProvider userId={getUserDate.user.id}>
                <MyThreadsList userId={getUserDate.user.id} />
              </MyThreadsProvider>
            </div>

            <div>
              {/* ここでユーザー情報に紐ずいたコメントを一覧取得のAPIにユーザーIdを渡すを渡す */}
              <h1>コメント一覧</h1>
              <MyCommentsProvider userId={getUserDate.user.id}>
                <MyCommentsList userId={getUserDate.user.id} />
              </MyCommentsProvider>
            </div>
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

export default MyPage;
