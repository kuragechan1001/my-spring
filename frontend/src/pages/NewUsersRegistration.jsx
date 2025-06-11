import React from "react";
import NewUsersRegistrationPageFrom from "../form/NewUserRegistration/NewUsersRegistrationPageFrom.jsx";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import RetrunLoginpage from "../button/NewUserRegistraitonPageButton/MoveLoginPageButton.jsx";

const NewUsersRegistration = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <RetrunLoginpage />
      <NewUsersRegistrationPageFrom />
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};
export default NewUsersRegistration;
