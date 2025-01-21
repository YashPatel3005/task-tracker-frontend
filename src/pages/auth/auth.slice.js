import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../components/common/model/common.model";
import { signIn, signUp } from "./auth.api";
import Toast from "../../components/common/Toast";
import { LocalStorage } from "../../utils/helpers";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";

const initialState = {
  isUserLoggedIn: STATUS.IDLE,
  isLoggedIn: false,
};

export const signUpAsyncHandler = createAsyncThunk(
  "auth/signup",
  async (payload) => {
    try {
      const response = await signUp(payload);
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

export const signInAsyncHandler = createAsyncThunk(
  "auth/signin",
  async (payload) => {
    try {
      const response = await signIn(payload);
      return response;
    } catch (err) {
      const errorMessage = err;
      Toast({
        message: errorMessage?.response?.data?.message,
        type: "error",
      });
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsyncHandler.pending, (state) => {
        state.isUserLoggedIn = STATUS.PENDING;
      })
      .addCase(signUpAsyncHandler.rejected, (state) => {
        state.isUserLoggedIn = STATUS.REJECTED;
      })
      .addCase(signUpAsyncHandler.fulfilled, (state, action) => {
        state.isUserLoggedIn = STATUS.FULFILLED;
        state.isLoggedIn = true;
        const { data: loggedInUserInfo } = action.payload;

        LocalStorage.setItem(
          LOCAL_STORAGE_KEY.USER_SESSION,
          JSON.stringify(loggedInUserInfo)
        );
        LocalStorage.setItem("token", loggedInUserInfo.token);
        state.isUserLoggedIn = true;
        Toast({ message: action.payload.message, type: "success" });
      })
      .addCase(signInAsyncHandler.pending, (state) => {
        state.isUserLoggedIn = STATUS.PENDING;
      })
      .addCase(signInAsyncHandler.rejected, (state) => {
        state.isUserLoggedIn = STATUS.REJECTED;
      })
      .addCase(signInAsyncHandler.fulfilled, (state, action) => {
        state.isUserLoggedIn = STATUS.FULFILLED;
        state.isLoggedIn = true;
        const { data } = action.payload;

        LocalStorage.setItem(
          LOCAL_STORAGE_KEY.USER_SESSION,
          JSON.stringify(data)
        );
        LocalStorage.setItem("token", data.token);

        state.isUserLoggedIn = true;
        Toast({ message: action.payload.message, type: "success" });
      });
  },
});

export default authSlice.reducer;
export const authState = (state) => state;
export const authAction = authSlice.actions;
