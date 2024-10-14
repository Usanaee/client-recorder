import { createContext, useContext, useState, useEffect } from "react";
import ApiManager from "../ManageApiCalls/apiManager";

// Create the context
const ClientContext = createContext();

// Custom hook to use the ClientContext
export const useClients = () => useContext(ClientContext);

// Provider component
export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiManager.getAllClients();
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error during fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Filter clients based on search query
  // const filteredClients = clients.filter((client) =>
  //   client.businessType.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const deleteClient = async (userId) => {
    try {
      const response = await ApiManager.deleteClient(userId);
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== userId)
      );
      toast.success(response.massage, {
        duration: 2000,
        position: "top-right",
      });
    } catch (error) {
      console.log("Error occurred during deletion", error);
    }
  };

  const logoutClient = async () => {
    try {
      const response = await ApiManager.logout();
      toast.success(response.massage, {
        duration: 2000,
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      console.log("Error occurred during logging out", error);
    }
  };

  return (
    <ClientContext.Provider
      value={{ clients, setClients, filteredClients, setSearchQuery, loading,deleteClient }}
    >
      {children}
    </ClientContext.Provider>
  );
};
