import { useNavigate } from "react-router-dom";

function MoveNewCommentspage() {
  const navigate = useNavigate();

  const retrunHome = () => {
    navigate("/NewComment"); // URLの文字列を正しく設定
  };

  return <button onClick={retrunHome}>コメントする</button>; // ここでボタンを返す
}

export default MoveNewCommentspage;
