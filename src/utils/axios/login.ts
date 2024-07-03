import { envConfig } from "@/constant/env";
import axios, { AxiosError, AxiosResponse } from "axios";
const axiosPublicInstance = axios.create({
  baseURL: envConfig.apiUrl,
});
axiosPublicInstance?.interceptors.request.use(
  async (config) => {
    const newConfig = config;
    delete config.headers.Authorization;
    return newConfig;
  },
  (error) => {
    console.log(error);
  }
);
axiosPublicInstance?.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || "Something went wrong");
  }
);

export * from "axios";

export default axiosPublicInstance;
