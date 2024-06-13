import { getLabExampleId, getLabExampleList } from "@/api/api";
import useSWR, { SWRConfiguration } from "swr";

const useRequest = <T>(key: string | null, callback: (name: string, data: any) => Promise<T>) => {
  const config: SWRConfiguration = {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
    errorRetryCount: 0,
  };

  return useSWR(key, callback, config);
};

export const useGetLabExampleList = () => {
  return useRequest(getLabExampleList.name, () => getLabExampleList());
};

export const useGetLabExampleId = (id: string) => {
  const key = `${getLabExampleId.name}/${id}`;
  return useRequest(key, () => getLabExampleId(id));
};
