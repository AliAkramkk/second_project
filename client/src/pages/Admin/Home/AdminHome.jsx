import React from "react";
import AdminNavbar from "../../../component/Navbar/AdminNavbar";
import { auth, selectCurrentToken } from "../../../context/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../User/Footer/Footer";
import AdminTable from "../../../component/AdminHomeCard/AdminTable";
function AdminHome() {
  const user = useSelector(auth);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  const handleCategory = async () => {
    navigate("/admin/category");
  };
  console.log("user:", user);
  console.log("token:", token);
  return (
    <>
      <div className=" bg-gray-100 ">
        <AdminNavbar />
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4 p-3">
          Hello {user.user}
          <br />
          <span className="text-2xl text-lime-600  ">
            {" "}
            Welcome To Let's Cook !
          </span>
          <br />
          <span className="text-2xl text-black  ">
            {" "}
            Congratulation, You Have Some Good News
          </span>
        </h1>
        <div>
          <button onClick={handleCategory}>Category</button>
        </div>
        <AdminTable />
        <Footer />
      </div>
    </>
  );
}

export default AdminHome;
