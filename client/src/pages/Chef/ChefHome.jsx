import React from "react";
import ChefNavbar from "../../component/Navbar/ChefNavbar";
import Footer from "../User/Footer/Footer";
import totalstd from "../../assets/Lets cook/stud.png";
import course from "../../assets/Lets cook/course.png";
import certificate from "../../assets/Lets cook/cer.png";
import revenue from "../../assets/Lets cook/revenue.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function ChefHome() {
  const navigate = useNavigate();
  const cardStyle3 = {
    background:
      "linear-gradient(to right, hsl(210, 60%, 95%), hsl(0, 60%, 95%), hsl(60, 100%, 95%))",
  };
  const cardStyle4 = {
    background:
      "linear-gradient(to right, hsl(210, 40%, 95%), hsl(0, 40%, 95%), hsl(60, 100%, 95%))",
  };
  const handleCourse = () => {
    navigate("/chef/add-course");
  };
  return (
    <>
      <div className=" bg-gray-200 ">
        <ChefNavbar />
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4 p-3">
          Hello Chef
          <br />
          <span className="text-2xl text-lime-600  ">
            {" "}
            Welcome To Let's Cook !
          </span>
          <br />
          <span className="text-2xl text-black  ">
            {" "}
            Congratulation, You Have Some Good News
          </span>
        </h1>
        <div className="flex justify-center ">
          <a
            href="#"
            className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 dark:bg-gradient-to-r from-grad1 via-grad2 to-grad3 dark:border-gray-700 dark:hover:bg-gray-700 m-4 h-52 bg-slate-200 w-60"
            // style={cardStyle}
          >
            <img src={totalstd} alt="Your Image" className="w-28 h-28 ml-10" />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Total Students
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 dark:bg-gradient-to-r from-grad1 via-grad2 to-grad3 dark:border-gray-700 dark:hover:bg-gray-700 m-4 h-52 bg-slate-200 w-60"
            // style={cardStyle}
          >
            <img src={course} alt="Your Image" className="w-28 h-28 ml-10" />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Your Course
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 dark:bg-gradient-to-r from-grad1 via-grad2 to-grad3 dark:border-gray-700 dark:hover:bg-gray-700 m-4 h-52 bg-slate-200 w-60"
            // style={cardStyle}
          >
            <img
              src={certificate}
              alt="Your Image"
              className="w-28 h-28 ml-10"
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Certificate
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 dark:bg-gradient-to-r from-grad1 via-grad2 to-grad3 dark:border-gray-700 dark:hover:bg-gray-700 m-4 h-52 bg-slate-200 w-60"
            // style={cardStyle}
          >
            <img src={revenue} alt="Your Image" className="w-28 h-28 ml-10" />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Total Revenue
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-4 p-3">
          Recent Uploads
        </h1>
        <div className="flex  gap-4  flex-wrap mt-8">
          {/* {currentCourses.map((course, i) => ( */}
          <div
            // key={i}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-80   mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            style={cardStyle3}
            // style={cardStyle1}
          >
            <div className="flex justify-center pt-2">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {/* {course.title} */}
              </p>
            </div>
            <div className="h-48 overflow-hidden">
              <img
                className="w-full h-full object-cover px-4"
                // src={course.coverImage.url}
                // alt={course.title}
              />
            </div>
            <div className="p-4 flex-grow">
              <p className="text-sm text-gray-600 h-12 overflow-hidden leading-4 mb-4">
                {/* {course.blurb} */}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-orange-600">
                  {/* ${course.price} */}
                </p>
                {/* {!course.users.includes(id) ? ( */}
                <button
                  // onClick={() =>
                  //   usenavigate("/coursedetails", {
                  //     state: { id: course._id },
                  //   })
                  // }
                  className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black  px-4 py-2 hover:bg-slate-200 transition duration-300 ease-in-out"
                >
                  Enroll now
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
                {/* ) : ( */}
                {/* <button
                  // onClick={() => usenavigate("/user/mylearnigs", {})}
                  className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out"
                >
                  Watch now
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button> */}
                {/* )} */}
              </div>
            </div>
          </div>
          {/* // ))} */}
        </div>
        <div
          className="flex bg-white rounded-lg shadow dark:bg-gray-900 m-4"
          style={cardStyle4}
        >
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
                <br />
                <span className="text-lg text-gray-700 ml-4 p-3">
                  Ready to share your expertise with the world?
                </span>
              </h1>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-7 mt-6"
              onClick={handleCourse}
            >
              ADD COURSE
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ChefHome;
