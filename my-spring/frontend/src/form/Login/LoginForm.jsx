import { LoginIdContext } from "../../contexts/LoginIdContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../hooks/Api";

const LoginForm = () => {
  const { username, setUsername, password, setPassword, setgetUserDate } =
    useContext(LoginIdContext);
  const navigate = useNavigate(); //ページ移動する用のやつ

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信をキャンセル
    if (!username || !password) {
      alert("ユーザー名とパスワードを入力してください");
      return;
    }

    try {
      const data = await Api("/users/login", "POST", { username, password });
      setUsername("");
      setPassword("");
      console.log("ログイン情報:", data);
      localStorage.setItem("jwtToken", data.token); // トークンを保存
      setgetUserDate(data);
      navigate("/home"); // ログイン成功時にページ遷移
      console.log("更新レスポンス", data);
    } catch (error) {
      console.error("ログイン失敗: ユーザー情報が間違っています", error);
      alert(
        "ログインに失敗しました。ユーザー名またはパスワードを確認してください。"
      );
    }

    // const response = await fetch(
    //   "http://localhost:8080/app/users/login",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, password }),
    //   } //await無しでやったら、ここの動作を待たずにエラーが出たから、みんなに待っててもらうことにした
    // );
    // if (response.ok) {
    //   navigate("/home"); //ここでページ遷移を実行
    //   setUsername(""); //ここでフォーム送信後、中身からにする
    //   setPassword(""); //ここでフォーム送信後、中身からにする
    // } else {
    //   console.error("ログイン失敗: ユーザー情報が間違っています");
    // }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
