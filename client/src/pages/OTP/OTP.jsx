import React, { useState, useRef, useEffect } from "react";
import "./OTP.css";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from "../../../public/otp1.jpg";
import UserNavbar from "../../component/Navbar/UserNavbar";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(false);
  // const [loading, setLoading] = useState(false);
  const usenavigate = useNavigate();
  const user = useSelector(auth);
  console.log(user);
  const userEmail = user ? user.email : null;
  console.log(userEmail);
  //  useEffect(() => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          setResendDisabled(false); // Enable the resend button after the timer reaches zero
          return 0;
        }
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleResend = () => {
    setResendDisabled(true);
    axios
      .get(
        "/resend-otp", // Send the email as the payload
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.message === "Enter Your New OTP") {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error in OTP resend:", error);
        // Handle error if OTP resend fails
      })
      .finally(() => {
        // Reset timer to 30 seconds
        setTimer(30);
      });
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    } else {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    } else if (index > 0 && value === "") {
      inputRefs[index - 1].current.focus();
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
  };

  // const handleResend = () => {
  //   setResendDisabled(true);
  //   setLoading(true);
  //   // Simulate OTP resend logic with a delay (replace this with your actual resend logic)
  //   simulateOtpResend()
  //     .then(() => {
  //       // Disable the resend button and reset the timer

  //       setTimer(60); // Reset timer to one minute

  //       // Start the countdown timer
  //       const intervalId = setInterval(() => {
  //         setTimer((prevTimer) => {
  //           console.log(prevTimer);
  //           if (prevTimer > 0) {
  //             return prevTimer - 1;
  //           } else {
  //             clearInterval(intervalId);
  //             setResendDisabled(false); // Enable the resend button after the timer reaches zero
  //             setLoading(false);
  //             return 0;
  //           }
  //         });
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       console.error("Error in OTP resend:", error);
  //       // Handle error if OTP resend fails
  //       setResendDisabled(false);
  //       setLoading(false);
  //     });
  // };

  // Simulate OTP resend logic (replace this with your actual resend logic)
  // const simulateOtpResend = () => {
  //   return new Promise((resolve, reject) => {
  //     // Simulate a delay of 2 seconds (replace this with your actual delay)
  //     setTimeout(() => {
  //       // Resolve the promise to indicate successful OTP resend
  //       resolve();
  //     }, 2000);
  //   });
  // };

  const handleSubmit = (e) => {
    let OTP = otp.join("");
    e.preventDefault();
    console.log("Submit User", user);
    axios
      .post(
        "/verifyotp",
        { OTP, user },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        console.log(response.status);
        if (response.data.message == 2000) {
          usenavigate("/signin");
        } else if (response.data.message == 3000) {
          console.log("in if");
          usenavigate("/signin");
        }
      })
      .catch((error) => {
        if (error.response) {
          // Handle errors and display notifications to the user
          console.error("Error in OTP verification:", error);
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <>
      <UserNavbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white rounded-lg shadow-md dark:bg-neutral-800 p-8 w-72 ">
            <h1 className="flex justify-center text-2xl font-bold text-red-800">
              {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </h1>
            <p className="mb-4">An OTP is sent to your email.</p>
            <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="number"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded text-center animation-fade-in p-4"
                  ref={inputRefs[index]}
                  disabled={timer > 0 ? false : true}
                />
              ))}
            </div>
            <div className="mt-4 space-x-4">
              {timer === 0 ? (
                <button
                  onClick={handleResend}
                  disabled={resendDisabled}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  {resendDisabled ? "Resending..." : "Resend OTP"}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 p-4 mt-3"
                  disabled={timer > 0 ? false : true} // Disable submit button during countdown
                >
                  Submit
                </button>
              )}
            </div>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};
export default OTP;
