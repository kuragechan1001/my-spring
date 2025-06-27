// //ここでthreadsの情報データベース内の情報を保持
import { createContext, useState, useEffect } from "react";
import { Api } from "../hooks/Api";

// コンテキストを作成
export const ThreadsContext = createContext();

export const ThreadsProvider = ({ children }) => {
  const [getthreads, setGetThreads] = useState([]); //スレッドの一覧データ。初期値は空配列。
  const [offset, setOffset] = useState(0); //ページネーションの開始位置。初期値は 0。
  const [isLoading, setIsLoading] = useState(false); //現在データ取得中かどうかを管理するためのフラグ。多重呼び出し防止にも。
  const [hasMore, setHasMore] = useState(true); // ← 終端検知用
  const limit = 3; //一度に取得したいスレッドの件数。

  const fetchThreads = async (targetOffset = offset) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    console.log("fetchThreads", offset);

    try {
      const data = await Api(
        `/threads?offset=${targetOffset}&limit=${limit}`,
        "GET"
      );
      console.log("取得したスレッド一覧:", data);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // const existingIds = new Set(getthreads.map((thread) => thread.id));
        // const deduped = data.filter((thread) => !existingIds.has(thread.id));
        // // setGetThreads((prev) => [...prev, ...deduped]);
        // setGetThreads(deduped); // ← 以前のスレッドに追加ではなく、リセット
        if (targetOffset === 0) {
          //targetOffset は fetchThreads 関数に渡されている「取得開始位置」今回は0スタート！
          setGetThreads(data); // ← offset=0 のときは全置き換え
        } else {
          //offset=0 じゃないつまり次のページを読み込んでるとき。
          const existingIds = new Set(getthreads.map((thread) => thread.id)); //表示済みのスレッド（getthreads）から、それぞれの id を抽出して Set に格納する。目的：すでに取得している ID を一覧化する。ことこうすることで、「すでにあるやつは表示しない（重複除去）」という判断ができるように！
          const deduped = data.filter((thread) => !existingIds.has(thread.id)); //APIから取得された data の中から、まだ表示していない（＝すでに取得済み ID に含まれていない）スレッドだけを抽出します。結果：まちがって同じスレッドが2回表示されないようにできる！
          setGetThreads((prev) => [...prev, ...deduped]); // ← 次のページに行く時は追加
          console.log("取得したスレッド一覧:2", data);
        }
        setOffset((prev) => prev + limit); // 次ページのoffsetへ進める
      }
    } catch (error) {
      console.error("スレッド取得エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads(); // 初回マウント時に1ページ目を取得
    console.log(" 初回マウント時に1ページ目を取得");
  }, []);

  const reloadThreads = async () => {
    await console.log("reloadThreads");
    // await console.log("1", offset);//テスト用
    await setGetThreads([]); //現在のスレッド一覧を空にリセット
    // await console.log("2", offset);//テスト用
    await setOffset(0); //0件目から再取得する
    // await console.log("3", offset);//テスト用
    await setHasMore(true); //まだ取得できる状態って意味
    setTimeout(() => {
      fetchThreads(0);
    }, 0); // 状態更新が非同期なので、次のレンダリングで確実に offset=0 にするには setTimeout や useEffect に逃がす
    //offset=0（つまり最初）から再び投稿一覧を取得
    // console.log("4", offset);//テスト用
  };

  return (
    <ThreadsContext.Provider
      value={{ getthreads, fetchThreads, hasMore, isLoading, reloadThreads }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

//   const fetchThreads = async (offset = 0, limit = 3) => {
//     //非同期でスレッドを取得する関数。引数で offset/limit を受け取る。
//     try {
//       const data = await Api(
//         `/threads?offset=${offset}&limit=${limit}`,
//         "GET"
//       );
//       console.log("取得したスレッド一覧:", data);

//       // const data = await response.json();
//       // console.log("取得したスレッド一覧:", data);

//       //dataがない場合（投稿がもうない場合）
//       if (data.length === 0) {
//         setHasMore(false); // これ以上読み込まない
//       } else {
//         setGetThreads((prev) => {
//           //すでに取得済みの ID を除外してから新しいスレッドを追加。重複を防ぐ。
//           const existingIds = new Set(prev.map((thread) => thread.id));
//           const deduped = data.filter((thread) => !existingIds.has(thread.id));
//           return [...prev, ...deduped];
//         });
//       }
//     } catch (error) {
//       console.error("エラー:", error);
//     }
//   };

//   //データ取得トリガー
//   //offset が変わるたびにスレッドを読み込む。isLoading と hasMore を使って不要な呼び出しを防止。
//   useEffect(() => {
//     const loadThreads = async () => {
//       if (!isLoading && hasMore) {
//         setIsLoading(true);
//         await fetchThreads(offset, limit);
//         setIsLoading(false);
//       }
//     };
//     loadThreads();
//   }, [offset]);

//   //スクロール検知
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollThreshold = 100; //画面の下から100pxの位置に来たら 'ほぼ一番下' とみなす
//       const scrolledToBottom =
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - scrollThreshold;

//       if (scrolledToBottom && !isLoading && hasMore) {
//         //画面の一番下に近づいたことを検知する
//         console.log("一番下！");
//         setOffset((prev) => prev + limit);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     //スクロールが条件を満たしたら offset を更新し、次のスレッドをロードする準備。
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isLoading, hasMore]); // ← フラグを依存に

//   return (
//     <ThreadsContext.Provider value={{ getthreads, fetchThreads }}>
//       {children}
//     </ThreadsContext.Provider>
//   );
// };
