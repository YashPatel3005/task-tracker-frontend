import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTask, getAllTasks } from "./task.api";
import Toast from "../../components/common/Toast";
import { STATUS } from "../../components/common/model/common.model";

const initialState = {
  isTaskCreate: STATUS.IDLE,
  isTaskFetch: STATUS.IDLE,
  tasks: [],
};

export const addTaskAsyncHandler = createAsyncThunk(
  "tasks/add-task",
  async (payload) => {
    try {
      const response = await addTask(payload);
      return response;
    } catch (err) {
      const errorMessage = err;
      const errMsg = errorMessage.response.data.message;
      Toast({
        message: errMsg,
        type: "error",
      });
      throw err;
    }
  }
);

export const getAllTasksAsyncHandler = createAsyncThunk(
  "tasks/get-tasks",
  async ({ search, page, limit, sortBy }) => {
    try {
      const response = await getAllTasks({ search, page, limit, sortBy });
      return response;
    } catch (err) {
      const errorMessage = err;
      const errMsg = errorMessage.response.data.message;
      Toast({
        message: errMsg,
        type: "error",
      });
      throw err;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    task: (task) => {
      return task;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsyncHandler.pending, (state) => {
        state.isTaskCreate = STATUS.PENDING;
      })
      .addCase(addTaskAsyncHandler.rejected, (state) => {
        state.isTaskCreate = STATUS.REJECTED;
      })
      .addCase(addTaskAsyncHandler.fulfilled, (state, action) => {
        state.isTaskCreate = STATUS.FULFILLED;

        Toast({ message: action.payload.message, type: "success" });
      })
      .addCase(getAllTasksAsyncHandler.pending, (state) => {
        state.isTaskFetch = STATUS.PENDING;
      })
      .addCase(getAllTasksAsyncHandler.rejected, (state) => {
        state.isTaskFetch = STATUS.REJECTED;
      })
      .addCase(getAllTasksAsyncHandler.fulfilled, (state, action) => {
        state.isTaskFetch = STATUS.FULFILLED;
        state.tasks = action.payload.data;
      });
  },
});

export default taskSlice.reducer;
export const taskState = (state) => state;
export const taskAction = taskSlice.actions;
