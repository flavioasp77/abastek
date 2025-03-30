import api from "./api";

export const getMaintenanceReport = (token) => {
  return api.get("/maintenances/report", {
    headers: { Authorization: token },
  });
};
