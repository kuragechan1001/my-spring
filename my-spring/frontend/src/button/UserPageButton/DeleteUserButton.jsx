//ユーザーの削除
//ここのボタンを押したら投稿削除できる機能
import React from "react";

function DeleteUserButton({ id, deleteUser }) {
  return (
    <div>
      <button
        key={id}
        onClick={() => {
          deleteUser(id);
        }}
      >
        削除
      </button>
    </div>
  );
}
export default DeleteUserButton;
