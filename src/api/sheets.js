import api from "./index";

export const allSheets = async (options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/sheets?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteSheet = async (id = null, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().delete(`/sheets${id && `/${id}`}?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
