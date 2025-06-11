import React from "react";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import RetrunHomeBotton from "../button/PickupThreadButton/RetrunHomeBotton";
import MoveNewCommentspage from "../button/PickupThreadButton/MoveNewCommentspage";
import OneThread from "../components/PickupThread/OneThread";

const PickupThread = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <h1>一つの投稿を表示する場所</h1>
      <RetrunHomeBotton />
      {/* <MoveNewCommentspage /> */}
      <OneThread />
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};
export default PickupThread;
