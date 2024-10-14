import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "./Loader"; // Ensure Loader component is imported
import ApiManager from "../ManageApiCalls/apiManager";
import PageHeading from "./PageHeading";
import { useClients } from "../ContextApi/ClientContext";

function Table({}) {
  const { clients, loading, setClients, filteredClients,deleteClient } = useClients();
  

  

  return (
    <div className="relative overflow-x-auto sm:rounded-lg ml-10 px-10 mt-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#05073C] dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Business
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="5" className="text-center py-4">
                <Loader /> {/* Display loader while loading */}
              </td>
            </tr>
          </tbody>
        ) : filteredClients.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="5" className="text-center py-4">
                <h2 className="text-gray-300 text-3xl">No Clients Found.</h2>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {filteredClients.map((client, index) => (
              <tr
                className="bg-white border-b "
                key={client._id} // Use unique key for list items
              >
                <td className="px-6 py-4 text-[#05073C] font-bold">
                  {index + 1}
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-20 h-20 rounded-full object-cover bg-cover"
                    src={client.avatar}
                    alt="Client avatar"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold text-[#05073C]">
                      {client.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {client.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 text-gray-600 ">
                  {client.businessType}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-600 ">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        client.status === "Running"
                          ? `bg-green-500`
                          : `bg-red-500`
                      } me-2`}
                    ></div>{" "}
                    {client.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 items-center">
                    <div className="cursor-pointer flex items-center justify-center text-[#05073C] rounded-full hover:bg-[#05073C] w-8 h-8 hover:text-white duration-200 text-xl">
                      <Link to={`/update-user/${client._id}`}>
                        <TiPencil />
                      </Link>
                    </div>
                    <div
                      onClick={() => deleteClient(client._id)}
                      className="cursor-pointer flex items-center justify-center text-[#05073C] rounded-full hover:bg-[#05073C] w-8 h-8 hover:text-white duration-200 text-md"
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Table;

