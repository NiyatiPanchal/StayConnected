import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import Chat from "./components/chat/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
