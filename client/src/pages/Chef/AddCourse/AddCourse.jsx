import React, { useState } from "react";
import ChefNavbar from "../../../component/Navbar/ChefNavbar";
import toast, { Toaster } from "react-hot-toast";
import { axiosPrivate } from "../../../api/axios";
import { useSelector } from "react-redux";
import { auth } from "../../../context/authReducer";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Course Name is required"),
  blurb: Yup.string().required("Blurb is required"),
  description: Yup.string().required("Description is required"),
  aboutChef: Yup.string().required("About Chef is required"),
  price: Yup.number().required("Price is required"),
  demoVideo: Yup.mixed()
    .required("Demo Video is required")
    .nullable() // Allow null as a valid value
    .test(
      "fileSize",
      "Demo Video file size is too large",
      (value) => !value || value.size <= 1024 * 1024 * 10 // 10 MB
    )
    .test(
      "fileType",
      "Invalid file type. Only support video formats.",
      (value) => !value || value.type.startsWith("video/")
    ),

  category: Yup.string().required("Category is required"),
});

const AddCourse = () => {
  const [coverImage, setCoverImage] = useState(
    "https://thumbs.dreamstime.com/b/add-photo-simple-icon-image-thumbnail-sign-picture-placeholder-symbol-classic-flat-style-quality-design-element-simple-add-photo-220710759.jpg"
  );
  const [demoVideo, setDemoVideo] = useState();
  const navigate = useNavigate();
  const user = useSelector(auth);
  console.log(user);
  const [values, setValues] = useState({
    title: "",
    blurb: "",
    description: "",
    aboutChef: "",
    price: "",
    category: "",
    user: user.id,
  });

  // const isValidFileUploaded = (file) => {
  //   const validExtensions = ["png", "jpeg", "jpg"];
  //   const fileExtension = file.type.split("/")[1];
  //   return validExtensions.includes(fileExtension);
  // };

  // const handleThumbnailChange = (event) => {
  //   if (isValidFileUploaded(event.target.files[0])) {
  //     // Handle thumbnail change and update the state
  //     setCoverImage(event.target.files[0]);
  //     ImageTOBase(event.target.files[0]);
  //   } else {
  //     console.log("Invalid File Type");
  //   }
  // };

  // const handleDemoVideoChange = (event, formik) => {
  //   // Handle demo video change and update the state
  //   formik.setFieldValue("demoVideo", event.currentTarget.files[0]);

  //   if (event.currentTarget.files[0]) {
  //     setDemoVideo(event.currentTarget.files[0]);
  //   } else {
  //     setDemoVideo(
  //       "https://thumbs.dreamstime.com/b/add-photo-simple-icon-image-thumbnail-sign-picture-placeholder-symbol-classic-flat-style-quality-design-element-simple-add-photo-220710759.jpg"
  //     );
  //   }
  // };

  // const ImageTOBase = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setCoverImage(reader.result);
  //   };
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent default form submission behavior
    // setSubmitting(true);

    // const demoVideoFile = values.demoVideo ? values.demoVideo : null;
    // console.log("Form Values:", values); // Log the form values
    // console.log("Video File:", values.demoVideo);
    // const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("user", JSON.stringify(user));
    // formData.append("blurb", values.blurb);
    // formData.append("description", values.description);
    // formData.append("aboutChef", values.aboutChef);
    // formData.append("price", values.price);
    // formData.append("file", values.demoVideo);
    // formData.append("category", values.category);
    // formData.append("coverImage", coverImage);

    if (!demoVideo) {
      alert("Demo video is required");
      return;
    }

    const postData = {
      ...values,
      demoVideo,
      coverImage,
    };

    console.log(postData);

    try {
      const response = await axiosPrivate.post("/chef/add-course", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        toast.success(response.data.message);

        // Update the navigate call here
        navigate("/chef/my-course");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log("Form submitted!");
  };

  const handleValuesChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ChefNavbar />
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form encType="multipart/form-data">
            <div className="flex p-4">
              {/* Left side: Add Thumbnail Card */}
              <div className="w-1/2 p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
                <h2 className="text-xl font-medium mb-4 text-neutral-800 dark:text-neutral-50">
                  Add Thumbnail and Demo Video
                </h2>
                <div className="mb-4">
                  {/* Thumbnail Section */}
                  <h3 className="text-lg font-medium mb-2 text-neutral-800 dark:text-neutral-50">
                    Thumbnail
                  </h3>
                  <img
                    src={coverImage}
                    alt="coverImage"
                    className="w-full max-w-xs h-32 object-cover rounded-lg mb-2"
                  />
                  <input
                    id="coverImage"
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="bg-black text-white py-2 px-4 rounded w-full mb-4"
                  />

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
                    onChange={(e) => setDemoVideo(e.target.files[0])}
                    className="bg-black text-white py-2 px-4 rounded w-full"
                  />
                  <ErrorMessage
                    name="demoVideo"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Right side: Input Fields */}
              <div className="w-1/2 p-4">
                <div className="mb-6">
                  <label
                    htmlFor="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleValuesChange}
                    autoComplete="coursename"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blurb
                  </label>
                  <input
                    type="text"
                    id="blurb"
                    name="blurb"
                    onChange={handleValuesChange}
                    autoComplete="blurb"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="blurb"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="default-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    as="textarea"
                    id="description"
                    rows="4"
                    onChange={handleValuesChange}
                    autoComplete="description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="aboutChef"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    About Chef
                  </label>
                  <input
                    type="text"
                    id="aboutChef"
                    name="aboutChef"
                    onChange={handleValuesChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="aboutChef"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={handleValuesChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    onChange={handleValuesChange}
                    // value={values.category}
                    // onChange={(e) =>
                    //   setValues({ ...values, category: e.target.value })
                    // }
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  ADD Course
                </button>
              </div>
              <Toaster />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddCourse;
