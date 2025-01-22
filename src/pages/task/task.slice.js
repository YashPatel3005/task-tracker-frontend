import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTaskDetails,
} from "./task.api";
import Toast from "../../components/common/Toast";
import { STATUS } from "../../components/common/model/common.model";

const initialState = {
  isTaskCreate: STATUS.IDLE,
  isTaskFetch: STATUS.IDLE,
  isTaskDetailsFetch: STATUS.IDLE,
  isFetching: false,
  isCreatedLoading: false,
  isDeleted: false,
  isUpdated: false,
  isTaskDetailsFetching: false,
  tasks: [],
  taskDetailData: {},
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
  async ({ search, page, limit, sortBy } = {}) => {
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

export const getTaskDetailsAsyncHandler = createAsyncThunk(
  "tasks/get-task-details",
  async ({ id } = {}) => {
    try {
      const response = await getTaskDetails({ id });
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

export const deleteTaskAsyncHandler = createAsyncThunk(
  "tasks/delete-task",
  async ({ id }) => {
    try {
      const response = await deleteTask({ id });
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
export const editTaskAsyncHandler = createAsyncThunk(
  "tasks/update-task",
  async ({ id, payload }) => {
    try {
      const response = await editTask({ id, payload });
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
        state.isCreatedLoading = true;
      })
      .addCase(addTaskAsyncHandler.rejected, (state) => {
        state.isTaskCreate = STATUS.REJECTED;
        state.isCreatedLoading = false;
      })
      .addCase(addTaskAsyncHandler.fulfilled, (state, action) => {
        state.isTaskCreate = STATUS.FULFILLED;
        state.isCreatedLoading = false;

        Toast({ message: action.payload.message, type: "success" });
      })
      .addCase(getAllTasksAsyncHandler.pending, (state) => {
        state.isTaskFetch = STATUS.PENDING;
        state.isFetching = true;
      })
      .addCase(getAllTasksAsyncHandler.rejected, (state) => {
        state.isTaskFetch = STATUS.REJECTED;
        state.isFetching = false;
      })
      .addCase(getAllTasksAsyncHandler.fulfilled, (state, action) => {
        state.isTaskFetch = STATUS.FULFILLED;
        state.isFetching = false;
        state.tasks = action.payload.data;
      })
      .addCase(getTaskDetailsAsyncHandler.pending, (state) => {
        state.isTaskDetailsFetch = STATUS.PENDING;
        state.isTaskDetailsFetching = true;
      })
      .addCase(getTaskDetailsAsyncHandler.rejected, (state) => {
        state.isTaskDetailsFetch = STATUS.REJECTED;
        state.isTaskDetailsFetching = false;
      })
      .addCase(getTaskDetailsAsyncHandler.fulfilled, (state, action) => {
        state.isTaskDetailsFetch = STATUS.FULFILLED;
        state.isTaskDetailsFetching = false;
        state.taskDetailData = action.payload.data;
      })
      .addCase(deleteTaskAsyncHandler.pending, (state) => {
        state.isTaskDelete = STATUS.PENDING;
      })
      .addCase(deleteTaskAsyncHandler.rejected, (state) => {
        state.isTaskDelete = STATUS.REJECTED;
      })
      .addCase(deleteTaskAsyncHandler.fulfilled, (state, action) => {
        state.isTaskDelete = STATUS.FULFILLED;
        state.isDeleted = true;

        Toast({ message: action.payload.message, type: "success" });
      })
      .addCase(editTaskAsyncHandler.pending, (state) => {
        state.isTaskUpdate = STATUS.PENDING;
      })
      .addCase(editTaskAsyncHandler.rejected, (state) => {
        state.isTaskUpdate = STATUS.REJECTED;
      })
      .addCase(editTaskAsyncHandler.fulfilled, (state, action) => {
        state.isTaskUpdate = STATUS.FULFILLED;
        state.isUpdated = true;

        Toast({ message: action.payload.message, type: "success" });
      });
  },
});

export default taskSlice.reducer;
export const taskState = (state) => state;
export const taskAction = taskSlice.actions;
