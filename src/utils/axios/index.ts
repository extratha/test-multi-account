import { envConfig } from "@/constant/env";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie, setCookie } from "cookies-next";

const axiosInstance = axios.create({ baseURL: envConfig.apiUrl });

let isRefreshing = false;
let failedQueue: Array<{ config: AxiosRequestConfig; resolve: (value?: any) => void; reject: (reason?: any) => void }> =
  [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    else return Promise.reject(new Error("Cannot get access token"));
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { response } = error;
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      response?.status === 401 &&
      (response?.data as Record<string, any>)?.message === "Invalid token" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ config: originalRequest, resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) return Promise.reject(new Error("No refresh token available"));

      try {
        const { data } = await axiosInstance.post(`/auth/refresh-token`, { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

        setCookie("accessToken", newAccessToken);
        setCookie("refreshToken", newRefreshToken);

        axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(response?.data || "Something went wrong");
  }
);

export * from "axios";
export default axiosInstance;
