// // ここでデータの削除のAPI実行する関数
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { LoginIdContext } from "../contexts/LoginIdContext";

// const DeleteUser = async () => {
//   const { memoizationUserData } = useContext(LoginIdContext);
//   const navigate = useNavigate();

//   const id = memoizationUserData?.id;
//   if (!id) return; //id がない場合は処理しない
//   if (!window.confirm("本当に削除しますか？")) return;

//   const response = await fetch(
//     `http://localhost:8080/app/users/delete/${id}`,
//     {
//       method: "DELETE",
//     }
//   )
//     .catch((error) => {
//       console.error("削除失敗：", error);
//       alert("削除に失敗しました");
//     })

//     .then((response) => {
//       //削除した後の処理
//       if (response.ok) {
//         console.error("削除成功！");
//         navigate("/"); //成功時は強制ログアウト
//       } else {
//         alert("削除に失敗しました。");
//       }
//     });

//   if (!memoizationUserData) {
//     return <p>ユーザーが見つかりません…</p>; // 投稿が存在しない場合の処理
//   }
// };
// export default DeleteUser;
