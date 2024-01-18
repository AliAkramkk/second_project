import React, { useEffect, useState } from "react";
import UserNavbar from "../../../component/Navbar/UserNavbar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import Footer from "../Footer/Footer";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CourseDetails = () => {
  const cardStyle3 = {
    background:
      "linear-gradient(to right, hsl(210, 40%, 95%), hsl(0, 40%, 95%), hsl(60, 100%, 95%))",
  };
  const cardStyle4 = {
    background:
      "linear-gradient(to right, hsl(210, 30%, 95%), hsl(0, 30%, 95%), hsl(60, 100%, 95%))",
  };
  const location = useLocation();
  const [video, setVideo] = useState([]);
  const course_id = location.state?.id;

  useEffect;
  () => {
    const fetchCourse = async () => {
      try {
        const response = await axiosPrivate.get(`/selectedCourse${course_id}`);
        console.log("response", response);
      } catch (error) {}
    };
  };

  return (
    <>
      <UserNavbar />
      <h2>Current Pathname: {location.pathname}</h2>
      <p>Search: {course_id}</p>
      <p>Hash: {location.hash}</p>
      {/* <p>Hash: {location.state}</p> */}
      <div className="flex bg-gray-100">
        <div className="flex-1 text-left p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4 ml-4">
            Westrn Cake
          </h2>
          <h4 className="text-lg font-bold text-gray-800 mb-4 mt-4 ml-4">
            Westrn Cake - Chef Chrstepher
          </h4>
          <p className="ml-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
          <div
            className="bg-white rounded-lg shadow dark:bg-gray-900 m-4"
            style={cardStyle3}
          >
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  About:
                  <br />
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Incepted with
                  a vision and fueled by passion, our story unfolds amidst the
                  dynamic landscape of possibilities. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Vivamus fringilla risus eu
                  ipsum fermentum, ut tincidunt nisl tincidunt. Quisque
                  malesuada urna eu odio iaculis, sit amet venenatis ex
                  consequat.
                </p>
                {/* <img src={myImage} alt="Your Image" className="w-64 h-48" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 ml-24">
          <Card className="w-96 h-96 mt-28 " style={cardStyle4}>
            <CardHeader shadow={false} floated={false} className="h-96">
              <img
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  Apple AirPods
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  $95.00
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                With plenty of talk and listen time, voice-activated Siri
                access, and an available wireless charging case.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                BUY NOW
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
