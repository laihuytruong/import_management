import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRedirecting401 = false;

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Có lỗi xảy ra!";

    if (status === 401 && message === 'Unauthorized' && !isRedirecting401) {
      isRedirecting401 = true;

      localStorage.removeItem('token');

      const currentPath = window.location.pathname + window.location.search;

      window.location.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }


    return Promise.reject(message);
  }
);

export default api;