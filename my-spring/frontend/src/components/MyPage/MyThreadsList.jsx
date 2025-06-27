//ThreadTable→ThreadListに来た
//スレッド一覧をまとめる (map で ThreadTable を並べる)

import React from "react";
import { useContext } from "react";

import { MyThreadsContext } from "../../contexts/MyThreadsContext.jsx";
import MyThread from "./MyThread.jsx";

const MyThreadsList = ({ userId }) => {
  const { myThreadsData, MyThreads, isLoading, hasMore, offset } =
    useContext(MyThreadsContext); //MyThreadsは投稿の一覧取得をしたAPI
  console.log("投稿情報:", hasMore);

  // 一致する情報がない場合、何も表示しない
  if (userId.length === 0) {
    return "ユーザー情報がありません";
  }

  return (
    <div style={{ paddingBottom: "120px" }}>
      <ul>
        {/*情報をとってきて並べるときの書き方。情報はThreadTableでとってきてるから、
    そこでとってきた情報(threads）を.mapで展開！ */}
        {myThreadsData.map((thread) => (
          <MyThread key={thread.id} thread={thread} userId={userId} />
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => MyThreads(userId, offset)} disabled={isLoading}>
          {isLoading ? "読み込み中…" : "もっと投稿を見る"}
        </button>
      )}
    </div>
  );
};
export default MyThreadsList;
