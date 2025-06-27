//ここのボタンを押したら、ホーム画面から、新規投稿のページ（Threadsページ）に飛ぶボタン

import { useNavigate } from "react-router-dom";

function MoveCreateThread() {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate("/newThreads"); // URLの文字列を正しく設定
  };

  return <button onClick={moveButton}>新規投稿</button>; // ここでボタンを返す
}

export default MoveCreateThread;
