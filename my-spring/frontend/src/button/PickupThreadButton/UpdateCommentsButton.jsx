// このボタンを押したら、コメントを編集できるボタン

import { useState, useContext } from "react";
import { CommentsContext } from "../../contexts/CommentContext";
import { Api } from "../../hooks/Api";

function UpdateCommentsButton({ oneComment, threadId }) {
  const [editId, setEditId] = useState(null); //idには何の変化も加えないから、nullにしてる
  const [editContent, setEditContent] = useState("");

  const { reloadcomments } = useContext(CommentsContext);

  //データ編集のAPI
  const update = async () => {
    if (editContent.length < 5) {
      //内容が５文字以下なら
      alert("内容は5文字以上で入力してください！");
      return; // ここで処理を中断
    }

    try {
      await Api("/comments/update", "PUT", {
        id: editId,
        commentsContent: editContent,
      }); // ,内容はeditedContentのデータを送信。
      // JSON.stringifyでjson形式にして送ってる。
      // 「contentっていう名前で、editContentっていう変数の中身の値をJSON形式で送るよ」って意味。
      reloadcomments(threadId); // ここでデータ編集したら一覧取得を再読み込みをしてる
      setEditId(null); // 編集画面を閉じる
    } catch (error) {
      console.error("編集失敗：", error);
    }
  };

  // 編集ボタン押したときの処理
  const EditClick = () => {
    setEditId(oneComment.id);
    setEditContent(oneComment.commentsContent);
  };

  return (
    <div>
      {editId === oneComment.id ? ( //三項演算子を使って、editId の中にthread.idが入ったらその中身を表示する。
        //editIdがない時は表示しない。（だからsetEditId(null)でキャンセルになる）
        // 編集フォーム表示
        <div>
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={() => update(oneComment.id)}>保存</button>
          <button onClick={() => setEditId(null)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <button onClick={() => EditClick(oneComment)}>編集</button>
        </div>
      )}
    </div>
  );
}
export default UpdateCommentsButton;
