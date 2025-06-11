import React from "react";
import { useState } from "react";
// import "../../design/style/NewUsersRegistrationPageStyle.css";

const NewUsersRegistrationPageFrom = () => {
  const [name, setName] = useState("");
  const [mailadress, setMailadress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const fullMailAddress = mailadress + "@gmail.com"; // 送信時に自動付与

  const userCreate = async (e) => {
    //名前のバリテーション
    if (name.length > 20) {
      alert("名前は20文字以下で登録してください");
      return; // ここで処理を中断
    }

    e.preventDefault(); // ページのリロードを防ぐ
    await fetch("http://localhost:8080/userApp/users/create", {
      method: "POST",
      // HTTP リクエストのメソッド
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        mailadress: fullMailAddress,
        password,
        phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // .thenは成功した時の処理を示す場合に使う。
        console.log("Success:", data);
        setName(""); //成功した後は中身を空にする
        setMailadress("");
        setPassword("");
        setPhoneNumber("");
      })
      .catch((error) => {
        // .catchは失敗の時の処理を示す場合に使う。
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={userCreate}>
      <h1 className="NewUser">新規ユーザー登録</h1>
      <div className="form-container">
        <p className="UserColumn">名前</p>
        <input
          type="text"
          name="name"
          placeholder="名前"
          className="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* reactはclassじゃなくてclassNameを使う */}
        <p className="UserColumn">メールアドレス</p>
        <input
          type="text"
          placeholder="メールアドレス"
          className="text"
          value={mailadress}
          onChange={(e) => setMailadress(e.target.value)}
        />
        <span>@gmail.com</span> {/* 固定表示 */}
        <p className="UserColumn">パスワード</p>
        <input
          type="password"
          placeholder="パスワード"
          className="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="UserColumn">電話番号</p>
        <input
          type="text"
          placeholder="000-0000-0000"
          className="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default NewUsersRegistrationPageFrom;
