import { axiosInstance } from "../../config/axios-interceptor";
import { API_ROUTES } from "../../utils/constants";

export const signUp = async (payload) => {
  const res = await axiosInstance({
    method: "post",
    url: API_ROUTES.SIGNUP,
    data: payload,
  });
  return res.data;
};

export const signIn = async (payload) => {
  const res = await axiosInstance({
    method: "post",
    url: API_ROUTES.SIGNIN,
    data: payload,
  });
  return res.data;
};
