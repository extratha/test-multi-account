import {
  ConsentResult,
  ExampleDataResult,
  InterpretResult,
  SubmitLabInterpretsRequest,
  SubmitLabInterpretsResult,
} from "@/types/model.api";
import axiosInstance from "@/utils/axios";

export const apiAxios = axiosInstance;

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

export const submitConsent = (type: string, version: string) => {
  return apiAxios.post<ConsentResult>("/consents", { type, version });
};
