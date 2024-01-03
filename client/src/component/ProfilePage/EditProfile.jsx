import React, { useState } from "react";
import { axiosPrivate } from "../../api/axios";

const EditProfile = ({
  isEditModalOpen,
  setIsEditModalOpen,
  userData,
  role,
}) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastnane, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const toggleModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userForm = {
      username: username,
      firstname: firstname,
      lastname: lastnane,
      phone: phone,
      address: address,
      city: city,
      state: state,
      user_id: userData.id,
    };

    if (role) {
      try {
        const response = await axiosPrivate.put("/editprofile", userForm, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log("success edit profile");
        console.log(response.data.message);
      } catch (error) {
        console.log("somthing went wrong");
      }
    }
  };

  return (
    <>
      {/* {isEditModalOpen && ( */}
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden={!isEditModalOpen}
        className="fixed top-9 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Details
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form class="p-4 md:p-5" onSubmit={handleSubmit}>
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    UserName
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={userData.username}
                    onChange={(e) => setUsername(e.target.value)}
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="firstname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    FirstName
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setFirstname(e.target.value)}
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="lastname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    LastName
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setLastname(e.target.value)}
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder={
                    //   userData.phone ? userData.phone : "enter phone number"
                    // }
                    onChange={(e) => setPhone(e.target.value)}
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="address"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder={
                    //   userData.address ? userData.address : "enter address"
                    // }
                    onChange={(e) => setAddress(e.target.value)}
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="city"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder={userData.city ? userData.city : "enter city"}
                    onChange={(e) => setCity(e.target.value)}
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="state"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder={
                    //   userData.state ? userData.state : "enter state"
                    // }
                    onChange={(e) => setState(e.target.value)}
                    required=""
                  />
                </div>
              </div>
              <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                Add
                new
                product
              >
                {/* <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default EditProfile;
