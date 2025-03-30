import api from "./api";

export const getMaintenances = (token) => {
  return api.get("/maintenance", {
    headers: { Authorization: token },
  });
};

export const getMaintenanceById = (id, token) => {
  return api.get(`/maintenance/${id}`, {
    headers: { Authorization: token },
  });
};

export const createMaintenance = (maintenance, token) => {
  return api.post("/maintenance", maintenance, {
    headers: { Authorization: token },
  });
};

export const updateMaintenance = (id, maintenance, token) => {
  return api.put(`/maintenance/${id}`, maintenance, {
    headers: { Authorization: token },
  });
};

export const deleteMaintenance = (id, token) => {
  return api.delete(`/maintenance/${id}`, {
    headers: { Authorization: token },
  });
};
