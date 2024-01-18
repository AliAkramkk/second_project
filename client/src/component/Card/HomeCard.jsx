import React from "react";
import myImage from "../../assets/Lets cook/malecook3.png";
import { useNavigate } from "react-router-dom";
const HomeCard = () => {
  const navigate = useNavigate();
  const cardStyle = {
    background:
      "linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
  };
  const handleCourse = () => {
    navigate("/all-courses");
  };
  return (
    <div
      className="bg-white rounded-lg shadow dark:bg-gray-900 m-4"
      style={cardStyle}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
            "Cook, Connect, Conquer"
            <br />
            <span className="text-lg text-gray-700 ml-4 p-3">
              {" "}
              Culinary Journey Starts Here!
            </span>
          </h1>
          {/* <img src={myImage} alt="Your Image" className="w-48 h-" /> */}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-7 mt-6"
          onClick={handleCourse}
        >
          EXPLORE COURSE
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
