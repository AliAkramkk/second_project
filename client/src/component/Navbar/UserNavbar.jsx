import React from "react";
import { Link } from "react-router-dom";

function UserNavbar() {
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
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition"
          >
            About
          </Link>
          <Link
            to="/blog"
            className="text-white hover:text-gray-300 transition"
          >
            Blog
          </Link>
          {/* {user ? (
            // If user is logged in, show profile and user's name
            <>
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 transition"
              >
                Profile
              </Link>
              <span className="text-white">{user.name}</span>
            </>
          ) : (
            // If user is not logged in, show login link
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition"
            >
              Login
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
