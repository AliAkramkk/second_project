import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useFormik } from "formik";
import { signinValidation } from "../signinValidation";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidation, // You'll need to create this validation schema
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/signin",
          values
        );

        if (response.data.errors) {
          // Use SweetAlert for error notification
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.error,
          });
        } else {
          console.log("Signin successful:", response.data);
          // Redirect to the dashboard or home page upon successful signin
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during signin:", error);
        console.log("Error response from server:", error.response);

        // Display the error message from the server, if available
        const errorMessage =
          error.response?.data?.error || "An error occurred during signin.";

        console.log("Received error message:", errorMessage);

        // Use SweetAlert for error notification
        Swal.fire({
          icon: "error",
          title: "Error",
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
      </div>
    </div>
  );
}

export default Signin;
