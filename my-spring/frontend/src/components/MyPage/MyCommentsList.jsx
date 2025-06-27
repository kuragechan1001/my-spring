// //コメント一覧をまとめる
// //ここでコメントの一覧も取ってくる。（はスレッド削除のAPIとってきてるからここでやる）

import React from "react";
import { useContext } from "react";
import { MyCommentsContext } from "../../contexts/MyCommentsContext.jsx";
import MyComment from "./MyComment.jsx";

const MyCommentsList = ({ userId }) => {
  //コメントの一覧取得をしたAPI
  const { MyComments, mycommentsData, isLoading, hasMore, offset } =
    useContext(MyCommentsContext); //ユーザーidを取得
  console.log("コメント情報:", mycommentsData);
  console.log("コメントコメント情報:", hasMore);

  // // 指定された `id` のコメントだけを抽出
  // const relatedComments = comments.filter(
  //   (MyComment) => Number(MyComment.user.id) === Number(userId)
  // );

  // 一致するコメントがない場合、何も表示しない
  if (userId.length === 0) {
    return "ユーザー情報がありません";
  }

  return (
    <div style={{ paddingBottom: "120px" }}>
      <ul>
        {mycommentsData.map((myComment) => (
          <MyComment key={myComment.id} myComment={myComment} userId={userId} />
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => MyComments(userId, offset)} disabled={isLoading}>
          {isLoading ? "読み込み中…" : "もっとコメントを見る"}
        </button>
      )}
    </div>
  );
};

export default MyCommentsList;
