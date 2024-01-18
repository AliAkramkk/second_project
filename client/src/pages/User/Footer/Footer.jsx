import React from "react";
import myLogo from "../../../assets/Lets cook/log1.png";
import myBackground from "../../../assets/Lets cook/bg4.jpg";

const Footer = () => {
  const footerStyle = {
    background:
      "linear-gradient(to right, rgb(243, 244, 246), rgb(209, 213, 219))",
  };

  return (
    <footer className="bg-white  shadow dark:bg-gray-900 " style={footerStyle}>
      <div className="w-full max-w-screen-xl mx-auto p-4 my-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={myLogo}
              className="h-44 w-44"
              alt="Your Logo"
              style={{ cursor: "pointer" }}
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
