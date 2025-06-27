import { useNavigate } from "react-router-dom";

function LoginBotton() {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate("/home"); // URLの文字列を正しく設定
  };

  return <button onClick={moveHome}>ログイン</button>; // ここでボタンを返す
}

export default LoginBotton;
