//ここでCommentsの情報データベース内の情報を保持
import { createContext, useState, useEffect } from "react";

// コンテキストを作成
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // APIからデータ取得する関数
  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:8080/app/comments");
      if (!response.ok) {
        throw new Error("コメント一覧の取得に失敗しました");
      }
      const data = await response.json();
      console.log("取得したコメント一覧:", data);
      setComments(data); // APIで取得したデータを state にセット
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // 初回レンダリング時に API を取得
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <CommentsContext.Provider value={{ comments, fetchComments }}>
      {children}
    </CommentsContext.Provider>
  );
};
