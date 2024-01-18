import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { decodeJwt } from "jose";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../api/axios";
import { setCredentials } from "../../context/authReducer";
// import jwt_decode from "jwt-decode";
const GoogleAuthComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const payload = credential ? decodeJwt(credential) : undefined;
      console.log("hi", payload);
      if (payload) {
        axios
          .post(
            "/signin/google",
            { payload },
            {
              withCredentials: true,
              credentials: "include",
            }
          )
          .then((res) => {
            console.log(res);
            const userCredentials = {
              user: res.data.username,
              userId: res.data.id,
              accesstoken: res.data.token,
              role: res.data.role,
            };
            dispatch(setCredentials(userCredentials));
            res.data.role === 3000 ? navigate("/chef") : navigate("/");
          })

          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    } catch (error) {
      console.error("Error in Google login:", error);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId="366855946507-rs5dhs988nto28ftiqdhjrpug9inkc31.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      <Toaster />
    </>
  );
};

export default GoogleAuthComponent;
