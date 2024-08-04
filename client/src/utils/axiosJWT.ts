import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { clearUser } from "@/redux/UserSlice";
import store from "@/redux/Store";
import { getItem, removeItem } from "./localStorageUtil";
import showToast from "./toaster";
export const axiosJWT = axios.create();

export const logout = () => {
  showToast("Session expired please login");
  store.dispatch(clearUser());
  removeItem("access_token");
};

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = new Date();
  let decodedToken;
  let accessToken = getItem("access_token") as string;
  if (!accessToken) {
    logout();
    return config;
  }
  try {
    decodedToken = await jwtDecode(accessToken);
  } catch (error) {
    console.log("error in decodeToken" + error);
  }

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    logout();
  }
  config.headers["Authorization"] = "Bearer " + accessToken;

  return config;
});

export default axiosJWT;
