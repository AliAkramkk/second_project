import React from "react";
import { Route, Routes } from "react-router-dom";
import RequerAuth from "../features/RequerAuth";
import Loading from "../component/Loading/Loading";
// import ChefHome from "../pages/Chef/ChefHome";
// import Profile from "../pages/User/UserProfile/Profile";
import Classes from "../pages/Chef/Classes/Classes";
import AddCourse from "../pages/Chef/AddCourse/AddCourse";
import MyCourse from "../pages/Chef/MyCourse/MyCourse";
// import ChefVidoes from "../pages/Chef/ChefVideos/ChefVidoes";
import AddChapters from "../pages/Chef/AddChapters/AddChapters";
import VideoDetatils from "../pages/videoDetails/VideoDetatils";
import LiveRoom from "../pages/Chef/LiveRoom/LiveRoom";
// import ChefProfile from "../pages/Chef/ChefProfile/ChefProfile";
const ChefHome = React.lazy(() => import("../pages/Chef/ChefHome"));
const ChefVidoes = React.lazy(() =>
  import("../pages/Chef/ChefVideos/ChefVidoes")
);
const ChefProfile = React.lazy(() =>
  import("../pages/Chef/ChefProfile/ChefProfile")
);
const Role = 3000;
function Chef() {
  return (
    <Routes>
      <Route element={<RequerAuth allows={[Role]} />}></Route>
      <Route
        exact
        path="/"
        element={
          <React.Suspense fallback={<Loading />}>
            <ChefHome />
          </React.Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <React.Suspense fallback={<Loading />}>
            <ChefProfile />
          </React.Suspense>
        }
      />
      <Route path="/courseList" element={<Classes />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/my-course" element={<MyCourse />} />
      <Route path="/room/:roomId" element={<LiveRoom />} />
      <Route
        path="/videos"
        element={
          <React.Suspense fallback={<Loading />}>
            <ChefVidoes />
          </React.Suspense>
        }
      />
      <Route path="/add-chapter" element={<AddChapters />} />
      <Route path="/video-details" element={<VideoDetatils />} />
    </Routes>
  );
}

export default Chef;
