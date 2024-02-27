import React, { useState, useEffect } from "react";
import UserNavbar from "../../../component/Navbar/UserNavbar";
import Footer from "../Footer/Footer";
import HomeCard from "../../../component/Card/HomeCard";
import myImage from "../../../assets/Lets cook/network.png";
import { auth, selectCurrentToken } from "../../../context/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { motion } from "framer-motion";
import AdminNavbar from "../../../component/Navbar/AdminNavbar";
import ChefNavbar from "../../../component/Navbar/ChefNavbar";
import "../../../component/Navbar/UserNavbarStyle.css";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setCategories(response?.data?.category.slice(0, 4));
        console.log("categories", response?.data?.category.slice(0, 4));
      } catch (error) {
        console.log();
      }
    };
    fetchData();
  }, []);

  const cardStyle = {
    background:
      "linear-gradient(to right, rgb(220, 230, 255), rgb(255, 220, 220), rgb(255, 250, 210))",
  };
  const cardStyle1 = {
    background:
      "linear-gradient(to right, rgb(235, 245, 255), rgb(255, 235, 235), rgb(255, 255, 225))",
  };
  const cardStyle2 = {
    background:
      "linear-gradient(to right, hsl(210, 60%, 95%), hsl(0, 60%, 95%), hsl(60, 100%, 95%))",
  };
  const cardStyle3 = {
    background:
      "linear-gradient(to right, hsl(210, 60%, 95%), hsl(0, 60%, 95%), hsl(60, 100%, 95%))",
  };
  return (
    <>
      <div className=" bg-gray-100 ">
        {user.role == 1000 ? (
          <AdminNavbar />
        ) : user.role == 3000 ? (
          <ChefNavbar />
        ) : (
          <UserNavbar />
        )}

        <HomeCard />

        <h4 className="text-xl font-bold text-gray-800 mb-4 mt-4 text-center">
          Verity of Category to Excel
        </h4>
        <div className="grid p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 z-10 relative bg-gray-100 ">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="feature text-center p-b-6 bg-gray-200 rounded-lg border-b "
              onClick={() =>
                navigate("/all-courses", { state: { category: category.name } })
              }
            >
              <img
                src={category.image.url}
                className="w-full h-60  object-cover mb-4 "
                style={{ objectPosition: "bottom" }}
              />
              <h3 className="text-xl font-semibold mb-2 ">{category.name}</h3>
            </motion.div>
          ))}
        </div>

        <div
          className="bg-white rounded-lg shadow dark:bg-gray-900 m-4"
          style={cardStyle3}
        >
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-4">
                PLATFORM FOR CONNECT AND
                <br />
                BUILD YOUR CAREER
                <br />
                <span className="text-xs text-gray-700 ml-4 ">
                  "OUR PLATFORM FACILITATES DIRECT COMMUNICATION BETWEEN USERS
                  AND TUTORS.COLLOBORATE,CONNECT <br />
                  AND SHOW CASE YOUR SKILLS WITH ENGAGE TO DO CAREER AND
                  IMPLIMENT NEW IDEA"
                </span>
              </h1>

              <img src={myImage} alt="Your Image" className="w-64 h-48" />
            </div>
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-7 mt-6 "
              // onClick={handleCourse}
            >
              EXPLORE COURSE
            </button> */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
