import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiManager from "../ManageApiCalls/apiManager";
import { Link } from "react-router-dom";

function Register() {
  const clientDetail = {
    name: "",
    email: "",
    password: "",
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
    formData.append("name", client.name);
    formData.append("email", client.email);
    formData.append("password", client.password);
    if (file) {
      formData.append("avatar", file);
    }

    try {
      const response = await ApiManager.register(formData); // Send formData instead of object
      

      toast.success("Register Successful!");
      navigate("/");
    } catch (error) {
      console.error("registeration error:", error);
      toast.error("registeration failed.");
    }
  };

  return (
    <div className="mt-10">
      <header className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-[#08083c] font-bold">Register</h1>
        <h3 className="mt-4 text-xl">Let's create your account!</h3>
        <p className=" text-sm">
          Already have an account?
          <span className="text-[#EB662B] cursor-pointer hover:text-[#1967D2] duration-200 ">
            <Link to="/">Login!</Link>
          </span>
        </p>
      </header>

      <form
        className="flex flex-col mx-auto items-center justify-center my-8  "
        onSubmit={handleSubmit}
      >
        <div className=" w-1/3 border bg-white p-10 rounded-md ">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-lg dark:text-[#05073C]"
            >
              Your Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="usama"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2  font-medium text-lg dark:text-[#05073C]"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="usama@gmail.com"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2  font-medium text-lg dark:text-[#05073C]"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
          <button
            type="submit"
            className="w-full text-white bg-[#EB662B] hover:bg-[#da5e2a] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
