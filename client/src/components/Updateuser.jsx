import React, { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ApiManager from "../ManageApiCalls/apiManager";

function Updateuser() {
  const clientDetail = {
    name: "",
    email: "",
    businessType: "",
    status: "",
  };
  const [client, setClient] = useState(clientDetail);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };
  useEffect(() => {
       ApiManager.updateClient(id)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => console.log("Client Data Fetch Failure", error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(client);
    await ApiManager.updateClient(id, client)
      .then((response) => {
        toast.success(response.massage, {
          duration: 2000,
          position: "top-right",
        });
        console.log("Client updated Successfully!", response.data);
        navigate("/client-data");
        return;
      })
      .catch((error) => console.log("Client Updated Failure", error));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    // <form
    //   className="flex flex-col mx-auto items-center justify-center mb-20  "
    //   onSubmit={handleSubmit}
    // >
    //   <Heading title="Add New Client" />
    //   <div className=" w-1/3 border border-white p-10 rounded-md ">
    //     <div className="mb-5">
    //       <label
    //         htmlFor="name"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your Name
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={client.name || "" }
    //         onChange={handleInputChange}
    //         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    //         placeholder="Usama Naeem"
    //         required
    //       />
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="email"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={client.email || ""}
    //         onChange={handleInputChange}
    //         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    //         placeholder="usama@gmail.com"
    //         required
    //       />
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="image"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your Image
    //       </label>
    //       <input
    //         type="file"
    //         id="image"
    //         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    //         // required
    //       />
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="password"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={client.password || ""}
    //         onChange={handleInputChange}
    //         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    //         required
    //       />
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="business-type"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Business Type
    //       </label>
    //       <input
    //         type="text"
    //         id="business-type"
    //         name="businessType"
    //         value={client.role || ""}
    //         onChange={handleInputChange}
    //         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    //         required
    //       />
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="status"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         State Of Business
    //       </label>
    //       <select
    //         id="status"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       >
    //         <option>Active</option>
    //         <option>Inactive</option>
    //       </select>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     >
    //       Add Now
    //     </button>
    //   </div>
    // </form>
    <form
      className="flex flex-col mx-auto items-start justify-center mb-20 ml-20 mr-20  "
      onSubmit={handleSubmit}
    >
      <Heading title="Update Client" />
      <div className=" w-full bg-white border border-white p-10 rounded-md ">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={client.name || ""}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Usama Naeem"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={client.email || ""}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="usama@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="business-type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Business Type
          </label>
          <input
            type="text"
            id="business-type"
            name="businessType"
            value={client.businessType || ""}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            State Of Business
          </label>
          <select
            id="status"
            name="status"
            value={client.status || ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Status</option>
            <option value="Running">Running</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-[#EB662B] hover:bg-[#d15a28] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Update Now
        </button>
      </div>
    </form>
  );
}

export default Updateuser;


  // useEffect(() => {
  //   axios
  //   .patch(`http://localhost:3000/api/v1/users/user/${id}`)
  //   .then((response) => {
  //     setClient(response.data.data);

  //     })
  //     .catch((error) => console.log("Client Data Fetch Failure", error));
  // }, [id]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(client);
  //   await axios
  //     .patch(`http://localhost:3000/api/v1/users/user/${id}`, client)
  //     .then((response) => {
  //       toast.success(response.data.massage, {
  //         duration: 2000,
  //         position: "top-right",
  //       });
  //       console.log("Client updated Successfully!", response.data);
  //       navigate("/");
  //       return;
  //     })
  //     .catch((error) => console.log("Client Updated Failure", error));
  // };