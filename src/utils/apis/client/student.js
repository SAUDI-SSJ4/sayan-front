import { user_token, website_client } from "../client.config";

website_client.interceptors.request.use(
  (config) => {
    if (user_token()) {
      config.headers["Authorization"] = `Bearer ${user_token()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postRegister = async (data) => {
  return await website_client.post(`/register`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 900000,
  });
};

export const postVerify = async (data) => {
  return await website_client.post(`/verify`, data);
};

export const postLogin = async (data) => {
  return await website_client.post(`/login`, data);
};

export const getStudentProfile = async () => {
  const { data: response } = await website_client.get("/profile");
  return response.data;
};
