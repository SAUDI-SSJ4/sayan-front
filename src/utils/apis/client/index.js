import axios from "axios";
import client from "./client";

// Login API
export const postLoginAPI = async (data) => {
  const SERVER_URL =
    import.meta.env.VITE_APP_ENV === "pro"
      ? import.meta.env.VITE_SERVER_PRO
      : import.meta.env.VITE_SERVER_DEV;
  return await axios.post(`${SERVER_URL}/login`, data);
};

// Client APIs
export const postProfile = (data) =>
  client.post("profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAuthProfile = async () => {
  const { data: response } = await client.get("/profile");
  return response.data;
};

export const postToggle = (data) => client.post("/toggle", data);

export const getHome = async () => {
  const { data: response } = await client.get("/home");
  return response;
};

export const getPackages = () => client.get("/packages");

export const getBlogs = async () => {
  const { data: response } = await client.get("/blogs");
  return response;
};

export const getFAQ = () => client.get("/faq");

export const getCategories = () => client.get("/categories");

export const getCourses = () => client.get("/courses");

export const getCourseById = async (id) => {
  const { data } = await client.get(`/course/${id}`);
  return data;
};

export const postBuy = (data) => client.post("/buy", data);

export const getPayments = async () => {
  const { data } = await client.get("/payments");
  return data.data;
};

export const getStudentHome = async () => {
  const res = await client.get("/student/home");
  return res.data;
};

export const getStudentCourses = async () => {
  const { data: res } = await client.get("/mycourses");
  return res.data;
};

export const getStudentProducts = async () => {
  const { data: res } = await client.get("/myproducts");
  return res.data;
};

export const getStudentFavourites = async () => {
  const { data: res } = await client.get("/favourites");
  return res.data;
};

export const getStudentWallet = async () => {
  const { data: res } = await client.get("/wallet");
  return res;
};

// Academy APIs
export const getAuthAcademyProfile = async () => {
  const { data } = await client.get("/profile-academy");
  return data;
};

export const getProfile = async () => {
  const { data } = await client.get("/profile");
  return data;
};
