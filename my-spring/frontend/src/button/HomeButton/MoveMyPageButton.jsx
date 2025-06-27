import { useNavigate } from "react-router-dom";

function MoveMyPpageButton() {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate("/MyPage"); // URLの文字列を正しく設定
  };

  return <button onClick={moveButton}>マイページ</button>; // ここでボタンを返す
}

export default MoveMyPpageButton;
