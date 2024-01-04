import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import ChefHome from "../pages/Chef/ChefHome";
import Profile from "../pages/User/UserProfile/Profile";
const Role = 3000;
function Chef() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}></Route>
      <Route exact path="/" element={<ChefHome />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default Chef;
