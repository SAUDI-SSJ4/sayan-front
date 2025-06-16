import axios from "axios";
import { user_token, academy_client } from "../client.config";
import Cookies from "js-cookie";

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
    timeout: 900000,
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
        Authorization: `Bearer ${Cookies.get("academy_token")}`,
      },
    }
  );
  return data;
};

export const postLessonTools = async (lessonId, formData) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.post(
    `${baseUrl}/api/v1/academies/lessons/${lessonId}/tools`,
    formData,
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
      timeout: Infinity,
    }
  );
  return data;
};

export const editLessonTools = async (lessonId, toolId, formData) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.post(
    `${baseUrl}/api/v1/academies/lessons/${lessonId}/tools/${toolId}`,
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

export const deleteLessonTools = async (lessonId, toolId) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.delete(
    `${baseUrl}/api/v1/academies/lessons/${lessonId}/tools/${toolId}`,
    {
      headers: {
        Authorization: `Bearer ${user_token()}`,
      },
    }
  );
  return data;
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

export const createCourseAPI = async (data, onUploadProgress = null) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const token = Cookies.get("academy_token");
  console.log('Creating course with academy token:', token);
  console.log('Current user token:', user_token());
  
  // التأكد من وجود توكن الأكاديمية
  if (!token) {
    throw new Error('Academy token is required. Please login to your academy account.');
  }
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: Infinity,
  };

  // إضافة دالة تتبع التقدم إذا تم تمريرها
  if (onUploadProgress && typeof onUploadProgress === 'function') {
    config.onUploadProgress = onUploadProgress;
  }
  
  const { data: res } = await axios.post(
    `${baseUrl}/api/v1/academies/courses`,
    data,
    config
  );
  return res;
};

export const updateCourseAPI = async (courseId, data, onUploadProgress = null) => {
  const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("academy_token")}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: Infinity,
  };

  // إضافة دالة تتبع التقدم إذا تم تمريرها
  if (onUploadProgress && typeof onUploadProgress === 'function') {
    config.onUploadProgress = onUploadProgress;
  }
  
  const { data: res } = await axios.post(
    `${baseUrl}/api/v1/academies/courses/${courseId}`,
    data,
    config
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

export const postChapter = async (courseId, formData) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.post(
    `${baseURL}/api/v1/academies/courses/${courseId}/chapters`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("academy_token")}`,
      },
    }
  );
  return data;
};

export const editChapter = async ({ chapterId, courseId }, formData) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.post(
    `${baseURL}/api/v1/academies/courses/${courseId}/chapters/${chapterId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("academy_token")}`,
      },
    }
  );
  return data;
};

export const deleteChapter = async ({ courseId, chapterId }) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.delete(
    `${baseURL}/api/v1/academies/courses/${courseId}/chapters/${chapterId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("academy_token")}`,
      },
    }
  );
  return data;
};

export const getChapterById = async (id) => {
  const { data } = await academy_client.get(`/chapters/${id}`);
  return data;
};

export const createLesson = async ({ courseId, chapterId }, formData, onProgress = null) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  
  // تحديد إعدادات مختلفة للفيديوهات الكبيرة
  const hasVideo = formData.has('video');
  const videoFile = hasVideo ? formData.get('video') : null;
  const isLargeVideo = videoFile && videoFile.size > 50 * 1024 * 1024; // أكبر من 50MB
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("academy_token")}`,
    },
  };
  
  // إضافة تتبع التقدم إذا تم تمرير دالة callback
  if (onProgress && hasVideo) {
    config.onUploadProgress = onProgress;
  }
  
  // إعدادات خاصة للفيديوهات الكبيرة
  if (isLargeVideo) {
    config.timeout = 900000; // 10 دقائق
    config.maxContentLength = Infinity;
    config.maxBodyLength = Infinity;
    
    // إذا لم يكن هناك callback مخصص، استخدم الافتراضي
    if (!onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${percentCompleted}%`);
      };
    }
  } else {
    config.timeout = 900000; // دقيقتان للملفات العادية
  }
  
  const { data } = await axios.post(
    `${baseURL}/api/v1/academies/courses/${courseId}/chapters/${chapterId}/lessons`,
    formData,
    config
  );
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
        Authorization: `Bearer ${Cookies.get("academy_token")}`,
      },
    }
  );
  return data;
};

/**
 * جلب بيانات اختبار محدد
 * @param {string} lessonId - معرف الدرس
 * @param {string} examId - معرف الاختبار
 * @returns {Promise} - بيانات الاختبار
 */
export const getExamById = async (lessonId, examId) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.get(
    `${baseURL}/api/v1/academies/lessons/${lessonId}/exams/${examId}`,
    {
      headers: {
        Authorization: `Bearer ${user_token()}`,
        Accept: "application/json",
      },
    }
  );
  return data;
};

export const editLesson = async (
  { courseId, chapterId, lessonId },
  formData,
  onProgress = null
) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  
  // تحديد إعدادات مختلفة للفيديوهات الكبيرة
  const hasVideo = formData.has('video');
  const videoFile = hasVideo ? formData.get('video') : null;
  const isLargeVideo = videoFile && videoFile.size > 50 * 1024 * 1024; // أكبر من 50MB
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("academy_token")}`,
    },
  };
  
  // إضافة تتبع التقدم إذا تم تمرير دالة callback
  if (onProgress && hasVideo) {
    config.onUploadProgress = onProgress;
  }
  
  // إعدادات خاصة للفيديوهات الكبيرة
  if (isLargeVideo) {
    config.timeout = 900000; // 10 دقائق
    config.maxContentLength = Infinity;
    config.maxBodyLength = Infinity;
    
    // إذا لم يكن هناك callback مخصص، استخدم الافتراضي
    if (!onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${percentCompleted}%`);
      };
    }
  } else {
    config.timeout = 900000; // دقيقتان للملفات العادية
  }
  
  const { data } = await axios.post(
    `${baseURL}/api/v1/academies/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
    formData,
    config
  );
  return data;
};

export const deleteLesson = async ({ courseId, chapterId, lessonId }) => {
  const baseURL = new URL(import.meta.env.VITE_SERVER_DEV).origin;
  const { data } = await axios.delete(
    `${baseURL}/api/v1/academies/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("academy_token")}`,
      },
    }
  );
  return data;
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
          Authorization: `Bearer ${Cookies.get("academy_token")}`,
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
      error: error.response?.data || "حدث خطأ أثناء نشر المادة",
    };
  }
};
