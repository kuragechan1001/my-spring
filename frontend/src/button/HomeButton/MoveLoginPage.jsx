//ログアウトするボタン

import { useNavigate } from "react-router-dom";

function MoveLoginPage() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/"); // URLの文字列を正しく設定
  };

  return <button onClick={logout}>ログアウト</button>; // ここでボタンを返す
}

export default MoveLoginPage;
