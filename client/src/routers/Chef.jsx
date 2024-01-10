import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import ChefHome from "../pages/Chef/ChefHome";
import Profile from "../pages/User/UserProfile/Profile";
import Classes from "../pages/Chef/Classes/Classes";
import AddCourse from "../pages/Chef/AddCourse/AddCourse";
import MyCourse from "../pages/Chef/MyCourse/MyCourse";
const Role = 3000;
function Chef() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}></Route>
      <Route exact path="/" element={<ChefHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/courseList" element={<Classes />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/my-course" element={<MyCourse />} />
    </Routes>
  );
}

export default Chef;
