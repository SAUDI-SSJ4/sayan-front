// src/services/axiosInstance.jsx
import axios from "axios";

const instance = axios.create({
  baseURL: "https://sayan.nour-projects.com/website", // base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc2F5YW4udGVzdC9hY2FkZW15L2xvZ2luIiwiaWF0IjoxNzIxMTgyMjAxLCJleHAiOjUzMjIzOTQzMjEsIm5iZiI6MTcyMTE4MjIwMSwianRpIjoiWU5rNDk0ak5VbHhMYmdOeiIsInN1YiI6IjYxIiwicHJ2IjoiOGUwNjY2ODE2NTMwOWFjMTBkODZkNzJiZDgzYjYyMjUzYWZlNDM1OSJ9.BRiMyoYWOEiTbmhrqGXVml9U-TYrsX5WaAcMljCoIGw",
  },
});

// GET request
export const get = async (url, params) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`GET request to ${url} failed:`, error);
    throw error;
  }
};

// POST request
export const post = async (url, data) => {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`POST request to ${url} failed:`, error);
    throw error;
  }
};

export default instance;
