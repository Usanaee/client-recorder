import React, { useState } from "react";
import PageHeading from "./PageHeading";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiManager from "../ManageApiCalls/apiManager";

function ChangePassword() {
  const passwordDetail = {
    oldPassword: "",
    newPassword: "",
  };
  const [password, setPassword] = useState(passwordDetail);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("oldPassword", password.oldPassword);
    formData.append("newPassword", password.newPassword);

    try {
      const response = await ApiManager.changePassword(formData);

      toast.success("Password Changed successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during password changed:", error);
      toast.error("Password changed failed.");
    }
  };

  return (
    <div className="mx-20">
      <PageHeading pageName="Change Password" tagLine="" />
      <form
        className="flex flex-col mx-auto items-center justify-center mb-20  "
        onSubmit={handleSubmit}
      >
        <div className=" w-full  bg-white p-10 rounded-md mt-8 ">
          <div className="mb-5">
            <label
              htmlFor="old-password"
              className="block mb-2  font-medium text-lg dark:text-[#05073C] "
            >
              Old Password
            </label>
            <input
              type="password"
              id="old-password"
              name="oldPassword"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="new-password"
              className="block mb-2 font-medium text-lg dark:text-[#05073C]"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#EB662B] hover:bg-[#d15a28] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
