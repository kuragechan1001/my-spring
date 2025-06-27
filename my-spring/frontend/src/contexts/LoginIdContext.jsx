import React, { createContext, useState, useEffect } from "react";
import { Api } from "../hooks/Api";

export const LoginIdContext = createContext();

export const LoginProvider = ({ children }) => {
  const [getUserDate, setgetUserDate] = useState(null); //何の変化も加えないから、nullにしてる
  const [userDate, setUserDate] = useState(null); //こっちはユーザー情報の一覧取得
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async (username, password) => {
    console.log("ログイン開始");
    if (!username || !password) {
      return; // name または password が null もしくは空文字の場合は処理しない
    }

    try {
      const data = await Api("/app/users/login", "POST", {
        username,
        password,
      });
      console.log("ログイン情報:", data);
      setgetUserDate(data); // ここでレスポンスを取得。setgetUserDateにデータが渡されたら、getUserDatの中身が変わる！
      await fetchCurrentUser(data.user.id); // ← 本命のユーザー情報一覧取得！
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  //ここでユーザー情報の一覧取得
  const fetchCurrentUser = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const currentUser = await Api(
        `/users?id=${id}`, //ここでのidはユーザーid
        "GET",
        {},
        token
      ); // ヘッダーに認証が必要なら対応
      setUserDate(currentUser);
    } catch (error) {
      console.error("ユーザー情報の再取得に失敗:", error);
    }
  };

  useEffect(() => {
    setgetUserDate(); // 状態が変わるたびに更新
  }, []);

  return (
    <LoginIdContext.Provider
      value={{
        getUserDate,
        username,
        password,
        setUsername,
        setPassword,
        fetchUsers,
        setgetUserDate,
        fetchCurrentUser,
        userDate,
      }}
    >
      {children}
    </LoginIdContext.Provider>
  );
};
