import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../pages/auth/auth.slice";
import taskReducer from "../pages/task/task.slice";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      task: taskReducer,
    },
  });
};

const store = makeStore();

export default store;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
