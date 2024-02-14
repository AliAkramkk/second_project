import React from "react";
import AdminNavbar from "../../../component/Navbar/AdminNavbar";
import { auth, selectCurrentToken } from "../../../context/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../User/Footer/Footer";
import totalstd from "../../../assets/Lets cook/stud.png";
import course from "../../../assets/Lets cook/course.png";
// import course from "../../assets/Lets cook/course.png";
import certificate from "../../../assets/Lets cook/cer.png";
import revenue from "../../../assets/Lets cook/revenue.png";
import AdminTable from "../../../component/AdminHomeCard/AdminTable";
function AdminHome() {
  const user = useSelector(auth);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  console.log("user:", user);
  console.log("token:", token);
  return (
    <>
      <div className=" bg-gray-100 ">
        <AdminNavbar />

        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4 p-8">
          Hello ADMIN
          <br />
          <span className="text-2xl text-lime-600">
            Welcome To Let's Cook !
          </span>
          <br />
          <span className="text-2xl text-black  "> </span>
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
              Total Course
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 dark:bg-gradient-to-r from-grad1 via-grad2 to-grad3 dark:border-gray-700 dark:hover:bg-gray-700 m-4 h-52 bg-slate-200 w-60"
            // style={cardStyle}
          >
            <img src={totalstd} alt="Your Image" className="w-28 h-28 ml-10" />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Total Chef
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
        <AdminTable />
        <Footer />
      </div>
    </>
  );
}

export default AdminHome;
