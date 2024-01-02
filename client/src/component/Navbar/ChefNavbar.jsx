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
  };

  const handlelogin = () => {
    usenavigate("/signin");
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-2xl font-bold">
            Let's Cook
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/admin"
            className="text-white hover:text-gray-300 transition"
          >
            DASHBOARD
          </Link>
          {/* <Link
            to="/admin/userlist"
            className="text-white hover:text-gray-300 transition"
          >
            STUDENTS
          </Link> */}
          {/* <Link
            to="/admin/cheflist"
            className="text-white hover:text-gray-300 transition"
          >
            CHEFS
          </Link> */}
          {/* <Link
            to="/admin/allcourses"
            className="text-white hover:text-gray-300 transition"
          >
            ALL COURSES
          </Link> */}
          {/* <Link
            to="/admin/payments"
            className="text-white hover:text-gray-300 transition"
          >
            PAYMENTS
          </Link> */}
        </div>
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <Hamburger />
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              Course
            </a>
            <a href="#" className="nav-link">
              Community
            </a>
            <a href="#" className="nav-link">
              Blog
            </a>
            {!user?.user ? (
              <a href="#" className="nav-link">
                Login
              </a>
            ) : (
              <a href="#" className="nav-link">
                Profile
              </a>
            )}
          </div>
        )}
        {!user?.user ? (
          <div
            className="hidden signinandsignup md:flex space-x-4"
            onClick={handlelogin}
          >
            <a href="#" className="logbutton">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              LOGIN
            </a>
          </div>
        ) : (
          <>
            <div
              className="hidden cursor-pointer signinandsignup md:flex items-end"
              onClick={() => {
                usenavigate("/user/profile");
              }}
            >
              {user?.pro ? (
                user.pro
              ) : (
                <FontAwesomeIcon className="me-3" icon={faUser} size="2x" />
              )}{" "}
              {user?.user}
            </div>
            <button
              className="ms-3 mt-2 border rounded p-1"
              onClick={HandlelogOut}
            >
              logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default ChefNavbar;
