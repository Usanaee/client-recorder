import { AiFillHome } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaExpeditedssl } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Sidebar({ toggle, open, selectTab, tabSelction }) {
  return (
    <div
      className={`overflow-y-hidden ${
        open
          ? `transition-all duration-1000 max-md:-ml-72`
          : "transition-all duration-1000"
      } w-72 absolute z-50`}
    >
      <div className={`bg-[#05073C]  h-screen`}>
        <div className="p-10">
          <div className="flex items-center">
            <Link to="#" className="flex ml-5">
              <h2 className="text-2xl font-bold text-white">Client Recorder</h2>
            </Link>
          </div>
        </div>
        <hr />
        <div className="h-full px-6 py-16  overflow-y-auto bg-[#05073C]">
          <ul className="space-y-2">
            <li>
              <Link
                to="/client-data"
                className={`flex gap-2 duration-200 items-center justify-start p-2 rounded-lg hover:bg-gray-700 text-white ${
                  selectTab == "Table" && `bg-gray-700 `
                } group `}
                onClick={() => {
                  tabSelction("Table");
                }}
              >
                <AiFillHome fontSize="20px" />
                <span className="mt-0.5">Manage Clients</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-user"
                className={`flex gap-2 items-center duration-200 justify-start p-2 rounded-lg  hover:bg-gray-700 text-white ${
                  selectTab == "Add User" && `bg-gray-700 `
                }  group`}
                onClick={() => {
                  tabSelction("Add User");
                }}
              >
                <MdAssignmentAdd fontSize="20px" />
                <span className="mt-0.5">Add Client</span>
              </Link>
            </li>
            <li>
              <Link
                to="/change-image"
                className={`flex gap-2 duration-200 items-center justify-start p-2 rounded-lg hover:bg-gray-700 text-white ${
                  selectTab == "Change Image" && `bg-gray-700 `
                } group `}
                onClick={() => {
                  tabSelction("Change Image");
                }}
              >
                <FaUserEdit fontSize="20px" />
                <span className="mt-0.5">Change Image</span>
              </Link>
            </li>
            <li>
              <Link
                to="/change-password"
                className={`flex gap-2 duration-200 items-center justify-start p-2 rounded-lg hover:bg-gray-700 text-white ${
                  selectTab == "Change Password" && `bg-gray-700 `
                }group `}
                onClick={() => {
                  tabSelction("Change Password");
                }}
              >
                <FaExpeditedssl fontSize="20px" />
                <span className="mt-0.5">Change Password</span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className={`flex gap-2 duration-200 items-center justify-start hover:bg-gray-700 p-2 rounded-lg text-white ${
                  selectTab == "Logo out" && `bg-gray-700 `
                } group`}
                onClick={() => {
                  tabSelction("Logo out");
                }}
              >
                <IoMdLogOut fontSize="20px" />
                <span className="mt-0.5">Logo Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
