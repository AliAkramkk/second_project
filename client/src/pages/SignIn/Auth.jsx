import React from "react";
import GoogleLogin from "react-google-login";

const GoogleAuthComponent = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response, e.g., send it to your server for authentication
  };

  return (
    <div>
      <h2>Google Authentication Example</h2>
      <GoogleLogin
        clientId="1094703240851-iq03cn22ka6vnfogs3n2bkug36j5ibsu.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleAuthComponent;
