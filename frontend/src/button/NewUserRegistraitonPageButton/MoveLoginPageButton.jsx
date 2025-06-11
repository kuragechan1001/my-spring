//ログイン画面に戻るボタン
import { useNavigate } from "react-router-dom";

function RetrunLoginpage() {
  const navigate = useNavigate();

  const retrunLogin = () => {
    navigate("/"); // URLの文字列を正しく設定
  };

  return <button onClick={retrunLogin}>登録をやめる</button>; // ここでボタンを返す
}

export default RetrunLoginpage;
