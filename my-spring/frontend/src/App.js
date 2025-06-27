import React from "react";
import NewUsersRegistration from "./pages/NewUsersRegistration";
import Home from "./pages/home.jsx";
import NewThreads from "./pages/NewThreads.jsx";
import User from "./pages/User.jsx";
import Login from "./pages/Login.jsx";
import PickupThread from "./pages/PickupThread.jsx";
import { Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/newThreads" element={<NewThreads />} />
        <Route path="/User" element={<User />} />
        <Route path="/NewUserRegistration" element={<NewUsersRegistration />} />
        <Route path="/" element={<Login />} />
        <Route path="/PickupThread/:id" element={<PickupThread />} />
        <Route path="/MyPage" element={<MyPage />} />
        {/* ルートを確認 */}
      </Routes>
    </div>
  );
};

export default App;
