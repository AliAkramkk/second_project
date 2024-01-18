import React from "react";
import UserNavbar from "../../../component/Navbar/UserNavbar";
import Footer from "../Footer/Footer";
import HomeCard from "../../../component/Card/HomeCard";
import myImage from "../../../assets/Lets cook/network.png";

const Home = () => {
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
        <UserNavbar />
        <HomeCard />

        <h4 className="text-xl font-bold text-gray-800 mb-4 mt-4 text-center">
          Verity of Category to Excel
        </h4>
        <div className="flex">
          <a
            href="#"
            className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 dark:bg-gradient-to-r from-grad1 via-grad2 to-grad3 dark:border-gray-700 dark:hover:bg-gray-700 m-4 h-52"
            style={cardStyle}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-4"
            style={cardStyle1}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-4"
            style={cardStyle1}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-4"
            style={cardStyle2}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
        </div>
        {/* <div className="max-w-screen-xl mx-auto p-8">
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
      </div> */}
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-7 mt-6"
              // onClick={handleCourse}
            >
              EXPLORE COURSE
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
