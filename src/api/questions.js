import api from "./index";

export const allQuestions = async (options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/security-questions?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getQuestion = async (id) => {
  try {
    const response = await api().get(`/security-questions/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addQuestion = async (data) => {
  try {
    const response = await api().post("/security-questions", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const response = await api().put(`/security-questions/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuestion = async (id, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().delete(
      `/security-questions${id && `/${id}`}?${queries}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const exportQuestions = async (id, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(
      `/security-questions/data/export?${queries}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
