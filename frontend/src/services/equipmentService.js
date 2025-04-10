import api from "./api";

export const getEquipments = (token) => {
  return api.get("/equipment/all", {
    headers: { Authorization: token },
  });
};

export const createEquipment = (equipment, token) => {
  return api.post("/equipment/create", equipment, {
    headers: { Authorization: token },
  });
};

export const updateEquipment = (id, equipment, token) => {
  return api.put(`/equipment/update/${id}`, equipment, {
    headers: { Authorization: token },
  });
};

export const deleteEquipment = (id, token) => {
  return api.delete(`/equipment/delete/${id}`, {
    headers: { Authorization: token },
  });
};
