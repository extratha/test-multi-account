import axios from "axios";

import { ENV } from "@/constant";
import { ForgotPasswordRequest, LoginRequest, LoginResult, SetNewPasswordRequest } from "@/types/model.api";

export const apiUnauthorizedAxios = axios.create({ baseURL: ENV.BASE_API_URL });

export const submitLogin = (data: LoginRequest) => {
  return apiUnauthorizedAxios.post<LoginResult>("/auth/login", data);
};

export const submitForgotPassword = (data: ForgotPasswordRequest) => {
  return apiUnauthorizedAxios.post("/auth/forgot-password", data);
};

export const submitSetNewPassword = (data: SetNewPasswordRequest) => {
  return apiUnauthorizedAxios.post("/auth/reset-password", data);
};

export const getValidateResetPasswordToken = (token: string) => {
  return apiUnauthorizedAxios.get(`/auth/reset-password/validate-token?token=${token}`);
};

export const getPublicConsent = (consentType: string) => {
  return apiUnauthorizedAxios.get(`/consents/${consentType}/public`);
};
