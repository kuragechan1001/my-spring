//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import DeleteButton from "../../button/HomeButton/DeleteButton";
import MovePickupThreadButton from "../../button/HomeButton/MovePickupThreadButton";
import { useContext } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import UpdateThreadsButton from "../../button/HomeButton/UpdateThreadsButton";
import { Api } from "../../hooks/Api";

const Thread = ({ thread }) => {
  const { reloadThreads } = useContext(ThreadsContext);

  //ここで日時の形を整形してる！
  const formatJapaneseDate = (isoString) => {
    const date = new Date(isoString);
    return (
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
      `${date.getHours()}時${String(date.getMinutes()).padStart(2, "0")}分`
    );
  };

  // ここでデータの削除のAPI実行する関数
  const deletePost = async (id) => {
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/threads/delete/${id}`, "PUT");
      // ここでデータを消したら一覧取得を再読み込みをしてる
      reloadThreads();
    } catch (error) {
      console.error("削除失敗：", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <li key={thread.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <h3>タイトル:{thread.title}</h3>
      <p>内容:{thread.content}</p>
      <p>ユーザー: {thread.user.username}</p>
      {/*userメソッドの中のnameを取るって意味になる。*/}
      <p>投稿日: {formatJapaneseDate(thread.postedAt)}</p>
      <DeleteButton id={thread.id} onConfirm={deletePost} />
      <UpdateThreadsButton thread={thread} id={thread.id} />
      <MovePickupThreadButton id={thread.id} thread={thread} />
    </li>
  );
};
export default Thread;
