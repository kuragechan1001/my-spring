//threadの一覧取得をするだけのシンプルなAPI
// APIからデータ取得する関数
// import { createContext, useState, useEffect } from "react";
// import { Api } from "../hooks/Api";

// // コンテキストを作成
// export const ThreadsListContext = createContext();

// export const ThreadsListProvider = ({ children }) => {
//   const [getthreads, setGetThreads] = useState([]); //スレッドの一覧データ。初期値は空配列。
//   const [offset, setOffset] = useState(0); //ページネーションの開始位置。初期値は 0。
//   const limit = 3; //一度に取得したいスレッドの件数。

//   const GetListThreads = async () => {
//     try {
//       const data = await Api(`/threads?offset=${offset}&limit=${limit}`, "GET");
//       console.log("取得したスレッド一覧:", data);
//       setGetThreads(data); // APIで取得したデータを state にセット
//     } catch (error) {
//       console.error("エラー:", error);
//     }
//   };

//   // 初回レンダリング時に API を取得
//   useEffect(() => {
//     GetListThreads();
//   }, []);

//   return (
//     <ThreadsListContext.Provider value={{ getthreads, GetListThreads }}>
//       {children}
//     </ThreadsListContext.Provider>
//   );
// };
