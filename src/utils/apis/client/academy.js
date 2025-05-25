import axios from "axios";
import { user_token, academy_client } from "../client.config";

academy_client.interceptors.request.use(
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
  const { data: response } = await academy_client.post("/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 600000,
  });
  return response;
};

export const getCourse = async (id) => {
  const { data } = await axios.get(
    `https://www.sayan-server.com/api/v1/courses/${id}`
  );
  return data;
};

export const getCourseById = async (id) => {
  const { data } = await academy_client.get(`/courses/${id}`);
  return data;
};

export const deleteCourseById = async (id) => {
  const { data } = await academy_client.delete(`/courses/delete/${id}`);
  return data;
};

export const getCourseSummary = async (id) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.get(
    `${baseUrl}/api/v1/academies/courses/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user_token()}`,
      },
    }
  );
  return data;
};

export const postLessonTools = async (lessonId, formData) => {
  const { data: res } = await academy_client.post(
    `/lessons/tools/store/${lessonId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        console.log(
          `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`
        );
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: Infinity,
    }
  );
  return res;
};

export const postUploadLessonVideo = async (lessonId, formData) => {
  const { data: res } = await academy_client.post(
    `/lessons/video/${lessonId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        console.log(
          `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`
        );
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: Infinity,
    }
  );
  return res;
};

export const postLessonExam = async (lessonId, params) => {
  const { data: res } = await academy_client.post(
    `/lessons/exam/${lessonId}`,
    params
  );
  return res;
};
console.log("user_token", user_token());
export const createCourseAPI = async (data) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data: res } = await axios.post(
    `${baseUrl}/api/v1/academies/courses`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user_token()}`,
      },
      onUploadProgress: (progressEvent) => {
        console.log(
          `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`
        );
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 120000,
    }
  );
  return res;
};
export const getAcademyCourses = async (id) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;

  const { data: res } = await axios.get(`${baseUrl}/api/v1/courses/${id}`);
  return res;
};

export const deleteLessonItem = async (lessonId, params) => {
  const { data } = await academy_client.delete(
    `/lessons/delete/lesson-item/${lessonId}`,
    { data: params } // Add `data` to send payload in the body for DELETE requests
  );
  return data;
};

export const postChapter = async (params) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.post(
    `${baseURL}/api/v1/academies/courses/${params?.courseId}/chapters`,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user_token()}`,
      },
    }
  );
  return data;
};
export const deleteChapter = async (params) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.delete(
    `${baseURL}/api/v1/academies/courses/${params.courseId}/chapters/${params.chapterId}`,
    {
      headers: {
        Authorization: `Bearer ${user_token()}`,
      },
    }
  );
  return data;
};

export const getChapterById = async (id) => {
  const { data } = await academy_client.get(`/chapters/${id}`);
  return data;
};

export const postLesson = async (params) => {
  const { data } = await academy_client.post("/lessons", params);
  return data;
};
export const createExam = async (lessonId, formData) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.post(
    `${baseURL}/api/v1/academies/lessons/${lessonId}/exams`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user_token()}`,
      },
    }
  );
  return data;
};

export const createLesson = async (data) => {
  const res = await academy_client.post("/lesson", data, {
    headers: { "Content-Type": "multipart/form-data" },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 120000,
  });
  return res;
};

export const getAllcategories = async () => {
  const { data } = await academy_client.get("/allcategories");
  return data.data;
};

export const getTrainer = async () => {
  const { data } = await academy_client.get("/trainer");
  return data.data;
};

export const postAllProduct = async () => {
  const { data } = await academy_client.get("/product");
  return data.data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await academy_client.put(`/product/${id}`, formData);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await academy_client.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const fetchSpasificProduct = async (id) => {
  const { data } = await academy_client.get(`/product/${id}`);
  return data.data;
};

export const deleteProduct = async (id) => {
  const { data } = await academy_client.delete(`/product/${id}`);
  return data;
};

export const postAcademySettings = async (formData) => {
  const { data } = await academy_client.post("/template", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAcademySettings = async (id) => {
  const { data } = await academy_client.get(`/template/${id}`);
  return data;
};

export const getAllAcademySettings = async (id) => {
  const { data } = await academy_client.get(`/all-settings/${id}`);
  return data;
};

export const getAcademyProfile = async (id) => {
  const { data } = await academy_client.get(`/all-settings/${id}`);
  return data;
};

export const postSlider = async (formData) => {
  const { data } = await academy_client.post(`/slider`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getSlider = async (id) => {
  const { data } = await academy_client.get(`/slider/${id}`);
  return data;
};

export const updateAbout = async (aboutData) => {
  const { data } = await academy_client.post("/about", aboutData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAbout = async (id) => {
  const { data } = await academy_client.get(`/about/${id}`);
  return data;
};

export const postCreateAction = async (formData) => {
  const { data } = await academy_client.post("/calltoaction", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const postUpdateAction = async (id, formData) => {
  const { data } = await academy_client.post(`/calltoaction/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const postAcademyOpinions = async (formData) => {
  const { data } = await academy_client.post("/opinion/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const editAcademyOpinions = async (id, formData) => {
  const { data } = await academy_client.post(`/opinion/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAcademyOpinions = async (id) => {
  const { data } = await academy_client.get(`/opinions/${id}`);
  return data;
};

export const DeleteAcademyOpinion = async (id) => {
  const { data } = await academy_client.delete(`/opinions/${id}`);
  return data;
};

export const DeleteAcademyFaq = async (id) => {
  const { data } = await academy_client.delete(`/faq/${id}`);
  return data;
};
export const getAcademyFaqs = async (id) => {
  const { data } = await academy_client.get(`/faq/${id}`);
  return data;
};

export const getFooter = async () => {
  const { data } = await academy_client.get("/footer");
  return data;
};

export const postUpdateFooter = async (formData) => {
  const { data } = await academy_client.post("/footer", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const updateFooter = async (id, formData) => {
  const { data } = await academy_client.post(`/footer/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAllSetting = async (id = null) => {
  let url = !id ? "/all-settings" : `/all-settings/${id}`;
  const { data } = await academy_client.get(url);
  return data;
};

export const publishCourseDraft = async (courseId) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;

  try {
    const response = await axios(
      `${baseUrl}/api/v1/academies/courses/${courseId}/publish-draft`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user_token()}`,
        },
      }
    );
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      error: error.response?.data || "حدث خطأ أثناء نشر الدورة",
    };
  }
};
