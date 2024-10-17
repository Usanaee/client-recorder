import { createContext, useContext, useState, useEffect } from "react";
import ApiManager from "../ManageApiCalls/apiManager";
import toast from "react-hot-toast";

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
        // Ensure response.data is an array before setting state
        if (Array.isArray(response.data)) {
          setClients(response.data);
        } else {
          setClients([]); // Fallback to empty array if response is not valid
        }
      } catch (error) {
        console.log("Error during fetching data", error);
      } finally {
        setLoading(false); // Move to finally to ensure it runs regardless of success/error
      }
    };
    fetchData();
  }, []);


  // Filter clients based on search query
  const filteredClients = clients.filter((client) => {
    return (
      client &&
      client.businessType &&
      client.businessType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


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
      value={{ clients, setClients, filteredClients, setSearchQuery, loading, deleteClient }}
    >
      {children}
    </ClientContext.Provider>
  );
};
