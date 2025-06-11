//コメント一覧をまとめる
//ここでコメントの一覧も取ってくる。（はスレッド削除のAPIとってきてるからここでやる）

import React, { useEffect } from "react";
import { useContext } from "react";
import Comment from "./Comment.jsx";
import { CommentsContext } from "../../contexts/CommentContext.jsx";
import { useParams } from "react-router-dom";

const CommentsList = () => {
  const { fetchComments, comments } = useContext(CommentsContext); //コメントの一覧取得をしたAPI
  const { id } = useParams(); //URLからidを取得

  //   console.log("URLから取得した id:", id);
  // 初回レンダリング時にコメント一覧を取得
  useEffect(() => {
    fetchComments();
  }, []);

  // 指定された `id` のコメントだけを抽出
  const relatedComments = comments.filter(
    (oneComment) => Number(oneComment.thread.id) === Number(id)
  );

  // 一致するコメントがない場合、何も表示しない
  if (relatedComments.length === 0) {
    return null;
  }

  return (
    <ul>
      {relatedComments.map((oneComment) => (
        <Comment key={oneComment.id} oneComment={oneComment} />
      ))}
    </ul>
  );
};

export default CommentsList;
