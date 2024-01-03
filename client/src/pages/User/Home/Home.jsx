import React from "react";
import UserNavbar from "../../../component/Navbar/UserNavbar";

const Home = () => {
  return (
    <>
      <UserNavbar />
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Explore the Next Level of Cooking
          </h1>
          <img
            src="src/assets/cook1.jpg"
            alt="Cooking Image"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
