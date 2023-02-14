import api from "./index";

export const allAdmins = async (options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/admins?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAdmin = async (id) => {
  try {
    const response = await api().get(`/admins/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAdminByToken = async () => {
  try {
    const response = await api().post(`/admins/get-logged-admin`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addAdmin = async (data) => {
  try {
    const response = await api().post("/admins", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateAdmin = async (id, data) => {
  try {
    const response = await api().put(`/admins/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteAdmin = async (id = null, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().delete(`/admins${id && `/${id}`}?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const exportAdmins = async (id, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/admins/data/export?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
