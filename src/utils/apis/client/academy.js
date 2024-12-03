import axios from "axios";
import Cookies from "js-cookie";

const selectCurrentUrl = () => {
  let SERVER_URL;
  if (import.meta.env.VITE_APP_ENV === "pro") {
    SERVER_URL = import.meta.env.VITE_SERVER_ACADEMY_PRO;
  } else {
    SERVER_URL = import.meta.env.VITE_SERVER_ACADEMY_DEV;
  }
  console.log(import.meta.env.VITE_APP_ENV);
  console.log(SERVER_URL);
  return SERVER_URL;
};

export const academyAPI = axios.create({
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

academyAPI.interceptors.request.use(
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

export const getCourse = async () => {
  const { data } = await academyAPI.get("/course");
  return data;
};

export const getCourseById = async (id) => {
  const { data } = await academyAPI.get(`/course/${id}`);
  return data;
};

export const createCourse = async (data) => {
  await academyAPI.post("/course", data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      console.log(`${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 120000,
  });
};


export const createLesson = async (data) => {
  const res = await academyAPI.post("/lesson", data, {
    headers: { "Content-Type": "multipart/form-data" },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 120000,
  });
  return res;
};

export const getAllcategories = async () => {
  const { data } = await academyAPI.get("/allcategories");
  return data.data;
};

export const getTrainer = async () => {
  const { data } = await academyAPI.get("/trainer");
  return data.data;
};

export const postAllProduct = async () => {
  const { data } = await academyAPI.get("/product");
  return data.data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await academyAPI.put(`/product/${id}`, formData);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await academyAPI.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const fetchSpasificProduct = async (id) => {
  const { data } = await academyAPI.get(`/product/${id}`);
  return data.data;
};

export const deleteProduct = async (id) => {
  const { data } = await academyAPI.delete(`/product/${id}`);
  return data;
};


export const postAcademySettings = async (id, formData) => {
  const { data } = await academyAPI.post(`/template/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAcademySettings = async () => {
  const { data } = await academyAPI.get("/template");
  return data;
};


export const getAllAcademySettings = async (id) => {
  const { data } = await academyAPI.get(`/all-settings/${id}`);
  return data;
};


export const postSlider = async (id, formData) => {
  const { data } = await academyAPI.post(`/slider/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getSlider = async () => {
  const { data } = await academyAPI.get("/slider");
  return data;
};

export const postAbout = async (id, formData) => {
  const { data } = await academyAPI.post(`/about/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAbout = async () => {
  const { data } = await academyAPI.get("/about");
  return data;
};

export const postCreateAction = async (formData) => {
  const { data } = await academyAPI.post("/calltoaction", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const postUpdateAction = async (id, formData) => {
  const { data } = await academyAPI.post(`/calltoaction/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};


export const postAcademyOpinions = async (formData) => {
  const { data } = await academyAPI.post("/opinions", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const editAcademyOpinions = async (id, formData) => {
  const { data } = await academyAPI.put(`/opinions/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAcademyOpinions = async () => {
  const { data } = await academyAPI.get("/opinions");
  return data;
};

export const DeleteAcademyOpinion = async (id) => {
  const { data } = await academyAPI.delete(`/opinions/${id}`);
  return data;
};

export const DeleteAcademyFaq = async (id) => {
  const { data } = await academyAPI.delete(`/faq/${id}`);
  return data;
};







export const getFooter = async () => {
  const { data } = await academyAPI.get("/footer");
  return data;
};

export const postUpdateFooter = async (formData) => {
  const { data } = await academyAPI.post("/footer", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};


export const updateFooter = async (id, formData) => {
  const { data } = await academyAPI.post(`/footer/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};


export const getAllSetting = async (id = null) => {
  let url = !id ? '/all-settings' : `/all-settings/${id}`
  const { data } = await academyAPI.get(url);
  return data;
};
