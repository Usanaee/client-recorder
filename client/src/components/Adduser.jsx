import React, { useState, useRef } from "react";
import Heading from "./Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiManager from "../ManageApiCalls/apiManager";
import PageHeading from "./PageHeading";

function Adduser() {
  const clientDetail = {
    name: "",
    email: "",
    businessType: "",
    status: "",
    avatar: null,
  };
  const [client, setClient] = useState(clientDetail);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");

  const getAvatarUrl = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a FormData object
    const formData = new FormData();

    // Append client details
    formData.append("name", client.name);
    formData.append("email", client.email);
    formData.append("status", client.status);
    formData.append("businessType", client.businessType);

    // Append the avatar file
    if (file) {
      formData.append("avatar", file);
    }
    // await axios
    //   .post("http://localhost:3000/api/v1/users/add-user", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    await ApiManager.addClient(formData)
      .then((response) => {
        toast.success(response.massage, {
          duration: 2000,
          position: "top-right",
        });
        console.log("Client Add Successfully!", response.data);
        navigate("/client-data");
        return;
      })
      .catch((error) => console.log("Client Add Failure", error));
  };

  return (
    <div className="ml-20">
      <PageHeading pageName="Add New Client" tagLine="" />
      <form
        className="flex flex-col  items-center justify-center  mb-20 mt-8 mr-20 "
        onSubmit={handleSubmit}
      >
        <div className=" w-full bg-white border border-white p-10  rounded-md">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-gray-900 text-lg dark:text-[#05073C] "
            >
              Client Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Usama Naeem"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-900 text-lg dark:text-[#05073C] "
            >
              Client email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="usama@gmail.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="image"
              className="block mb-2  text-gray-900 text-lg dark:text-[#05073C] "
            >
              Client Image
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
            {file && (
              <div className="flex items-start mt-2">
                <img
                  src={getAvatarUrl(file)}
                  alt=""
                  className="rounded-full h-32 w-32 object-cover"
                />
              </div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="business-type"
              className="block mb-2  text-gray-900 text-lg dark:text-[#05073C] "
            >
              Business Type
            </label>
            <input
              type="text"
              id="business-type"
              name="businessType"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="status"
              className="block mb-2  text-gray-900 text-lg dark:text-[#05073C] "
            >
              State Of Business
            </label>
            <select
              id="status"
              name="status"
              value={client.status}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            >
              <option value="">Select Status</option>
              <option value="Running">Running</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#EB662B] hover:bg-[#d15a28]  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Adduser;
