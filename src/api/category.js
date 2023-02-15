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


export const exportCategories = async (id, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/category/data/export?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCategory = async (id = null, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().delete(
      `/category${id && `/${id}`}?${queries}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
