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

// إضافة معترض للاستجابات للتعامل مع أخطاء المصادقة
website_client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // لا نقوم بتسجيل الخروج التلقائي، فقط نمرر الخطأ
    // يمكن للمكونات التعامل مع الأخطاء بنفسها
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default website_client;

