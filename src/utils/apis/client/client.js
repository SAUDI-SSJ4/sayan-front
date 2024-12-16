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

export default website_client;
