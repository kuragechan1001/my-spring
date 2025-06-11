//ユーザー情報の編集
import { useState, useContext, useEffect } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import { LoginIdContext } from "../../contexts/LoginIdContext";

function UpdateUserButton() {
  const { memoizationUserData, fetchUsers, setname, setPassword } =
    useContext(LoginIdContext);
  const { fetchThreads } = useContext(ThreadsContext);

  const [editId, setEditId] = useState(null); //idには何の変化も加えないから、nullにしてる
  const [editName, setEditName] = useState("");
  const [editMailadress, setEditMailadress] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editPassword, setEditPassword] = useState("");

  //データ編集のAPI
  const userUpdate = () => {
    fetch("http://localhost:8080/userApp/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editId,
        name: editName,
        mailadress: editMailadress,
        phoneNumber: editPhoneNumber,
        password: editPassword,
      }), // タイトルはeditedTitle,内容はeditedContentのデータを送信。
      // JSON.stringifyでjson形式にして送ってる。
      // 「titleっていう名前で、editTitleっていう変数の中身の値をJSON形式で送るよ」って意味。
    })
      .then((res) => {
        // console.log("レスポンス内容", res);
        res.json();
      })

      .then(() => {
        // fetchThreads(); // ここでデータ編集したら一覧取得を再読み込みをしてる
        fetchThreads();
        fetchUsers(editName, editPassword); //ここで再度スレッド一覧を呼びなおして変更した値を渡すの変更をさせる。
        setEditId(null); // 編集画面を閉じる
      })
      .catch((error) => {
        console.error("編集失敗：", error);
      }); //この辺( .then((res) ,.then((data) )はGETの時のほぼ定型文
  };
  useEffect(() => {
    fetchUsers();
    //名前化パスワードが変わったら再度POSTリクエスト？検索して情報を取ってくる
  }, [editName, editPassword]);

  // 編集ボタン押したときの処理
  const EditClick = () => {
    setEditId(memoizationUserData.id);
    setEditName(memoizationUserData.name);
    setEditMailadress(memoizationUserData.mailadress);
    setEditPhoneNumber(memoizationUserData.phoneNumber);
    setEditPassword(memoizationUserData.password);
  };

  return (
    <div>
      {editId === memoizationUserData.id ? ( //三項演算子を使って、editId の中にthread.idが入ったらその中身を表示する。
        //editIdがない時は表示しない。（だからsetEditId(null)でキャンセルになる）
        // 編集フォーム表示
        <div>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            value={editMailadress}
            onChange={(e) => setEditMailadress(e.target.value)}
          />
          <input
            value={editPhoneNumber}
            onChange={(e) => setEditPhoneNumber(e.target.value)}
          />
          <input
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <button onClick={() => userUpdate(memoizationUserData.id)}>
            保存
          </button>
          <button onClick={() => setEditId(null)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <button onClick={() => EditClick(memoizationUserData)}>編集</button>
        </div>
      )}
    </div>
  );
}
export default UpdateUserButton;
