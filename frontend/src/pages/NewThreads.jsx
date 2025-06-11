import React from "react";
import RetrunHomeBotton from "../button/NewThreadsPageBotton/RetrunHomeBotton";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";

import NewTreadsForm from "../form/NewThreads/NewThreadsForm";

export const NewTreads = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className={"block"}>
        <h1>新規投稿</h1>
        <RetrunHomeBotton />
        <NewTreadsForm />
      </div>
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default NewTreads;
