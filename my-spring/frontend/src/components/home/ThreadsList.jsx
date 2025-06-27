//ThreadTable→ThreadListに来た
//スレッド一覧をまとめる (map で ThreadTable を並べる)

import React from "react";
import Thread from "../home/Thread.jsx";
import { useContext } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext.jsx";

const ThreadsList = () => {
  const { getthreads, fetchThreads, isLoading, hasMore, offset } =
    useContext(ThreadsContext); //投稿の一覧取得をしたAPI

  return (
    <div style={{ paddingBottom: "120px" }}>
      <ul>
        {/*情報をとってきて並べるときの書き方。情報はThreadTableでとってきてるから、
    そこでとってきた情報(threads）を.mapで展開！ */}
        {getthreads.map((thread) => (
          <Thread key={thread.id} thread={thread} />
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => fetchThreads(offset)} disabled={isLoading}>
          {isLoading ? "読み込み中…" : "もっと見る"}
        </button>
      )}
    </div>
  );
};
export default ThreadsList;
