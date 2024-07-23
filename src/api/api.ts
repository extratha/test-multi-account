import axios from "axios";

import { ENV } from "@/constant";
import {
  ChangePasswordRequest,
  ConsentResult,
  ConsentResultLatest,
  ExampleDataResult,
  InterpretResult,
  SubmitLabInterpretsRequest,
  SubmitLabInterpretsResult,
} from "@/types/model.api";
import { appendHeaders, onRefreshToken } from "./interceptors";

export const apiAxios = axios.create({ baseURL: ENV.BASE_API_URL });

apiAxios.interceptors.request.use(appendHeaders);
apiAxios.interceptors.response.use((response) => response, onRefreshToken);

export const submitChangePassword = (data: ChangePasswordRequest) => {
  return apiAxios.post("/auth/change-password", data);
};

export const getLabExampleList = () => {
  return apiAxios.get<ExampleDataResult[]>("/lab/examples");
};

export const getLabExampleId = (id: string) => {
  return apiAxios.get<InterpretResult>(`/lab/examples/${id}`);
};

export const submitLabInterprets = (data: SubmitLabInterpretsRequest) => {
  return apiAxios.post<SubmitLabInterpretsResult>("/lab/interprets", data);
};

export const getLabInterpretsByTransactionId = (transactionId: string) => {
  return apiAxios.get<InterpretResult>(`/lab/interprets/${transactionId}`);
};

export const getTermsAndConditions = () => {
  return apiAxios.get<ConsentResult>("/consents/terms-conditions");
};

export const getTermsAndConditionsLatest = () => {
  return apiAxios.get<ConsentResultLatest>("/consents/terms-conditions/latest");
};

export const submitConsent = (type: string, version: string) => {
  return apiAxios.post<ConsentResult>("/consents", { type, version });
};

export const getPrivacyPolicy = () => {
  return apiAxios.get<ConsentResult>("/consents/privacy-policies");
};

export const getPrivacyPolicyLatest = () => {
  return apiAxios.get<ConsentResult>("/consents/privacy-policies/latest");
};
