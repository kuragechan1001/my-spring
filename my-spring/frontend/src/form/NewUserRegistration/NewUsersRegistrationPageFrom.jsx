import React from "react";
import { useState } from "react";
import { Api } from "../../hooks/Api";
import { useNavigate } from "react-router-dom";
// import "../../design/style/NewUsersRegistrationPageStyle.css";

const NewUsersRegistrationPageFrom = () => {
  const [username, setUsername] = useState("");
  const [mailadress, setMailadress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const fullMailAddress = mailadress + "@baroque-w.jp"; // 送信時に自動付与
  const navigate = useNavigate(); //ログイン画面に戻るやつ

  const userCreate = async (e) => {
    //名前のバリテーション
    if (username.length > 20) {
      alert("名前は20文字以下で登録してください");
      return; // ここで処理を中断
    }
    e.preventDefault(); // ページのリロードを防ぐ

    try {
      //ここは編集のAPI
      await Api("/users/create", "POST", {
        username,
        mailadress: fullMailAddress,
        password,
        phoneNumber,
      });
      alert("登録成功");
      setUsername(""); //成功した後は中身を空にする
      setMailadress("");
      setPassword("");
      setPhoneNumber("");
      navigate("/"); //ログイン画面に戻る。
    } catch (error) {
      alert("登録失敗", error);
    }
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <span>@baroque-w.jp</span> {/* 固定表示 */}
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
