import { user_token, website_client } from "../client.config";

// Login API
export const postLoginAPI = async (data) => {
  return await website_client.post(`/login`, data);
};

export const forgotPasswordAPI = async (data) => {
  return await website_client.post(`/forgetpassword`, data);
};

export const resetPasswordAPI = async (data) => {
  return await website_client.post(`/reset-password`, data);
};

// Client APIs
export const postProfile = (data) =>
  website_client.post("profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAuthProfile = async () => {
  const { data: response } = await website_client.get("/profile");
  return response.data;
};

export const postToggle = (data) => website_client.post("/toggle", data);

export const getHome = async () => {
  const { data: response } = await website_client.get("/home");
  return response;
};

export const getPackages = () => website_client.get("/packages");

export const getBlogs = async () => {
  const { data: response } = await website_client.get("/blogs");
  return response;
};

export const getFAQ = () => website_client.get("/faq");

export const getCategories = () => website_client.get("/categories");

export const getCourses = () => website_client.get("/courses");

export const getCourseById = async (id) => {
  const { data } = await website_client.get(`/course/${id}`);
  return data;
};

export const postBuy = (data) => website_client.post("/buy", data);

export const getPayments = async () => {
  const { data } = await website_client.get("/payments");
  return data.data;
};

export const getStudentHome = async () => {
  const res = await website_client.get("/student/home");
  return res.data;
};

export const getStudentCourses = async () => {
  const { data: res } = await website_client.get("/mycourses");
  return res.data;
};

export const getStudentFavourites = async () => {
  const { data: res } = await website_client.get("/favourites");
  return res.data;
};

export const getStudentWallet = async () => {
  const { data: res } = await website_client.get("/wallet");
  return res;
};

// Academy APIs
export const getAuthAcademyProfile = async () => {
  const { data } = await website_client.get("/profile-academy");
  return data;
};

export const getProfile = async () => {
  const { data } = await website_client.get("/profile");
  return data;
};
