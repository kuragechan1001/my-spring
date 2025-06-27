// // ここでデータの削除のAPI実行する関数
// import { useCallback, useContext } from "react";
// import { ThreadsContext } from "../contexts/ThreadsContext";

// const DeletePostApi = () => {
//   const { fetchThreads } = useContext(ThreadsContext);

//   const deletePost = useCallback(
//     (id) => {
//       if (!id) return; // id がない場合は処理しない
//       if (!window.confirm("本当に削除しますか？")) return;

//       fetch(`http://localhost:8080/app/threads/delete/${id}`, {
//         method: "DELETE",
//       })
//         .then(() => {
//           fetchThreads(); // 一覧取得を再読み込み
//         })
//         .catch((error) => {
//           console.error("削除失敗：", error);
//           alert("削除に失敗しました");
//         });
//     },
//     [fetchThreads]
//   ); // 依存関係として fetchThreads を指定

//   return deletePost;
// };

// export default DeletePostApi;
