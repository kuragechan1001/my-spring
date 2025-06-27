import React, { useContext, useState } from "react";
import { LoginIdContext } from "../../contexts/LoginIdContext";

import { useNavigate } from "react-router-dom";
import { Api } from "../../hooks/Api";
import { ThreadsContext } from "../../contexts/ThreadsContext";

export const NewTreadsForm = () => {
  const { getUserDate } = useContext(LoginIdContext);
  const { reloadThreads } = useContext(ThreadsContext);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); //ページ移動する用のやつ

  // 投稿処理
  const threadSubmit = async (e) => {
    e.preventDefault(); // ページのリロードを防ぐ
    const userId = getUserDate.user.id;
    console.log("送信データ:", { userId, title, content }); //テスト用
    if (!userId) {
      alert("ログインしているユーザー情報が取得できません");
      return;
    }
    if (title.length < 5 || content.length < 5) {
      //内容またはタイトルが５文字以下なら
      alert("タイトルと内容は5文字以上で入力してください！");
      return; // ここで処理を中断
    }

    try {
      const data = await Api("/threads/create", "POST", {
        userId: userId,
        title: title,
        content: content,
      });
      console.log("投稿完了", data);
      // 投稿成功後、入力フォームをクリア
      setTitle("");
      setContent("");
      await reloadThreads(); //一覧取得のAPIで投稿後、情報を読み直してる
      navigate("/home"); //ここでページ遷移を実行
    } catch (error) {
      console.error("投稿エラー", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={title} // Reactの状態変数と紐付ける
        onChange={(e) => setTitle(e.target.value)} // 変更時に状態更新.入力した文字をsetTitleに保存
        //e.targetでHTML要素（この場合は<input>）、valueはvalue={title} で定義されてるから、title。
        //ユーザーが入力した内容（title）を React の状態に保存し、それを表示する という動作になってる。
        placeholder="タイトル"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
      />
      <button onClick={threadSubmit}>投稿する</button>
    </div>
  );
};

export default NewTreadsForm;
