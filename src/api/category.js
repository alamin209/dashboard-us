import api from "api";

export const allCategory = async (options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/category?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addCategory = async (data) => {
  try {
    const response = await api().post("/category", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCategory = async (id) => {
  try {
    const response = await api().get(`/category/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
