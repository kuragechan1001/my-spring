//ThreadTable→ThreadListに来た
//スレッド一覧をまとめる (map で ThreadTable を並べる)

import React from "react";
import Thread from "./Thread.jsx";
import { useContext } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";

const ThreadsList = () => {
  const { getthreads } = useContext(ThreadsContext); //投稿の一覧取得をしたAPI
  return (
    <ul>
      {/*情報をとってきて並べるときの書き方。情報はThreadTableでとってきてるから、
    そこでとってきた情報(threads）を.mapで展開！ */}
      {getthreads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </ul>
  );
};
export default ThreadsList;
