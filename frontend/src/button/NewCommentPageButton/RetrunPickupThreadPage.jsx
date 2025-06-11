//PickupThreadページに戻る

import { useNavigate } from "react-router-dom";

function RetrunPickupThreadPage() {
  const navigate = useNavigate();

  const retrunHome = () => {
    navigate("/PickupThread"); // URLの文字列を正しく設定
  };

  return <button onClick={retrunHome}>戻る</button>; // ここでボタンを返す
}

export default RetrunPickupThreadPage;
