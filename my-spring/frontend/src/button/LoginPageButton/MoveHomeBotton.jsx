//ここのボタンを押したら、新規投稿のページ（Threadsページ）から、ホーム画面に飛ぶボタン

import { useNavigate } from "react-router-dom";

function MoveHomeBotton() {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate("/home"); // URLの文字列を正しく設定
  };

  return <button onClick={moveHome}>ホームに行く</button>; // ここでボタンを返す
}

export default MoveHomeBotton;
