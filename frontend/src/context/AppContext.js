import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [equipments, setEquipments] = useState([]);
  const [maintenances, setMaintenances] = useState([]);

  const token = "Bearer abc123";

  useEffect(() => {
    fetchEquipments();
    fetchMaintenances();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await api.get("/equipment/all", {
        headers: { Authorization: token },
      });
      setEquipments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaintenances = async () => {
    try {
      const response = await api.get("/maintenance/all", {
        headers: { Authorization: token },
      });
      setMaintenances(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        equipments,
        maintenances,
        fetchEquipments,
        fetchMaintenances,
        token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
