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
