import axios from "axios";

export const API_BASE_URI = "http://localhost:8000";

export const jwtToken = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: API_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
