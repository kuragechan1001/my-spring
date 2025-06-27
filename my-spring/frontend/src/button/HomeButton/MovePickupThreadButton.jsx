//ここのボタンを押したら、ホーム画面から、一つの投稿閲覧のページ（PickupThreadsページ）に飛ぶボタン

import { useNavigate } from "react-router-dom";

function MovePickupThreadButton({ id }) {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate(`/PickupThread/${id}`); // URLの文字列を正しく設定
  };

  return <button onClick={moveButton}>閲覧</button>; // ここでボタンを返す
}

export default MovePickupThreadButton;
