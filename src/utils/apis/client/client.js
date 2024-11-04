import axios from "axios";
import Cookies from "js-cookie";

const selectCurrentUrl = () => {
  let SERVER_URL;
  if (import.meta.env.VITE_APP_ENV === "pro") {
    SERVER_URL = import.meta.env.VITE_SERVER_PRO;
  } else {
    SERVER_URL = import.meta.env.VITE_SERVER_DEV;
  }
  return SERVER_URL;
};

const selectCurrentToken = () => {
  let token;
  const loginType = Cookies.get("login_type");
  if (loginType === "academy") {
    token = Cookies.get("academy_token");
  } else {
    token = Cookies.get("student_token");
  }
  return token;
};

const client = axios.create({
  baseURL: selectCurrentUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  },
});

client.interceptors.request.use(
  (config) => {

    if (selectCurrentToken()) {
      config.headers["Authorization"] = `Bearer ${selectCurrentToken()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
