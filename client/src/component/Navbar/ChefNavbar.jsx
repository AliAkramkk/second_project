import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, logOut } from "../../context/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ChefNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(auth);
  const usenavigate = useNavigate();
  const dispatch = useDispatch();

  const HandlelogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    usenavigate("/signin");
  };

  const handlelogin = () => {
    usenavigate("/signin");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const navbarStyle = {
    background:
      "linear-gradient(to right,  rgb(223, 224, 226), rgb(189, 193, 199))",
  };

  return (
    <nav className="bg-gray-800 p-4" style={navbarStyle}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/chef/" className="text-white text-2xl font-bold">
            Let's Cook
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/chef/courseList"
            className="text-gray-500 lg:mb-0 font-semibold dark:text-gray-400 hover:underline me-4 md:me-6"
          >
            CLASSES
          </Link>
          <Link
            to="/chef/my-course"
            className="text-gray-500 lg:mb-0 font-semibold dark:text-gray-400 hover:underline me-4 md:me-6"
          >
            MY COURSE
          </Link>
          <Link
            to="/chef/transaction"
            className="text-gray-500 lg:mb-0 font-semibold dark:text-gray-400 hover:underline me-4 md:me-6"
          >
            TRANSACTION
          </Link>
          {/* Add other navigation links as needed */}
        </div>
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <Hamburger />
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/course" className="nav-link">
              Course
            </Link>
            <Link to="/community" className="nav-link">
              Community
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            {!user?.user ? (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            )}
          </div>
        )}
        {!user?.user ? (
          <div
            className="hidden signinandsignup md:flex space-x-4"
            onClick={handlelogin}
          >
            <Link to="/login" className="logbutton">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              LOGIN
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div
              className="cursor-pointer flex items-end"
              onClick={() => {
                usenavigate("/chef/profile");
              }}
            >
              {user?.pro ? (
                user.pro
              ) : (
                <FontAwesomeIcon className="me-1" icon={faUser} size="lg" />
              )}
              <span className="text-white">{user?.user}</span>
            </div>
            <button className="border rounded p-1" onClick={HandlelogOut}>
              Logout
            </button>
          </div>
        )}
      </div>
      {/* <img
        src="assets/img/avatars/avatar4.png"
        className="h-12 w-12 rounded-full"
        alt="avatar"
      /> */}
    </nav>
  );
}

export default ChefNavbar;
