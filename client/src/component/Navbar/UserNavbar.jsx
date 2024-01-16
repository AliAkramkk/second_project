import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, logOut } from "../../context/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(auth);
  const usenavigate = useNavigate();
  const dispatch = useDispatch();

  const HandlelogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    usenavigate('/signin')
  };

  const handleLogin = () => {
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
          <Link to="/" className="text-white hover:text-gray-300 transition">
            HOME
          </Link>
          <Link
            to="/all-courses"
            className="text-white hover:text-gray-300 transition"
          >
            COURSE
          </Link>
          {/* Add more links as needed */}
        </div>
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <Hamburger />
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden">
            {/* Add mobile menu links */}
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
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/signin"
              className="border rounded px-2 py-1 text-white"
              onClick={handleLogin}
            >
              LOGIN
            </a>
          </div>
        ) : (
          <>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => {
                usenavigate("/user/profile");
              }}
            >
              {user?.pro ? (
                user.pro
              ) : (
                <FontAwesomeIcon className="me-1" icon={faUser} size="lg" />
              )}
              <span className="text-white">{user?.user}</span>
            </div>
            <button
              className="border rounded px-2 py-1 text-white"
              onClick={HandlelogOut}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default UserNavbar;
