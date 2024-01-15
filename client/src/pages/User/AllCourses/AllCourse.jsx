import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import { Spin as Hamburger } from "hamburger-react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiSearchAlt } from "react-icons/bi";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../context/authReducer";
import UserNavbar from "../../../component/Navbar/UserNavbar";
import { axiosPrivate } from "../../../api/axios";

// const categories = [
//   null,
//   "cooking",
//   "Italian",
//   "Asian Fusion",
//   "Gourmet Desserts",
//   "Healthy Meal Planning",
// ];
// const chefs = [null, "usman", "Chef 2", "Chef 3", "Chef 4"];
// const dropdownStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     border: state.isFocused ? "1px solid #424542" : "1px solid balck",
//     width: "15rem",
//     hight: "10rem",
//     padding: "10px",
//     borderRadius: "8px",
//     text: "#424542",
//     backgroundColor: "rgb(245, 245, 245)",
//     transition: "box-shadow 0.3s",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isFocused ? "#60A5FA" : "white",
//     color: state.isFocused ? "white" : "#4B5563",
//   }),
// };

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const id = useSelector(selectCurrentId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/courses");
        console.log(response.data.course);
        setCourses(response.data.course);
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchData();
  }, []);

  const [filter, setFilter] = useState({
    chef: "",
    category: "",
    maxPrice: Infinity,
    minPrice: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const usenavigate = useNavigate();

  const handleFilterChange = (filterName, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesChef = filter.chef ? course.chef === filter.chef : true;
    const matchesCategory = filter.category
      ? course.category === filter.category
      : true;
    const matchesMinPrice = course.price >= filter.minPrice;
    const matchesMaxPrice = course.price <= filter.maxPrice;
    return matchesChef && matchesCategory && matchesMaxPrice && matchesMinPrice;
  });

  const searchedCourses = filteredCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = searchedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(searchedCourses.length / itemsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <UserNavbar />
      {/* <div
        style={{ boxShadow: "inset 0 0 50px rgba(72, 57, 94, 0.5)" }}
        className="hidden mt-2 bg-gray-100 items-center border-b-2   lg:flex justify-between"
      > */}
      {/* <div>
          <Select
            options={chefs.map((chef) => ({ value: chef, label: chef }))}
            onChange={(e) => handleFilterChange("chef", e.value)}
            placeholder="Select a chef"
            isSearchable={false}
            styles={dropdownStyles}
            className="p-4"
          />
        </div> */}
      {/* <div>
          <Select
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            onChange={(e) => handleFilterChange("category", e.value)}
            placeholder="Select a category"
            className="  p-4"
            isSearchable={false}
            styles={dropdownStyles}
          />
        </div> */}
      {/* <div className="input  p-4">
          <Input
            className="w-44 bg-gray-100"
            id="outlined-basic"
            label="Max price..."
            variant="outlined"
            type="number"
            onChange={(e) =>
              handleFilterChange(
                "maxPrice",
                e.target.value ? e.target.value : Infinity
              )
            }
          />
        </div>
        <div className="input p-4">
          <Input
            className="w-44 bg-gray-100"
            id="outlined-basic"
            label="Min price..."
            variant="outlined"
            type="number"
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
        </div>

        <div className="bg-[#e4f7f1]  border border-gray-300 h-14 max-w-[650px] w-full md:p-4 p-4 mb-2 md:mt-2 shadow-lg rounded-lg flex justify-between sm:me-10 m-0">
          <input
            className="bg-[#e4f7f1] placeholder-gray-400 w-full text-sm outline-none focus:outline-none"
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ color: "black" }}
          />
          <BiSearchAlt size={30} />
        </div>
      </div> */}
      {/* Mobile Menu Button */}
      <div className="w-full lg:hidden bg-gray-100 ">
        <div className="flex mt-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-transparent border h-14 me-8  items-center p-1 md:p-4  md:mt-2 shadow-lg rounded-lg flex  justify-center"
          >
            <Hamburger size={20} direction="right" />
          </button>
          <div className="bg-[#e4f7f1] border h-14 me-8 w-full md:p-4 p-2 mb-2 md:mt-2 shadow-lg rounded-lg flex justify-between sm:me-10 m-0">
            <input
              className="bg-[#e4f7f1] placeholder-gray-400 w-full text-sm outline-none focus:outline-none"
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ color: "black" }}
            />
            <BiSearchAlt size={30} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="w-full lg:hidden bg-gray-100  animate-fade-down animate-once animate-duration-[2000ms] overflow-hidden max-h-screen">
          <div className="bg-[#e4f7f1] border w-full p-4 shadow-lg rounded-lg">
            <div className="input p-5">
              <Input
                className="w-44"
                id="outlined-basic"
                label="Max price..."
                variant="outlined"
                type="number"
                onChange={(e) =>
                  handleFilterChange(
                    "maxPrice",
                    e.target.value ? e.target.value : Infinity
                  )
                }
              />
            </div>
            <div className="input p-5">
              <Input
                className="w-44"
                id="outlined-basic"
                label="Min price..."
                variant="outlined"
                type="number"
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
            </div>
            <div className="p-5">
              <Select
                options={chefs.map((chef) => ({ value: chef, label: chef }))}
                onChange={(e) => handleFilterChange("chef", e.value)}
                placeholder="Select a chef"
                isSearchable={false}
                styles={dropdownStyles}
              />
            </div>
            <div className="p-5">
              <Select
                options={categories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                onChange={(e) => handleFilterChange("category", e.value)}
                placeholder="Select a category"
                className=""
                isSearchable={false}
                styles={dropdownStyles}
              />
            </div>
          </div>
        </div>
      )}

      <div className=" p-4 font-serif bg-gray-100">
        <div className="text-center mt-8 mb-8">
          <h2 className="text-3xl font-bold text-black-600">ALL COURSES</h2>
        </div>

        <div className="flex justify-center  gap-4  flex-wrap mt-8">
          {currentCourses.map((course, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-80  bg-gray-200 mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-center pt-2">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </p>
              </div>
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover px-4"
                  src={course.coverImage.url}
                  alt={course.title}
                />
              </div>
              <div className="p-4 flex-grow">
                <p className="text-sm text-gray-600 h-12 overflow-hidden leading-4 mb-4">
                  {course.blurb}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-orange-600">
                    ${course.price}
                  </p>
                  {!course.users.includes(id) ? (
                    <button
                      onClick={() =>
                        usenavigate("/coursedetails", {
                          state: { id: course._id },
                        })
                      }
                      className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out"
                    >
                      Enroll now
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={() => usenavigate("/user/mylearnigs", {})}
                      className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out"
                    >
                      Watch now
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        {/* {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 px-3 py-1 rounded-md ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default AllCourse;