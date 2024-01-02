import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import ChefHome from "../pages/Chef/ChefHome";
const Role = 3000;
function Chef() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}></Route>
      <Route exact path="/" element={<ChefHome />} />
    </Routes>
  );
}

export default Chef;
