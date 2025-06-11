//ここのボタンを押したら、新規投稿のページ（Threadsページ）から、ホーム画面に飛ぶボタン

import { useNavigate } from "react-router-dom";

function RetrunHomeBotton() {
  const navigate = useNavigate();

  const retrunHome = () => {
    navigate("/home"); // URLの文字列を正しく設定
  };

  return <button onClick={retrunHome}>ホームへ戻る</button>; // ここでボタンを返す
}

export default RetrunHomeBotton;
