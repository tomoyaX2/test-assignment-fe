import axios from "axios";

export const appendTokenToHeaders = (token: string) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
