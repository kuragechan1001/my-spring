import { LoginIdContext } from "../../contexts/LoginIdContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { name, setname, password, setPassword, fetchUsers, response } =
    useContext(LoginIdContext);
  const navigate = useNavigate(); //ページ移動する用のやつ

  const handleSubmit = (e) => {
    e.preventDefault(); // フォーム送信をキャンセル
    if (!name || !password) {
      alert("ユーザー名とパスワードを入力してください");
      return;
    }
    fetchUsers(); // Context の fetchUsers を呼び出し

    fetchUsers(name, password).then(async () => {
      const response = await fetch(
        "http://localhost:8080/userApp/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        } //await無しでやったら、ここの動作を待たずにエラーが出たから、みんなに待っててもらうことにした
      );
      if (response.ok) {
        navigate("/home"); //ここでページ遷移を実行
        setname(""); //ここでフォーム送信後、中身からにする
        setPassword(""); //ここでフォーム送信後、中身からにする
      } else {
        console.error("ログイン失敗: ユーザー情報が間違っています");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="ユーザー名"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
