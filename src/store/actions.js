import {
  DESELECT_ADMIN,
  DESELECT_All_ADMINS,
  DESELECT_All_QUESTIONS,
  DESELECT_All_SHEETS,
  DESELECT_All_USERS,
  DESELECT_QUESTION,
  DESELECT_SHEET,
  DESELECT_USER,

  // Admins Actions
  SAVE_ADMINS_DATA,
  SAVE_DASHBOARD_DATA,
  SAVE_LOGGED_ADMIN_DATA,

  // Questions Actions
  SAVE_QUESTIONS_DATA,

  // Sheets Actions
  SAVE_SHEETS_DATA,

  // Users Actions
  SAVE_USERS_DATA,
  SELECT_ADMIN,
  SELECT_All_ADMINS,
  SELECT_All_QUESTIONS,
  SELECT_All_SHEETS,
  SELECT_All_USERS,
  SELECT_QUESTION,
  SELECT_SHEET,
  SELECT_USER,
  UPDATE_ADMINS_FILTERS,
  UPDATE_SHEETS_FILTERS,
  UPDATE_USERS_FILTERS,

  //Category action
  SAVE_CATEGORY_DATA,
  SELECT_CATEGORY,
  DESELECT_CATEGORY,
  SELECT_All_CATEGORIES,
  DESELECT_All_CATEGORIES,
  UPDATE_CATEGORIES_FILTERS,
} from "./types";

// Data Actions
export const saveDashboardData = (dashboardData) => ({
  type: SAVE_DASHBOARD_DATA,
  payload: dashboardData,
});

export const saveLoggedAdminData = (adminData) => ({
  type: SAVE_LOGGED_ADMIN_DATA,
  payload: adminData,
});

// Admins Actions
export const saveAdminsData = (adminsData) => ({
  type: SAVE_ADMINS_DATA,
  payload: adminsData,
});


export const selectAdmin = (adminId) => ({
  type: SELECT_ADMIN,
  payload: adminId,
});

export const deselectAdmin = (adminId) => ({
  type: DESELECT_ADMIN,
  payload: adminId,
});

export const selectAllAdmins = () => ({
  type: SELECT_All_ADMINS,
});

export const deselectAllAdmins = () => ({
  type: DESELECT_All_ADMINS,
});

export const updateAdminsFilters = (filters) => ({
  type: UPDATE_ADMINS_FILTERS,
  payload: filters,
});


// Users Actions
export const saveUsersData = (usersData) => ({
  type: SAVE_USERS_DATA,
  payload: usersData,
});

export const selectUser = (userId) => ({
  type: SELECT_USER,
  payload: userId,
});

export const deselectUser = (userId) => ({
  type: DESELECT_USER,
  payload: userId,
});

export const selectAllUsers = () => ({
  type: SELECT_All_USERS,
});

export const deselectAllUsers = () => ({
  type: DESELECT_All_USERS,
});

export const updateUsersFilters = (filters) => ({
  type: UPDATE_USERS_FILTERS,
  payload: filters,
});

// Questions Actions
export const saveQuestionsData = (usersData) => ({
  type: SAVE_QUESTIONS_DATA,
  payload: usersData,
});

export const selectQuestion = (userId) => ({
  type: SELECT_QUESTION,
  payload: userId,
});

export const deselectQuestion = (userId) => ({
  type: DESELECT_QUESTION,
  payload: userId,
});

export const selectAllQuestions = () => ({
  type: SELECT_All_QUESTIONS,
});

export const deselectAllQuestions = () => ({
  type: DESELECT_All_QUESTIONS,
});

// Sheets Actions
export const saveSheetsData = (usersData) => ({
  type: SAVE_SHEETS_DATA,
  payload: usersData,
});

export const selectSheet = (userId) => ({
  type: SELECT_SHEET,
  payload: userId,
});

export const deselectSheet = (userId) => ({
  type: DESELECT_SHEET,
  payload: userId,
});

export const selectAllSheets = () => ({
  type: SELECT_All_SHEETS,
});

export const deselectAllSheets = () => ({
  type: DESELECT_All_SHEETS,
});

export const updateSheetsFilters = (filters) => ({
  type: UPDATE_SHEETS_FILTERS,
  payload: filters,
});

//category
export const saveCategoryData = (categoryData) => ({
  type: SAVE_CATEGORY_DATA,
  payload: categoryData,
});

export const selectCategory = (categoryId) => ({
  type: SELECT_CATEGORY,
  payload: categoryId,
});

export const deselectCategory = (categoryId) => ({
  type: DESELECT_CATEGORY,
  payload: categoryId,
});

export const selectAllCategories = () => ({
  type: SELECT_All_CATEGORIES,
});

export const deselectAllCategories = () => ({
  type: DESELECT_All_CATEGORIES,
});

export const updateCategoriesFilters = (filters) => ({
  type: UPDATE_CATEGORIES_FILTERS,
  payload: filters,
});
