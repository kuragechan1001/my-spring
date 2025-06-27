//ここでCommentsの情報データベース内の情報を保持
import { createContext, useState, useEffect, useMemo } from "react";
import { Api } from "../hooks/Api";

// コンテキストを作成
export const CommentsContext = createContext();

export const CommentsProvider = ({ threadId, children }) => {
  const [comments, setComments] = useState([]); //コメントの一覧データ。初期値は空配列。
  const [offset, setOffset] = useState(0); //ページネーションの開始位置。初期値は 0。
  const [isLoading, setIsLoading] = useState(false); //現在データ取得中かどうかを管理するためのフラグ。多重呼び出し防止にも。
  const [hasMore, setHasMore] = useState(true); // ← 終端検知用
  const limit = 3; //一度に取得したいスレッドの件
  console.log("親コンポーネント");

  // APIからデータ取得する関数
  const fetchComments = async (threadId, targetOffset = offset) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    console.log("ホームfetchCommentsのoffse", offset);

    try {
      const data = await Api(
        `/comments?threadId=${threadId}&offset=${targetOffset}&limit=${limit}`,
        "GET"
      );
      console.log("取得したコメント一覧:", data);
      console.log("コメントコンテキストのスレッドid確認:", threadId);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        if (targetOffset === 0) {
          setComments(data); // APIで取得したデータを state にセット offset=0 のときは全置き換え
        } else {
          //offset=0 じゃないつまり次のページを読み込んでるとき。
          const existingIds = new Set(
            comments.map((oneComment) => oneComment.id)
          ); //表示済みのスレッド（getthreads）から、それぞれの id を抽出して Set に格納する。
          // 目的：すでに取得している ID を一覧化する。ことこうすることで、「すでにあるやつは表示しない（重複除去）」という判断ができるように！
          const deduped = data.filter(
            (oneComment) => !existingIds.has(oneComment.id)
          ); //APIから取得された data の中から、まだ表示していない
          // （＝すでに取得済み ID に含まれていない）コメントだけを抽出。
          // 結果：まちがって同じコメントコメントが2回表示されないようにできる！
          setComments((prev) => [...prev, ...deduped]); // ← 次のページに行く時は追加。
          // 現在のコメント一覧（prev）に、新しく取得したコメント（deduped）を追加した配列」をセットするって意味
          console.log("取得したコメント一覧:2", data); //テスト用
        }
        setOffset((prev) => prev + limit); // 次ページのoffsetへ進める
      }
    } catch (error) {
      console.error("エラー:", error);
    } finally {
      setIsLoading(false); //falseにする＝もう読み込めなくする。
      // 最終的にデータがなくなったら読み込めないようにするため
    }
  };

  // 初回レンダリング時に API を取得
  useEffect(() => {
    if (threadId) {
      fetchComments(threadId);
    }
    console.log(" 初回マウント時にコメント1ページ目を取得");
  }, [threadId]);

  const reloadcomments = async (threadId) => {
    console.log("reloadThreads");
    // await console.log("1", offset);//テスト用
    await setComments([]); //現在のスレッド一覧を空にリセット
    // await console.log("2", offset);//テスト用
    await setOffset(0); //0件目から再取得する
    // await console.log("3", offset);//テスト用
    await setHasMore(true); //まだ取得できる状態って意味
    await fetchComments(threadId, 0); //offset=0（つまり最初）から再び投稿一覧を取得
    // console.log("4", offset);//テスト用
  };

  const contextValue = useMemo(
    () => ({
      comments,
      fetchComments,
      reloadcomments,
      hasMore,
      isLoading,
    }),
    [comments, fetchComments, reloadcomments, hasMore, isLoading]
  );

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};
