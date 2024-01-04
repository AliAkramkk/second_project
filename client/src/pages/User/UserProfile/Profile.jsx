import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../../api/axios";
import UserNavbar from "../../../component/Navbar/UserNavbar";
import ProfilePage from "../../../component/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../context/authReducer";
import { selectCurrentUser } from "../../../context/authReducer";
import { auth } from "../../../context/authReducer";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../context/authReducer";

const Profile = () => {
  const [data, setData] = useState([]);
  const id = useSelector(selectCurrentId);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  console.log(id);
  useEffect(() => {
    fetchData();
  }, [dispatch, id]);

  async function fetchData() {
    try {
      const response = await axiosPrivate.get(`/user/profile/${id}`);
      console.log(response.data);
      dispatch(setCredentials(response.data.student));
      setData(response.data.student);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <UserNavbar />
      <ProfilePage data={data} setData={setData} fetchData={fetchData} />
    </>
  );
};

export default Profile;
