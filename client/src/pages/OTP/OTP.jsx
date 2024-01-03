import React, { useState, useRef, useEffect } from "react";
import "./OTP.css";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const OTP = () => {
  const user = useSelector(auth);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [timer, setTimer] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const usenavigate = useNavigate();

  useEffect(() => {
    // Start the countdown timer
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

  const handleResend = () => {
    // Simulate OTP resend logic with a delay (replace this with your actual resend logic)
    simulateOtpResend()
      .then(() => {
        // Disable the resend button and reset the timer
        setResendDisabled(true);
        setTimer(60); // Reset timer to one minute

        // Start the countdown timer
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => {
            console.log(prevTimer);
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              clearInterval(intervalId);
              setResendDisabled(false); // Enable the resend button after the timer reaches zero
              return 0;
            }
          });
        }, 1000);
      })
      .catch((error) => {
        console.error("Error in OTP resend:", error);
        // Handle error if OTP resend fails
      });
  };

  // Simulate OTP resend logic (replace this with your actual resend logic)
  const simulateOtpResend = () => {
    return new Promise((resolve, reject) => {
      // Simulate a delay of 2 seconds (replace this with your actual delay)
      setTimeout(() => {
        // Resolve the promise to indicate successful OTP resend
        resolve();
      }, 2000);
    });
  };

  const handleSubmit = (e) => {
    let OTP = otp.join("");

    console.log({
      OTP,
      user: { id: user.id, token: user.token, role: user.role },
    });

    e.preventDefault();
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
          // usenavigate("/chef/login", { replace: true });
        }
      })
      .catch((error) => {
        if (error.response) {
          // showToast(error.response.data.message);
        } else if (error.request) {
          // showToast(error.message);
        } else {
          // showToast(error.message);
        }
      });
  };

  return (
    <div className="otp-container">
      <p>
        An OTP is sent to your email. Time left:{" "}
        {String(Math.floor(timer / 60)).padStart(2, "0")}:
        {String(timer % 60).padStart(2, "0")}
      </p>
      <h1>Enter OTP</h1>
      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="number"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="otp-digit"
            ref={inputRefs[index]}
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      <button
        onClick={handleResend}
        disabled={resendDisabled}
        className="resend-button"
      >
        Resend OTP
      </button>
      <Toaster />
    </div>
  );
};
export default OTP;
