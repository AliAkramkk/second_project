import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useFormik } from "formik";
import { signupValidation } from "../signupValidation";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import backgroundImage from "../../../public/signup.jpg";
// Signup component
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Formik hook for form handling
  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        isChef: false,
      },
      validationSchema: signupValidation,
      onSubmit: async (values) => {
        try {
          // Axios request with proper headers and data
          const response = await axiosPrivate.post("/signup", values);

          // Handle different scenarios based on the response
          if (
            response.data.errors &&
            response.data.error.includes("already exists")
          ) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.error,
            });
          } else if (response.data.errors) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.error,
            });
          } else {
            console.log("Signup successful:", response.data);
            navigate("/otp"); // Redirect to the signin page upon successful signup
          }
        } catch (error) {
          console.error("Error during signup:", error);
          console.log("Error response from server:", error.response);

          // Display the error message from the server, if available
          const errorMessage =
            error.response?.data?.error || "An error occurred during signup.";

          console.log("Received error message:", errorMessage);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });

          setError(errorMessage);
        }
      },
    });

  const handleCheckboxChange = () => {
    setFieldValue("isChef", !values.isChef);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex p-4">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white bg-opacity-80 p-8 rounded-md shadow-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <br />
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <br />
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <br />
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <br />
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <br />
                <div className="mt-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isChef"
                      checked={values.isChef}
                      onChange={handleCheckboxChange}
                      className="hidden"
                    />
                    <div className="w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center">
                      <div
                        className={`bg-${
                          values.isChef ? "blue" : "gray"
                        }-500 w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
                          values.isChef ? "translate-x-6" : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                    <p className="ml-2">Are you a chef?</p>
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
