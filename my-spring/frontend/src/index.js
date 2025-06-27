import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThreadsProvider } from "./contexts/ThreadsContext";
import { LoginProvider } from "./contexts/LoginIdContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    {/* ユーザー情報の保持*/}
    <ThreadsProvider>
      {/* 投稿の一覧取得 */}
      <BrowserRouter>
        {/*ページ移行に使うやつ*/}
        <App />
      </BrowserRouter>
    </ThreadsProvider>
  </LoginProvider>
);
