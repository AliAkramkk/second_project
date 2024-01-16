import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/User/Home/Home";
const Home = React.lazy(() => import("./pages/User/Home/Home"));

import UserSignup from "./pages/SignUp/UserSignup";
import UserSignin from "./pages/SignIn/UserSignin";
import OTP from "./pages/OTP/Otp";
import Layout from "./features/Layout";
import User from "./routers/User";
import Admin from "./routers/Admin";
import Chef from "./routers/Chef";
import ForgetPassword from "./pages/ForgotPassword/ForgetPassword";
import Otp from "./pages/ForgotPassword/Otp";
import SetPassword from "./pages/ForgotPassword/SetPassword";
import AllCourse from "./pages/User/AllCourses/AllCourse";
import Unotherised from "./pages/Unotherised/Unotherised";
import CourseDetails from "./pages/User/CourseDetails/CourseDetails";
import Loading from "./component/Loading/Loading";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/user/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/chef/*" element={<Chef />} />

        <Route
          exact
          path="/"
          element={
            <React.Suspense fallback={<Loading />}>
              <Home />
            </React.Suspense>
          }
        />
        <Route exact path="/signin" element={<UserSignin />} />
        <Route path="/otp" element={<OTP />} />
        <Route exact path="/signup" element={<UserSignup />} />
        <Route exact path="/forgot-password" element={<ForgetPassword />} />
        <Route exact path="/forgot-otp" element={<Otp />} />
        <Route exact path="/reset-password" element={<SetPassword />} />
        <Route path="/all-courses" element={<AllCourse />} />
        <Route path="/coursedetails" element={<CourseDetails />} />
        <Route exact path="/uno" element={<Unotherised />} />
      </Route>
    </Routes>
  );
}

export default App;
