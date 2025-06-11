//ここでthreadsの情報データベース内の情報を保持
import { createContext, useState, useEffect } from "react";

// コンテキストを作成
export const ThreadsContext = createContext();

// export const ThreadsProvider = ({ children }) => {
//   const [getthreads, setGetThreads] = useState([]);

//   // APIからデータ取得
//   useEffect(() => {
//     fetch("http://localhost:8080/app/threads")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Data:", data);
//         setGetThreads(data);
//       })
//       .catch(() => alert("エラー"));
//   }, []);

//   return (
//     <ThreadsContext.Provider value={{ getthreads, setGetThreads }}>
//       {children}
//     </ThreadsContext.Provider>
//   );
// };

export const ThreadsProvider = ({ children }) => {
  const [getthreads, setGetThreads] = useState([]);

  // APIからデータ取得する関数
  const fetchThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/app/threads");

      if (!response.ok) {
        throw new Error("スレッド一覧の取得に失敗しました");
      }
      const data = await response.json();
      console.log("取得したスレッド一覧:", data);
      setGetThreads(data); // APIで取得したデータを state にセット
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // 初回レンダリング時に API を取得
  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <ThreadsContext.Provider value={{ getthreads, fetchThreads }}>
      {children}
    </ThreadsContext.Provider>
  );
};
