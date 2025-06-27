// このボタンを押したら、投稿を編集できるボタン（threadsContorollerクラスのPutMapping）
//@PutMapping("/threads/update")
// public Threads putThreads(@RequestBody PutThreadsRequest request){
//     return threadsService.updateThreads(request.getId(), request.getTitle(), request.getContent());
// }の部分

import { useState, useContext } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import { Api } from "../../hooks/Api";

function UpdateThreadsButton({ thread }) {
  const [editId, setEditId] = useState(null); //idには何の変化も加えないから、nullにしてる
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { reloadThreads } = useContext(ThreadsContext);

  //データ編集のAPI
  const update = async () => {
    if (editTitle.length < 5 || editContent.length < 5) {
      //内容またはタイトルが５文字以下なら
      alert("タイトルと内容は5文字以上で入力してください！");
      return; // ここで処理を中断
    }

    try {
      await Api("/threads/update", "PUT", {
        id: editId,
        title: editTitle,
        content: editContent,
      }); // タイトルはeditedTitle,内容はeditedContentのデータを送信。
      // JSON.stringifyでjson形式にして送ってる。
      // 「titleっていう名前で、editTitleっていう変数の中身の値をJSON形式で送るよ」って意味。
      reloadThreads(); // ここでデータ編集したら一覧取得を再読み込みをしてる
      setEditId(null); // 編集画面を閉じる
    } catch (error) {
      console.error("編集失敗：", error);
    }
  };

  // 編集ボタン押したときの処理
  const EditClick = () => {
    setEditId(thread.id);
    setEditTitle(thread.title);
    setEditContent(thread.content);
  };

  return (
    <div>
      {editId === thread.id ? ( //三項演算子を使って、editId の中にthread.idが入ったらその中身を表示する。
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
          <button onClick={() => update(thread.id)}>保存</button>
          <button onClick={() => setEditId(null)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <button onClick={() => EditClick(thread)}>編集</button>
        </div>
      )}
    </div>
  );
}
export default UpdateThreadsButton;
