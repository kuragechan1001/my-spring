import React from "react";
import DeleteButton from "../../button/PickupThreadButton/DeleteButton";

import { ThreadsContext } from "../../contexts/ThreadsContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewCommentForm from "../../form/NewThreads/NewCommentsFrom";
import CommentsList from "./CommentsList";
import UpdateTreadsButton from "../../button/PickupThreadButton/UpdateThreadsButton";

const OneThread = () => {
  const { getthreads } = useContext(ThreadsContext);
  const navigate = useNavigate();

  // ここでデータの削除のAPI実行する関数
  const deletePost = async (id) => {
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;

    const response = await fetch(
      `http://localhost:8080/app/threads/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .catch((error) => {
        console.error("削除失敗：", error);
        alert("削除に失敗しました");
      })

      .then((response) => {
        //削除した後の処理
        if (response.ok) {
          //   getthreads();
          // スレッド一覧を更新これがあるとエラーが出るホームに戻ったら勝手に一覧を読み直してくれるからいらない
          // window.location.href = "/home"; // 成功時にホーム画面へ遷移
          navigate("/home");
        } else {
          alert("削除に失敗しました。");
        }
      });
  };

  const { id } = useParams(); // URLからIDを取得
  //getthreads の配列の中から、id が一致するスレッド（thread）を探して変数 post に格納する処理
  const post = getthreads?.find((thread) => Number(thread.id) === Number(id));
  if (!post) {
    return <p>投稿が見つかりません…</p>; // 投稿が存在しない場合の処理
  }

  return (
    <div key={post.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <h3>タイトル: {post.title}</h3>
      <p>内容: {post.content}</p>
      <p>ユーザー: {post.user.name}</p>
      <p>投稿日: {post.postedAt}</p>
      <DeleteButton id={post.id} deletePost={deletePost} />
      <UpdateTreadsButton post={post} />
      <NewCommentForm id={post.id} />
      <CommentsList />
    </div>
  );
};

export default OneThread;
