import { toast } from "react-toastify";

export const delayedAction = ({
  startLoader = () => {},
  onSucces = () => {},
  setToast = "Toast",
  showToast = true,
}) => {
  startLoader();
  setTimeout(() => {
    onSucces();
    if (showToast) toast(setToast);
  }, 2000);
};

export const removeDoubleQuotes = (string) => {
  return string.replace(/"/g, "");
};

export class LocalStorage {
  static setItem(key, value) {
    return localStorage.setItem(key, value);
  }
  static getItem(key) {
    return localStorage.getItem(key);
  }
  static removeItem(key) {
    return localStorage.removeItem(key);
  }
  static clear() {
    return localStorage.clear();
  }
}
