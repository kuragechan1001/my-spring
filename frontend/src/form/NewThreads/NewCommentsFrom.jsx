//新規コメント作成する場所

import React, { useContext, useState } from "react";
import { LoginIdContext } from "../../contexts/LoginIdContext";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import { CommentsContext } from "../../contexts/CommentContext";

export const NewCommentForm = ({ id }) => {
  console.log("スレッドid確認:", id); // 確認用
  const { getUserDate } = useContext(LoginIdContext);
  const { fetchThreads } = useContext(ThreadsContext);
  const { fetchComments } = useContext(CommentsContext);

  const [userId, setUserId] = useState(null); //ユーザーは変化なしだからNullのまんま
  const [threadId, setThreadId] = useState(null);
  const [content, setContent] = useState("");

  const [isFormVisible, setIsFormVisible] = useState(false); // フォーム表示状態

  // 投稿処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserDate.id;
    // const threadId = setThreadId(id);
    console.log("送信データ:", { userId, id, content }); //テスト用

    if (!userId) {
      alert("ログインしているユーザー情報が取得できません");
      return;
    }
    if (content.length < 5) {
      //内容が５文字以下なら
      alert("タイトルと内容は5文字以上で入力してください！");
      return; // ここで処理を中断
    }
    e.preventDefault(); // ページのリロードを防ぐ
    await fetch("http://localhost:8080/app/comments/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        threadId: id,
        content: content,
      }),
    })
      .then((res) => res.json()) //サーバーからのレスポンスをJSON形式で受け取る
      .then((data) => {
        console.log("投稿完了", data);
        // 投稿成功後、入力フォームをクリア
        setContent("");
        fetchThreads(); //一覧取得のAPIで投稿後、情報を読み直してる
        fetchComments(); //一覧取得のAPIで投稿後、情報を読み直してる

        setIsFormVisible(false); // フォームを閉じる
      })
      .catch(() => alert("投稿エラー")); //エラーの処理内容
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        コメントする
      </button>

      {isFormVisible && (
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="内容"
          />
          <button onClick={handleSubmit}>投稿する</button>
        </div>
      )}
    </div>
  );
};

export default NewCommentForm;
