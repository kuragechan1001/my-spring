//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import { useContext } from "react";
import DeleteButton from "../../button/HomeButton/DeleteButton";
import { Api } from "../../hooks/Api";
import { MyCommentsContext } from "../../contexts/MyCommentsContext";
import UpdateMyCommentsButton from "../../button/MyPage/UpdateMyCommentsButton";

const MyComment = ({ myComment, userId }) => {
  console.log("コメントのuserid確認:", userId);
  const { reloadMyComments } = useContext(MyCommentsContext);

  //ここで日時の形を整形してる！
  const formatJapaneseDate = (isoString) => {
    const date = new Date(isoString);
    return (
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
      `${date.getHours()}時${String(date.getMinutes()).padStart(2, "0")}分`
    );
  };

  //   ここでデータの削除のAPI実行する関数;
  const deleteMyComment = async (id) => {
    // ここでもらってるidはDELETEボタンで渡した{oneComment.id}。つまりコメントのId
    if (!id) return; //id がない場合は処理しない。
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/comments/${id}`, "PUT"); //ここで渡されてるIdはコメントId
      // ここでデータを消したら一覧取得を再読み込みをしてる
      reloadMyComments(userId);
    } catch (error) {
      console.error("削除失敗：", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <li key={myComment.id}>
      {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
      <p>内容:{myComment.commentsContent}</p>
      <p>ユーザー: {myComment.user.username}</p>
      {/*userメソッドの中のnameを取るって意味になる。*/}
      <p>投稿日: {formatJapaneseDate(myComment.commentPostedAt)}</p>
      <DeleteButton id={myComment.id} onConfirm={deleteMyComment} />
      <UpdateMyCommentsButton
        id={myComment.id}
        myComment={myComment}
        userId={userId}
      />
      {/* <MovePickupCommentButton={oneComment.id} oneComment={oneComment} /> */}
    </li>
  );
};
export default MyComment;
