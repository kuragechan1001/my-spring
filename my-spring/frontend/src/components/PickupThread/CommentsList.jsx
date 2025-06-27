//コメント一覧をまとめる
//ここでコメントの一覧も取ってくる。（はスレッド削除のAPIとってきてるからここでやる）

import React, { useEffect } from "react";
import { useContext } from "react";
import Comment from "./Comment.jsx";
import { CommentsContext } from "../../contexts/CommentContext.jsx";
import { useParams } from "react-router-dom";

const CommentsList = ({ id }) => {
  const { fetchComments, comments, isLoading, hasMore, offset } =
    useContext(CommentsContext); //コメントの一覧取得をしたAPI
  // const { id } = useParams();
  useEffect(() => {
    console.log("comments更新検知:", comments);
  }, [comments]);
  console.log("コメントリストのスレッドid確認:", comments);

  console.log("コメントリストのスレッドid確認:", id);
  console.log("コメントリストのスレッドoffset確認:", offset);

  //   console.log("URLから取得した id:", id);
  // 初回レンダリング時にコメント一覧を取得
  // useEffect(() => {
  //   fetchComments();
  // }, []); //これがあったせいでコメントの一覧表示が2回呼ばれてた

  // 指定された `id` のコメントだけを抽出
  // const relatedComments = comments.filter(
  //   (oneComment) => Number(oneComment.thread.id) === Number(id)
  // );

  //commentsのnullチェック
  if (!comments) {
    return null; // または <p>ローディング中...</p>
  }
  // 一致するコメントがない場合、何も表示しない.commentsはの一覧データの初期値
  if (comments.length === 0) {
    return <p>コメントはまだありません</p>; // 何も表示しない
  }

  return (
    <div>
      <ul>
        {/* commentsはコメントの一覧データ。それを.mapで展開してる。んで、展開した一つのデータをoneCommentと命名*/}

        {comments.map((oneComment) => {
          console.log("展開されたコメント", oneComment);
          return (
            <Comment
              key={oneComment.id}
              oneComment={oneComment}
              threadId={id}
            /> //id={id} の中身はthreadId
          );
        })}
      </ul>
      {hasMore && (
        <button onClick={() => fetchComments(id, offset)} disabled={isLoading}>
          {isLoading ? "読み込み中…" : "もっと見る"}
        </button>
      )}
    </div>
  );
};

export default CommentsList;
