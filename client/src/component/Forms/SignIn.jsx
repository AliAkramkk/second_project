import React, { useState } from "react";
import { axiosPrivate } from "../../api/axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useFormik } from "formik";
import { signinValidation } from "../signinValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../context/authReducer";
import { useDispatch } from "react-redux";

function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from.pathname;
  const [error, setError] = useState(null);
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidation, // You'll need to create this validation schema
    onSubmit: async (values) => {
      try {
        const response = await axiosPrivate.post("/signin", values);
        console.log(response);
        if (response.data.error) {
          // Use SweetAlert for error notification
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
        } else {
          console.log("Signin successful:", response.data.role);
          dispatch(
            setCredentials({
              user: response.data.user,
              role: response.data.role,
              token: response.data.accesstoken,
              id: response.data.id,
            })
          );
          if (response.data.role === 2000) {
            navigate(from || "/", { replace: true });
          } else if (response.data.role === 1000) {
            navigate(from || "/admin", { replace: true });
          } else if (response.data.role === 3000) {
            navigate(from || "/chef", { replace: true });
          }
        }
      } catch (error) {
        console.error("Error during signin:", error);
        console.log("Error response from server:", error.response);

        // Display the error message from the server, if available
        const errorMessage =
          error.response?.data?.message || "An error occurred during signin.";

        console.log("Received error message:", errorMessage);

        // Use SweetAlert for error notification
        Swal.fire({
          text: errorMessage,
        });

        setError(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-5 text-lg flex justify-between items-center text-[#002D74]">
          <p>Don't have an account?</p>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="py-2 px-3 dark-bg-gray-900 ms-3 bg-white border rounded-xl hover:scale-110 duration-300"
          >
            Register
          </button>
          {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}
        </div>
      </div>
    </div>
  );
}

export default Signin;
