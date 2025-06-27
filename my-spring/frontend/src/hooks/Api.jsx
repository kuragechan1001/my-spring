//GETメソッドのAPIのフェッチをまとめた場所

// APIからデータ取得する関数
// apiClient.js に定義するラッパー関数
export const Api = async (url, apimethod, body) => {
  const token = localStorage.getItem("jwtToken"); //ローカルすれーじに保存されてるトークンを持ってくる

  // const response = await fetch("http://localhost:8080/app" + url, {
  //   method: apimethod,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(body), //postの時だけ必要！
  // });
  const options = {
    method: apimethod,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (apimethod !== "GET") {
    options.body = JSON.stringify(body);
  } //GETメソッドの時bodyを渡さないようにする。

  const response = await fetch("http://localhost:8080/app" + url, options);

  if (!response.ok) {
    const errText = await response.text(); // サーバーからのエラーメッセージを取得
    throw new Error(`スレッド一覧の取得に失敗: ${response.status} ${errText}`);
  }

  return await response.json(); // ← 結果を返さないと使えないので超大事！
  // 今までconst data = await response.json();って形で返してた。
};
