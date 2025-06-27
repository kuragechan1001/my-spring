//ユーザー情報の編集
import { useState, useContext, useEffect } from "react";
import { ThreadsContext } from "../../contexts/ThreadsContext";
import { LoginIdContext } from "../../contexts/LoginIdContext";
import { Api } from "../../hooks/Api";

function UpdateUserButton({ userDate }) {
  const { fetchCurrentUser } = useContext(LoginIdContext);
  const { reloadThreads } = useContext(ThreadsContext);

  const [editId, setEditId] = useState(null); //idには何の変化も加えないから、nullにしてる
  const [editName, setEditName] = useState("");
  const [editMailadress, setEditMailadress] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editPassword, setEditPassword] = useState("");

  //データ編集のAPI
  const userUpdate = async () => {
    try {
      await Api("/users/update", "PUT", {
        id: editId,
        username: editName,
        mailadress: editMailadress,
        phoneNumber: editPhoneNumber,
        password: editPassword,
      }); // タイトルはeditedTitle,内容はeditedContentのデータを送信。
      // JSON.stringifyでjson形式にして送ってる。
      // 「titleっていう名前で、editTitleっていう変数の中身の値をJSON形式で送るよ」って意味。
      // fetchThreads(); // ここでデータ編集したら一覧取得を再読み込みをしてる

      // トークンを一度削除
      localStorage.removeItem("jwtToken");

      // 新しい情報でログインし直す
      const newLogin = await Api("/users/login", "POST", {
        username: editName,
        password: editPassword,
      });

      localStorage.setItem("jwtToken", newLogin.token);
      console.log("ちゃんとユーザーid渡せてるか", editId);
      await fetchCurrentUser(editId); //ここで再度スレッド一覧を呼びなおして変更した値を渡すの変更をさせる。
      await reloadThreads(); // 再ログイン後のタイミングで呼び出す
      setEditId(null);
    } catch (error) {
      console.error("編集失敗：", error);
    }
  };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

  // 編集ボタン押したときの処理
  const EditClick = () => {
    setEditId(userDate.id);
    setEditName(userDate.username);
    setEditMailadress(userDate.mailadress);
    setEditPhoneNumber(userDate.phoneNumber);
    setEditPassword(userDate.password);
  };

  return (
    <div>
      {editId === userDate.id ? ( //三項演算子を使って、editId の中にthread.idが入ったらその中身を表示する。
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
          <button onClick={() => userUpdate(userDate.id)}>保存</button>
          <button onClick={() => setEditId(null)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <button onClick={() => EditClick(userDate)}>編集</button>
        </div>
      )}
    </div>
  );
}
export default UpdateUserButton;
