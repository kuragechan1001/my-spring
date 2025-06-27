import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import MoveHomeBotton from "../button/LoginPageButton/MoveHomeBotton";
import MoveNewUserRegistraion from "../button/LoginPageButton/MoveNewUserRegistraion";
import LoginForm from "../form/Login/LoginForm";
import React, { useState, useContext } from "react";
import { LoginIdContext } from "../contexts/LoginIdContext";

export const Login = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <h1>ログインページ</h1>
      <LoginForm />
      <MoveHomeBotton />
      <MoveNewUserRegistraion />
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default Login;
