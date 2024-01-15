import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { decodeJwt } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../context/authReducer";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../api/axios";

const GoogleAuthComponent = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response, e.g., send it to your server for authentication
  };
  const navigate = useNavigate();
  const user = useSelector(auth);

  const handleGoogleLogin = (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const payload = credential ? decodeJwt(credential) : undefined;

      if (payload) {
        axios.post(
          "/signin/google",
          { payload },
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        // .then((res) => {
        //   console.log(res);
        //   const userCredentials = {
        //     user: res.data.fullname,
        //     userId: res.data.userId,
        //     accessToken: res.data.accessToken,
        //     role: res.data.role,
        //   };
        //   dispatch(setCredentials(userCredentials));
        //   res.data.role === 3000 ? navigate("/teacher") : navigate("/");
        // })
        // .catch((err) => {
        //   toastHelper.showToast(err?.response?.data?.message);
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId="1094703240851-iq03cn22ka6vnfogs3n2bkug36j5ibsu.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        {/* ; buttonText="Login with Google" onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"} */}
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleAuthComponent;
