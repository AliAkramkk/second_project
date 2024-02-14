import React from "react";
import myImage from "../../assets/Lets cook/malecook3.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import Homelottie from "../Lottie/Homelottie";

const HomeCard = () => {
  const navigate = useNavigate();
  const user = useSelector(auth);
  const cardStyle = {
    background:
      "linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
  };
  const cardStyle3 = {
    background:
      "linear-gradient(to right, hsl(210, 60%, 95%), hsl(0, 60%, 95%), hsl(60, 100%, 95%))",
  };
  const cardStyle1 = {
    background:
      "linear-gradient(to right, rgb(235, 245, 255), rgb(255, 235, 235), rgb(255, 255, 225))",
  };
  const handleCourse = () => {
    navigate("/all-courses");
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
            "Cook, Connect, Conquer"
            <br />
            <span className="text-lg text-gray-700 ml-4 p-3">
              Culinary Journey Starts Here!
            </span>
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-6"
            onClick={handleCourse}
          >
            EXPLORE COURSE
          </button>
        </div>
        <Homelottie
          style={{ width: "300px", height: "200px" }} // Set a fixed height
        />
      </div>
    </div>
  );
};

export default HomeCard;
