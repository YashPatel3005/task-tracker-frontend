import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../components/common/model/common.model";
import { logout, signIn, signUp } from "./auth.api";
import Toast from "../../components/common/Toast";
import { LocalStorage } from "../../utils/helpers";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";

const initialState = {
  isUserLoggedIn: STATUS.IDLE,
  loading: false,
  isLoggedIn: false,
  isLogOutLoading: false,
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

export const logoutAsyncHandler = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await logout();
    return response;
  } catch (err) {
    const errorMessage = err;
    Toast({
      message: errorMessage?.response?.data?.message,
      type: "error",
    });
    throw err;
  }
});

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
        state.loading = true;
      })
      .addCase(signUpAsyncHandler.rejected, (state) => {
        state.isUserLoggedIn = STATUS.REJECTED;
        state.loading = false;
      })
      .addCase(signUpAsyncHandler.fulfilled, (state, action) => {
        state.isUserLoggedIn = STATUS.FULFILLED;
        state.loading = false;

        state.isLoggedIn = true;
        const { data: loggedInUserInfo } = action.payload;

        LocalStorage.setItem(
          LOCAL_STORAGE_KEY.USER_SESSION,
          JSON.stringify(loggedInUserInfo)
        );

        LocalStorage.setItem("token", loggedInUserInfo.token);
        state.isUserLoggedIn = true;
      })
      .addCase(signInAsyncHandler.pending, (state) => {
        state.loading = true;
        state.isUserLoggedIn = STATUS.PENDING;
      })
      .addCase(signInAsyncHandler.rejected, (state) => {
        state.isUserLoggedIn = STATUS.REJECTED;
        state.loading = false;
      })
      .addCase(signInAsyncHandler.fulfilled, (state, action) => {
        state.isUserLoggedIn = STATUS.FULFILLED;
        state.isLoggedIn = true;
        state.loading = false;
        const { data } = action.payload;

        LocalStorage.setItem(
          LOCAL_STORAGE_KEY.USER_SESSION,
          JSON.stringify(data)
        );
        LocalStorage.setItem("token", data.token);

        state.isUserLoggedIn = true;
      })
      .addCase(logoutAsyncHandler.pending, (state) => {
        state.isUserLoggedOut = STATUS.PENDING;
        state.isLogOutLoading = true;
      })
      .addCase(logoutAsyncHandler.rejected, (state) => {
        state.isUserLoggedOut = STATUS.REJECTED;
        state.isLogOutLoading = false;
      })
      .addCase(logoutAsyncHandler.fulfilled, (state, action) => {
        state.isUserLoggedOut = STATUS.FULFILLED;
        state.isLogOutLoading = false;

        LocalStorage.removeItem("UserSession");
        LocalStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;
export const authState = (state) => state;
export const authAction = authSlice.actions;
