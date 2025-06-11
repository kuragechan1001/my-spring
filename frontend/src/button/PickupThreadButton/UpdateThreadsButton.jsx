// このボタンを押したら、投稿を編集できるボタン（threadsContorollerクラスのPutMapping）
//@PutMapping("/threads/update")
// public Threads putThreads(@RequestBody PutThreadsRequest request){
//     return threadsService.updateThreads(request.getId(), request.getTitle(), request.getContent());
// }の部分

import { useState, useContext } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import { useParams } from "react-router-dom";

function UpdateTreadsButton({ post }) {
  const [editId, setEditId] = useState(null); //idには何の変化も加えないから、nullにしてる
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const { id } = useParams(); // URLからIDを取得
  const { fetchThreads } = useContext(ThreadsContext);

  //データ編集のAPI
  const update = () => {
    if (editTitle.length < 5 || editContent.length < 5) {
      //内容またはタイトルが５文字以下なら
      alert("タイトルと内容は5文字以上で入力してください！");
      return; // ここで処理を中断
    }

    fetch("http://localhost:8080/app/threads/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: editTitle,
        content: editContent,
      }), // タイトルはeditedTitle,内容はeditedContentのデータを送信。
      // JSON.stringifyでjson形式にして送ってる。
      // 「titleっていう名前で、editTitleっていう変数の中身の値をJSON形式で送るよ」って意味。
    })
      .then((res) => res.json())

      .then(() => {
        fetchThreads(); // ここでデータ編集したら一覧取得を再読み込みをしてる
        setEditId(null); // 編集画面を閉じる
      })
      .catch((error) => {
        console.error("編集失敗：", error);
      }); //この辺( .then((res) ,.then((data) )はGETの時のほぼ定型文
  };

  // 編集ボタン押したときの処理
  const EditClick = () => {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  return (
    <div>
      {editId === post.id ? ( //三項演算子を使って、editId の中にthread.idが入ったらその中身を表示する。
        //editIdがない時は表示しない。（だからsetEditId(null)でキャンセルになる）
        // 編集フォーム表示
        <div>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={() => update(post.id)}>保存</button>
          <button onClick={() => setEditId(null)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <button onClick={() => EditClick(post)}>編集</button>
        </div>
      )}
    </div>
  );
}
export default UpdateTreadsButton;
