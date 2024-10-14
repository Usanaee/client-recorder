import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [open, setOpen] = useState(true);
  const [selectTab, setselectedTab] = useState("");

  const toggle = () => {
    setOpen(!open);
  };
  const tabSelction = (tab) => {
    setselectedTab(tab);
  };

  const location = useLocation();

  // List of paths where the sidebar and navbar should not be visible
  const noSidebarNavbarPaths = ["/", "/register"];

  const isAuthPage = noSidebarNavbarPaths.includes(location.pathname);

  return (
    <div>
      {!isAuthPage && (
        <>
          <Sidebar
            toggle={toggle}
            open={open}
            selectTab={selectTab}
            tabSelction={tabSelction}
          />
          <div className=" sticky top-0 z-10 mt-0 ">
            <Navbar toggle={toggle} open={open} />
          </div>
        </>
      )}
      <div className={!isAuthPage ? "max-sm:pl-12 pl-64 max-md:pl-24" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
