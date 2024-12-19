"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hackathon-lime-omega.vercel.app/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
