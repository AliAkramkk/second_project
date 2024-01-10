import React, { useState, useEffect } from "react";
import ChefNavbar from "../../../component/Navbar/ChefNavbar";
import { axiosPrivate } from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { selectCurrentId } from "../../../context/authReducer";
import { useSelector } from "react-redux";

const MyCourse = () => {
  const [list, setList] = useState([]);
  const id = useSelector(selectCurrentId);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get(`/chef/myCourse/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <ChefNavbar />
      <h1>My Course</h1>
      <Toaster />
    </>
  );
};

export default MyCourse;
