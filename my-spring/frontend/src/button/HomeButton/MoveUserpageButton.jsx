import { useNavigate } from "react-router-dom";

function MoveUserpageButton() {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate("/User"); // URLの文字列を正しく設定
  };

  return <button onClick={moveButton}>ユーザー情報編集</button>; // ここでボタンを返す
}

export default MoveUserpageButton;
