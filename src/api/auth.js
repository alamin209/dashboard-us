import api from "./index";

export const login = async (email, password) => {
  try {
    const response = await api().post("/admins/login", { email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserfromToken = async () => {
  try {
    const response = await api().post("/admins/get-logged-admin");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
