import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import UserSignup from "./pages/SignUp/UserSignup";
import UserSignin from "./pages/SignUp/UserSignin";
import OTP from "./pages/OTP/Otp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<UserSignin />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
