import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "./components/Table.jsx";
import Adduser from "./components/Adduser.jsx";
import { Toaster } from "react-hot-toast";
import Updateuser from "./components/Updateuser.jsx";
import Login from "./components/Login.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import ChangeImage from "./components/ChangeImage.jsx";
import Register from "./components/Register.jsx";

import { ClientProvider } from "./ContextApi/ClientContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/client-data", element: <Table /> },
      { path: "/add-user", element: <Adduser /> },
      { path: "/update-user/:id", element: <Updateuser /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/change-image", element: <ChangeImage /> },
      { path: "/register", element: <Register /> },
      { path: "/", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClientProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ClientProvider>
  </StrictMode>
);
