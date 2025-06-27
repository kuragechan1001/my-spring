//新規ユーザー登録をする画面

import { useNavigate } from "react-router-dom";

function MoveNewUserRegistraion() {
  const navigate = useNavigate();

  const retrunHome = () => {
    navigate("/NewUserRegistration"); // URLの文字列を正しく設定
  };

  return <button onClick={retrunHome}>アカウント新規作成</button>; // ここでボタンを返す
}

export default MoveNewUserRegistraion;
