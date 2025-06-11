//ここのボタンを押したら投稿削除できる機能

// import React from "react";

// /*
// 	onClick={onClick} → ボタンがクリックされたときに、さっきpropsで受け取ったonClick関数が実行される
// 	{label} → propsで渡ってきた文字列をここに表示する */

// const DeleteButton = ({ onClick }) => {
//   return <button onClick={onClick}>削除</button>;
// };
// export default DeleteButton;

import React from "react";

function DeleteCommentButton({ id, onConfirm }) {
  return (
    <div>
      <button
        key={id}
        onClick={() => {
          onConfirm(id);
        }}
      >
        削除
      </button>
    </div>
  );
}
export default DeleteCommentButton;
