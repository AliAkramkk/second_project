import React, { useState } from "react";
import ChefNavbar from "../../../component/Navbar/ChefNavbar";
import toast, { Toaster } from "react-hot-toast";
import { axiosPrivate } from "../../../api/axios";
import { useSelector } from "react-redux";
import { auth } from "../../../context/authReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
// import FileUpload from "../../../component/File/FileUpload";
import * as Yup from "yup";

function AddChapters() {
  // const [coverImage, setCoverImage] = useState(
  //   "https://thumbs.dreamstime.com/b/add-photo-simple-icon-image-thumbnail-sign-picture-placeholder-symbol-classic-flat-style-quality-design-element-simple-add-photo-220710759.jpg"
  // );
  const [demoVideo, setDemoVideo] = useState();
  const usenavigate = useNavigate();
  const [prevToastId, setPrevToastId] = useState(null);
  const user = useSelector(auth);

  const location = useLocation();
  const course_id = location.state?.id;
  console.log(user);

  const formik = useFormik({
    initialValues: {
      chapterNo: "",
      title: "",
      description: "",
      coverImage:
        "https://thumbs.dreamstime.com/b/add-photo-simple-icon-image-thumbnail-sign-picture-placeholder-symbol-classic-flat-style-quality-design-element-simple-add-photo-220710759.jpg",
      demoVideo: null,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(20, "Title must be at most 20 words"),
      description: Yup.string().required("Description is required"),
      coverImage: Yup.mixed().required("Cover Image is required"),
      demoVideo: Yup.mixed().required("Demo Video is required"),
      chapterNo: Yup.number()
        .required("chapterNo is required")
        .positive("chapterNo must be positive")
        .max(100, "maximum 100 chapters"),
    }),
    onSubmit: (values) => {
      handleaddcourseSubmit(values);
      console.log(values);
    },
  });
  const showToast = (message) => {
    if (prevToastId) {
      toast.dismiss(prevToastId);
    }

    const newToastId = toast.error(message, {
      duration: 3000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        width: "300px",
      },
    });
    setPrevToastId(newToastId);
  };
  const handleaddcourseSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);

    try {
      const formData = new FormData();
      formData.append("formdata", JSON.stringify(values));
      formData.append("coverImage", values.coverImage);
      formData.append("demoVideo", values.demoVideo);
      formData.append("id", course_id);

      console.log("DemoVideo size:", values.demoVideo.size);

      await axiosPrivate
        .post("/chef/add-chapter", { formData })
        .then((response) => {
          if (response.error) {
            // console.log(response.error.data.message);

            showToast(response.error.data.message);
          } else {
            toast.success(response.data.message);
            usenavigate(-1);
          }
        });

      // Reset the form if needed
      // e.target.reset();
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        // showToast(error.response.data.message);
      } else if (error.request) {
        console.log(error.resqust);
        // showToast(error.message);
      } else {
        console.log(error.message);
        // showToast(error.message);
      }
    }
  };

  const handleFileSelect = (file) => {
    if (file != null) {
      console.log(file);
    }
  };

  return (
    <>
      <ChefNavbar />

      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="flex"
      >
        {/* Left side: Add Thumbnail Card */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
          <h1 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-50">
            Add Chapter
          </h1>
          <div className="mb-4">
            {/* Thumbnail Section */}
            <h3 className="text-lg font-medium mb-2 text-neutral-800 dark:text-neutral-50">
              Thumbnail
            </h3>
            <img
              src={
                "https://thumbs.dreamstime.com/b/add-photo-simple-icon-image-thumbnail-sign-picture-placeholder-symbol-classic-flat-style-quality-design-element-simple-add-photo-220710759.jpg"
              }
              alt="coverImage"
              className="w-full max-w-xs h-32 object-cover rounded-lg mb-2"
            />
            <input
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={(event) =>
                formik.setFieldValue("coverImage", event.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.touched.coverImage && formik.errors.coverImage ? (
              <div className="text-red-500 text-sm">
                {formik.errors.coverImage}
              </div>
            ) : null}

            {/* Demo Video Section */}
            <h3 className="text-lg font-medium mb-2 text-neutral-800 dark:text-neutral-50">
              Demo Video
            </h3>
            <video
              controls
              src={demoVideo}
              className="w-full max-w-xs h-32 object-cover rounded-lg mb-2"
            ></video>
            <input
              id="demoVideo"
              name="demoVideo"
              type="file"
              accept="video/*"
              onChange={(event) =>
                formik.setFieldValue("demoVideo", event.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.touched.demoVideo && formik.errors.demoVideo ? (
              <div className="text-red-500 text-sm">
                {formik.errors.demoVideo}
              </div>
            ) : null}
          </div>
        </div>

        {/* Right side: Input Fields */}
        <div className="w-1/2 p-4">
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          {/* ChapterNo */}
          <div className="mb-6">
            <label
              htmlFor="chapterNo"
              className="block text-sm font-medium text-gray-600"
            >
              ChapterNo
            </label>
            <input
              id="chapterNo"
              name="chapterNo"
              type="number"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.chapterNo}
            />
            {formik.touched.chapterNo && formik.errors.chapterNo ? (
              <div className="text-red-500 text-sm">
                {formik.errors.chapterNo}
              </div>
            ) : null}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200"
          >
            Add Chapter
          </button>
          <Toaster />
        </div>
      </form>
    </>
  );
}

export default AddChapters;
