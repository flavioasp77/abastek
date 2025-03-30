import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [equipments, setEquipments] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [reportData, setReportData] = useState([]);

  const token = "Bearer abc123";

  useEffect(() => {
    fetchEquipments();
    fetchMaintenances();
    // fetchReport();
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

  const fetchReport = async () => {
    try {
      const response = await api.get("/report/all", {
        headers: { Authorization: token },
      });
      console.log("Response fetchReport", response);
      setReportData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("reportData no context", reportData);

  return (
    <AppContext.Provider
      value={{
        token,
        equipments,
        maintenances,
        reportData,
        fetchEquipments,
        fetchMaintenances,
        fetchReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  console.log("AppContext value:", context);
  if (context === undefined) {
    console.error("useAppContext foi chamado fora do AppProvider!");
    //throw new Error("useAppContext must be used within an AppProvider");
    return {};
  }
  return context;
};
