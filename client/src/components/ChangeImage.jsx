import React, { useState, useRef } from "react";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiManager from "../ManageApiCalls/apiManager";
import PageHeading from "./PageHeading";

function ChangeImage() {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("avatar", file);
    await ApiManager.changeImage(formData)
      .then((response) => {
        toast.success(response.massage, {
          duration: 2000,
          position: "top-right",
        });
        console.log("Client Picture Updated Successfully!", response.data);
        navigate("/client-data");
        return;
      })
      .catch((error) => console.log("Client Picture Updated Failure", error));
  };
  return (
    <div className="mx-20">
      <PageHeading pageName="Change Client Avatar" tagLine="" />
      <form
        className="flex flex-col mx-auto items-center justify-center mb-20  "
        onSubmit={handleSubmit}
      >
        <div className=" w-full border bg-white p-10 rounded-md mt-8 ">
          <div className="mb-5">
            <label
              htmlFor="image"
              className="block mb-2  text-gray-900 text-lg dark:text-[#05073C] "
            >
              Your Image
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="w-full text-white bg-[#EB662B] hover:bg-[#d15a28] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeImage;
