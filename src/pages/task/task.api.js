import { axiosInstance } from "../../config/axios-interceptor";
import { API_ROUTES } from "../../utils/constants";

export const addTask = async (payload) => {
  const res = await axiosInstance({
    method: "post",
    url: API_ROUTES.ADD_TASK,
    data: payload,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const getAllTasks = async ({ search, page, limit, sortBy }) => {
  const params = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = page;
  }
  if (limit) {
    params.limit = limit;
  }
  if (sortBy) {
    params.sortBy = sortBy;
  }

  const res = await axiosInstance({
    method: "get",
    url: API_ROUTES.GET_ALL_TASKS,
    params: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const deleteTask = async ({ id }) => {
  const res = await axiosInstance({
    method: "delete",
    url: `${API_ROUTES.DELETE_TASK}/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const editTask = async ({ id, payload }) => {
  const res = await axiosInstance({
    method: "patch",
    url: `${API_ROUTES.EDIT_TASK}/${id}`,
    data: payload,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const getTaskDetails = async ({ id }) => {
  const res = await axiosInstance({
    method: "get",
    url: `${API_ROUTES.GET_TASK_DETAILS}/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
