//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import { useContext } from "react";
import { CommentsContext } from "../../contexts/CommentContext";
import DeleteCommentButton from "../../button/PickupThreadButton/DeleteCommentsButton copy";
import UpdateCommentsButton from "../../button/PickupThreadButton/UpdateCommentsButton";

const Comment = ({ oneComment }) => {
  const { fetchComments } = useContext(CommentsContext);

  //   ここでデータの削除のAPI実行する関数;
  const deleteComment = (id) => {
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;
    fetch(`http://localhost:8080/app/comments/${id}`, {
      method: "DELETE",
    })
      // ここでデータを消したら一覧取得を再読み込みをしてる
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.error("削除失敗：", error);
        alert("削除に失敗しました");
      });
  };

  return (
    <li key={oneComment.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <p>内容:{oneComment.content}</p>
      <p>ユーザー: {oneComment.user.name}</p>
      {/*userメソッドの中のnameを取るって意味になる。*/}
      <p>投稿日: {oneComment.postedAt}</p>
      <DeleteCommentButton id={oneComment.id} onConfirm={deleteComment} />
      <UpdateCommentsButton id={oneComment.id} oneComment={oneComment} />
      {/* <MovePickupCommentButton={oneComment.id} oneComment={oneComment} /> */}
    </li>
  );
};
export default Comment;
