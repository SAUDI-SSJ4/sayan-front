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


export const getCourse = async () => {
  const { data } = await academy_client.get("/courses/all");
  return data;
};

export const getCourseById = async (id) => {
  const { data } = await academy_client.get(`/courses/${id}`);
  return data;
};

export const getCourseSummary = async (id) => {
  const { data } = await academy_client.get(`/courses/summary/${id}`);
  return data;
};

export const postLessonTools = async (lessonId, formData) => {
  const { data: res } = await academy_client.post(`/lessons/tools/store/${lessonId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      console.log(`${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: Infinity,
  });
  return res;
}



export const postUploadLessonVideo = async (lessonId, formData) => {
  const { data: res } = await academy_client.post(`/lessons/video/${lessonId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      console.log(`${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: Infinity,
  });
  return res;
}


export const postLessonExam = async (lessonId, params) => {
  const { data: res } = await academy_client.post(`/lessons/exam/${lessonId}`, params);
  return res;
}

export const createCourseAPI = async (data) => {
  const { data: res } = await academy_client.post("/courses/store", data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      console.log(`${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 120000,
  });
  return res;
};


export const postChapter = async (params) => {
  const { data } = await academy_client.post("/chapters", params);
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


export const postAcademySettings = async (id, formData) => {
  const { data } = await academy_client.post(`/template/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAcademySettings = async () => {
  const { data } = await academy_client.get("/template");
  return data;
};


export const getAllAcademySettings = async (id) => {
  const { data } = await academy_client.get(`/all-settings/${id}`);
  return data;
};


export const postSlider = async (id, formData) => {
  const { data } = await academy_client.post(`/slider/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getSlider = async () => {
  const { data } = await academy_client.get("/slider");
  return data;
};

export const postAbout = async (id, formData) => {
  const { data } = await academy_client.post(`/about/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAbout = async () => {
  const { data } = await academy_client.get("/about");
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
  const { data } = await academy_client.post("/opinions", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const editAcademyOpinions = async (id, formData) => {
  const { data } = await academy_client.put(`/opinions/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data;
};

export const getAcademyOpinions = async () => {
  const { data } = await academy_client.get("/opinions");
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
  let url = !id ? '/all-settings' : `/all-settings/${id}`
  const { data } = await academy_client.get(url);
  return data;
};
