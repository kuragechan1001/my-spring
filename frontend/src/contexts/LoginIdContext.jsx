import React, { createContext, useState, useMemo, useEffect } from "react";
import MoveHomeBotton from "../button/LoginPageButton/MoveHomeBotton";

export const LoginIdContext = createContext();

export const LoginProvider = ({ children }) => {
  const [getUserDate, setgetUserDate] = useState(null); //何の変化も加えないから、nullにしてる
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

  const memoizationUserData = getUserDate; //getUserDate（ユーザー情報）が変わらない限り結果を持ち続ける
  const fetchUsers = async (name, password) => {
    console.log("ログイン開始");
    if (!name || !password) {
      return; // name または password が null もしくは空文字の場合は処理しない
    }

    try {
      const response = await fetch(
        "http://localhost:8080/userApp/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("ログイン情報:", data);
        // console.log(getUserDate);
        setgetUserDate(data); // ここでレスポンスを取得。setgetUserDateにデータが渡されたら、getUserDatの中身が変わる！
        // window.location.href = "/home"; // 成功時にホーム画面へ遷移
      }
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  useEffect(() => {
    setgetUserDate(getUserDate); // 状態が変わるたびに更新
  }, []);

  return (
    <LoginIdContext.Provider
      value={{
        memoizationUserData,
        getUserDate,
        name,
        password,
        setname,
        setPassword,
        fetchUsers,
        setgetUserDate,
      }}
    >
      {children}
    </LoginIdContext.Provider>
  );
};
