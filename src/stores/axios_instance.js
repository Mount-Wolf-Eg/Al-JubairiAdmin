import axios from "axios";
import { useAuthStore } from "./auth/auth";

const axiosInstance = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "multipart/form-data;",
    "Accept-Language": "ar",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return Promise.reject("error");
      }

      // if (error.response && error.response.status === 401) {
      //   useAuthStore().logOut();
      // }
      // if (error.response && error.response.status === 422) {
      //   useAuthStore().removeData();
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
