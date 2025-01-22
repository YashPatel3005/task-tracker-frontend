export const API_ROUTES = {
  SIGNUP: "/user/signup",
  SIGNIN: "/user/login",
  LOG_OUT: "user/logout",
  ADD_TASK: "/tasks/add-task",
  GET_ALL_TASKS: "/tasks/get-tasks",
  DELETE_TASK: "/tasks/delete-task",
  EDIT_TASK: "/tasks/update-task",
  GET_TASK_DETAILS: "/tasks/get-task-details",
};

export const LOCAL_STORAGE_KEY = {
  USER_SESSION: "UserSession",
};

export const TASK_PRIORITY = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export const TASK_STATUS = {
  0: "Pending",
  1: "Completed",
};
