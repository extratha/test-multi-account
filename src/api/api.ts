import { ExampleDataResult, InterpretResult } from "@/types/aiInterpret";
import axiosInstance from "@/utils/axios";

export const apiAxios = axiosInstance;

export const getLabExampleList = () => {
  return apiAxios.get<ExampleDataResult[]>("/lab/examples");
};

export const getLabExampleId = (id: string) => {
  return apiAxios.get<InterpretResult>(`/lab/examples/${id}`);
};
