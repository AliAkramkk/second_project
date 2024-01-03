import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../../api/axios";
import UserNavbar from "../../../component/Navbar/UserNavbar";
import ProfilePage from "../../../component/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../context/authReducer";

const Profile = () => {
  const [data, setData] = useState([]);
  const id = useSelector(selectCurrentId);
  console.log(id);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get(`/user/profile/${id}`);
        console.log(response.data);
        setData(response.data.student);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <UserNavbar />
      <ProfilePage data={data} />
    </>
  );
};

export default Profile;
