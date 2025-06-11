//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import DeleteButton from "../../button/HomeButton/DeleteButton";
import MovePickupThreadButton from "../../button/HomeButton/MovePickupThreadButton";
import { useContext } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import HomesUpdateTreadsButton from "../../button/HomeButton/HomesUpdateThreadsButton";

const Thread = ({ thread }) => {
  const { fetchThreads } = useContext(ThreadsContext);

  // ここでデータの削除のAPI実行する関数
  const deletePost = (id) => {
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;
    fetch(`http://localhost:8080/app/threads/delete/${id}`, {
      method: "DELETE",
    })
      // ここでデータを消したら一覧取得を再読み込みをしてる
      .then(() => {
        fetchThreads();
      })
      .catch((error) => {
        console.error("削除失敗：", error);
        alert("削除に失敗しました");
      });
  };

  return (
    <li key={thread.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <h3>タイトル:{thread.title}</h3>
      <p>内容:{thread.content}</p>
      <p>ユーザー: {thread.user.name}</p>
      {/*userメソッドの中のnameを取るって意味になる。*/}
      <p>投稿日: {thread.postedAt}</p>
      <DeleteButton id={thread.id} onConfirm={deletePost} />
      <HomesUpdateTreadsButton thread={thread} id={thread.id} />
      <MovePickupThreadButton id={thread.id} thread={thread} />
    </li>
  );
};
export default Thread;
