import axiosInstance from "../../axios";
import api from "../../axios";
import Cookies from "js-cookie";


export const postLoginAPI = (data) => api.post("/login", data);

export const getAuthUserAPI = () => {
  axiosInstance.get("/profile", {
    headers: {
      Authorization: `Bearer ${Cookies.get("academyToken")}`,
    },
  });
};

