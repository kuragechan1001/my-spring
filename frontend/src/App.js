import React from "react";
import NewUsersRegistration from "./pages/NewUsersRegistration";
import Home from "./pages/home.jsx";
import NewThreads from "./pages/NewThreads.jsx";
import User from "./pages/User.jsx";
import Login from "./pages/Login.jsx";
import PickupThread from "./pages/PickupThread.jsx";
import NewComment from "./pages/NewComments.jsx";
import { Routes, Route } from "react-router-dom";

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
        <Route path="/NewComment" element={<NewComment />} />
        {/* ルートを確認 */}
      </Routes>
    </div>
  );
};

export default App;
