




import axios from "axios";
import Cookies from "js-cookie";

const selectCurrentUrl = () => {
  let SERVER_URL;
  if (import.meta.env.VITE_APP_ENV === "pro") {
    SERVER_URL = import.meta.env.VITE_SERVER_ACADEMY_PRO;
  } else {
    SERVER_URL = import.meta.env.VITE_SERVER_ACADEMY_DEV;
  }
  return SERVER_URL;
};

 const academyInstance = axios.create({
  baseURL: selectCurrentUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  },
});

const token = Cookies.get("academy_token");

academyInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default academyInstance;