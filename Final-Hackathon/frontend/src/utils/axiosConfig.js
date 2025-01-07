import axios from "axios";

const token = localStorage.getItem("token");
const baseURL = "https://social-media-3zd0.onrender.com/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const newToken = localStorage.getItem("token");
    if (newToken) {
      config.headers["Authorization"] = `Bearer ${newToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized, please log in again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
