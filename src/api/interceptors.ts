import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { ENV, NAVIGATION, SESSION } from "@/constant";
import { RefreshTokenRequest, RefreshTokenResult } from "@/types/model.api";
import { removeStorage, storage } from "@/utils/common";

export const apiAxiosRefreshToken = axios.create({ baseURL: ENV.BASE_API_URL });

const refreshToken = async () => {
  try {
    const accessToken = storage(SESSION.ACCESS_TOKEN);
    const requestData: RefreshTokenRequest = { refreshToken: storage(SESSION.REFRESH_TOKEN) };
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const { data } = await apiAxiosRefreshToken.post<RefreshTokenResult>("/auth/refresh-token", requestData, config);

    localStorage.setItem(SESSION.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(SESSION.REFRESH_TOKEN, data.refreshToken);
  } catch (error) {
    removeStorage(SESSION.ACCESS_TOKEN);
    removeStorage(SESSION.REFRESH_TOKEN);
    location.replace(NAVIGATION.LOGIN);
  }
};

export const onRefreshToken = async (error: AxiosError) => {
  const responseData: any = error.response?.data || {};
  const errorCode = responseData.code || "";
  const isInvalidToken = errorCode === "unauthorized";

  if (isInvalidToken && error.config) {
    await refreshToken();
    error.config = await appendHeaders(error.config);

    return axios(error.config);
  }

  throw error;
};

export const appendHeaders = async (request: InternalAxiosRequestConfig) => {
  const accessToken = storage(SESSION.ACCESS_TOKEN);

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
};
