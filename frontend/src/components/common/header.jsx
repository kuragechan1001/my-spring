import React from "react";
import logo192 from "../../design/images/logo192.png";
import "../../design/style/ReactMark.css";

export const Header = () => {
  return (
    <div>
      <h1>
        {" "}
        <img src={logo192} className="App-logo" id="react-logo" alt="logo" />
        ヘッダー
        <img src={logo192} className="App-logo" id="react-logo" alt="logo" />
      </h1>
    </div>
  );
};

export default Header;
