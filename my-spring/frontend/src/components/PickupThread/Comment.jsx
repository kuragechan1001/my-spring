//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import { useContext } from "react";
import { CommentsContext } from "../../contexts/CommentContext";
import UpdateCommentsButton from "../../button/PickupThreadButton/UpdateCommentsButton";
import DeleteButton from "../../button/HomeButton/DeleteButton";
import { Api } from "../../hooks/Api";

const Comment = ({ oneComment, threadId }) => {
  //ここでもらってるidの中身はthreadId
  console.log("コメントのスレッドid確認:", threadId);
  const { reloadcomments } = useContext(CommentsContext);
  console.log("コメントのスレッドid確認2:", threadId);

  //ここで日時の形を整形してる！
  const formatJapaneseDate = (isoString) => {
    const date = new Date(isoString);
    return (
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
      `${date.getHours()}時${String(date.getMinutes()).padStart(2, "0")}分`
    );
  };

  //   ここでデータの削除のAPI実行する関数;
  const deleteComment = async (id) => {
    // ここでもらってるidはDELETEボタンで渡した{oneComment.id}。つまりコメントのId
    if (!id) return; //id がない場合は処理しない。
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/comments/${id}`, "PUT"); //ここで渡されてるIdはコメントId
      // ここでデータを消したら一覧取得を再読み込みをしてる
      reloadcomments(threadId);
    } catch (error) {
      console.error("削除失敗：", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <li key={oneComment.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <p>内容:{oneComment.commentsContent}</p>
      <p>ユーザー: {oneComment.user.username}</p>
      {/*userメソッドの中のnameを取るって意味になる。*/}
      <p>投稿日: {formatJapaneseDate(oneComment.commentPostedAt)}</p>
      <DeleteButton id={oneComment.id} onConfirm={deleteComment} />
      <UpdateCommentsButton
        id={oneComment.id}
        oneComment={oneComment}
        threadId={threadId}
      />
      {/* <MovePickupCommentButton={oneComment.id} oneComment={oneComment} /> */}
    </li>
  );
};
export default Comment;
