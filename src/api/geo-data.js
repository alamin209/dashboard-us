import api from "./index";

export const getCountries = async () => {
  try {
    const response = await api().get(`/geo/countries`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCategory = async () => {
  try {
    const response = await api().get(`/category`);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getStates = async (countryId) => {
  try {
    const response = await api().get(`/geo/states/${countryId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCities = async (stateId) => {
  try {
    const response = await api().get(`/geo/cities/${stateId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
