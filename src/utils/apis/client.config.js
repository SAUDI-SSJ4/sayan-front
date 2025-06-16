import axios from "axios";
import Cookies from "js-cookie";

const APP_MODE = import.meta.env.VITE_APP_MODE ?? "development";

const getApiUrl = (envVarDev, envVarPro) =>
  APP_MODE === "development"
    ? import.meta.env[envVarDev]
    : import.meta.env[envVarPro];

const config = {
  academy: getApiUrl("VITE_SERVER_ACADEMY_DEV", "VITE_SERVER_ACADEMY_PRO"),
  website: getApiUrl("VITE_SERVER_DEV", "VITE_SERVER_PRO"),
  mode: APP_MODE,
};

const API_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
};

export const academy_client = axios.create({
  baseURL: config.academy,
  headers: API_HEADERS,
});

// إضافة معترض للتوثيق
academy_client.interceptors.request.use((config) => {
  // إضافة التوثيق
  const token = user_token();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // التحقق مما إذا كانت البيانات من نوع FormData، وتعيين نوع المحتوى المناسب
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  
  console.log('Academy client request config:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    hasToken: !!token
  });
  
  return config;
});

export const website_client = axios.create({
  baseURL: config.website,
  headers: API_HEADERS,
});

// إضافة معترض للتعامل مع طلبات رفع الملفات تلقائيًا للموقع
website_client.interceptors.request.use((config) => {
  // التحقق مما إذا كانت البيانات من نوع FormData، وتعيين نوع المحتوى المناسب
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export const user_token = () => {
  const loginType = Cookies.get("login_type");

  if (loginType === "academy") {
    return Cookies.get("academy_token");
  }

  if (loginType === "student") {
    return Cookies.get("student_token");
  }

  return "";
};

export default config;
