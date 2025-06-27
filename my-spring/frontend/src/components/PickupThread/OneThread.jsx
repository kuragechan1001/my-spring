import React, { useEffect } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CommentsList from "./CommentsList";
import { Api } from "../../hooks/Api";
import UpdateThreadsButton from "../../button/HomeButton/UpdateThreadsButton";
import { CommentsContext } from "../../contexts/CommentContext";
import NewCommentForm from "../../form/PickUpThreads/NewCommentsFrom";
import DeleteButton from "../../button/HomeButton/DeleteButton";

const OneThread = () => {
  const { getthreads, reloadThreads } = useContext(ThreadsContext);
  const navigate = useNavigate();
  const { id } = useParams(); // URLからIDを取得

  //ここで日時の形を整形してる！
  const formatJapaneseDate = (isoString) => {
    const date = new Date(isoString);
    return (
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
      `${date.getHours()}時${String(date.getMinutes()).padStart(2, "0")}分`
    );
  };

  // const { comments, fetchComments } = useContext(CommentsContext);

  // useEffect(() => {
  //   // スレッド一覧が既に取得済みなら再取得しない
  //   if (comments.length === 0) {
  //     console.log("ホームfetchComments");
  //     fetchComments(id);
  //   }
  // }, []);

  // ここでデータの削除のAPI実行する関数
  const deletePost = async (id) => {
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/threads/delete/${id}`, "PUT"); //削除のAPI
      reloadThreads(); //投稿一覧取得のAPI
      navigate("/home"); //ホームの戻る
    } catch (error) {
      console.error("削除失敗：", error);
      alert("削除に失敗しました");
    }
  };

  //getthreads の配列の中から、id が一致するスレッド（thread）を探して変数 post に格納する処理
  const thread = getthreads?.find((thread) => Number(thread.id) === Number(id));

  if (!thread) {
    return <p>投稿が見つかりません…</p>; // 投稿が存在しない場合の処理
  }

  return (
    <div key={thread.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <h3>タイトル: {thread.title}</h3>
      <p>内容: {thread.content}</p>
      <p>ユーザー: {thread.user.username}</p>
      <p>投稿日: {formatJapaneseDate(thread.postedAt)}</p>
      <DeleteButton id={thread.id} onConfirm={deletePost} />
      <UpdateThreadsButton thread={thread} />
      <NewCommentForm id={thread.id} />
      <CommentsList id={thread.id} />
    </div>
  );
};

export default OneThread;
