import { toast } from "react-toastify";

const Toast = ({ message, ...options }) => {
  return toast(message, options);
};

export default Toast;
