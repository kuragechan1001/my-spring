// このボタンを押したら、コメントを編集できるボタン

import { useState, useContext } from "react";
import { CommentsContext } from "../../contexts/CommentContext";

function UpdateCommentsButton({ id, oneComment }) {
  const [editId, setEditId] = useState(null); //idには何の変化も加えないから、nullにしてる
  const [editContent, setEditContent] = useState("");

  const { fetchComments } = useContext(CommentsContext);

  //データ編集のAPI
  const update = () => {
    if (editContent.length < 5) {
      //内容が５文字以下なら
      alert("内容は5文字以上で入力してください！");
      return; // ここで処理を中断
    }

    fetch("http://localhost:8080/app/comments/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editId,
        content: editContent,
      }), // ,内容はeditedContentのデータを送信。
      // JSON.stringifyでjson形式にして送ってる。
      // 「contentっていう名前で、editContentっていう変数の中身の値をJSON形式で送るよ」って意味。
    })
      .then((res) => res.json())

      .then(() => {
        fetchComments(); // ここでデータ編集したら一覧取得を再読み込みをしてる
        setEditId(null); // 編集画面を閉じる
      })
      .catch((error) => {
        console.error("編集失敗：", error);
      }); //この辺( .then((res) ,.then((data) )はGETの時のほぼ定型文
  };

  // 編集ボタン押したときの処理
  const EditClick = () => {
    setEditId(oneComment.id);
    setEditContent(oneComment.content);
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
