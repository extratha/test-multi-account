import axiosInstance from '@/utils/axios';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from '@/utils/axios';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
export type AxiosGetRequest = AxiosRequestConfig | null;

export type AxiosReturn<Data, Error> = {
  data: Data | undefined;
  isLoading: boolean | undefined;
  response: AxiosResponse<Data> | undefined;
  error: Error | undefined;
} & Pick<
  SWRResponse<AxiosResponse<Data>, AxiosError<Error> | unknown>,
  'isValidating' | 'mutate'
>;

export type AxiosConfig<Data = unknown, Error = unknown> = SWRConfiguration<
  AxiosResponse<Data>,
  AxiosError<Error> | unknown
>;

export default function useAPIRequest<Data = unknown, Error = unknown>(
  request: AxiosGetRequest | unknown,
  config: AxiosConfig<Data, Error> = {},
  fetcher?: any,
): AxiosReturn<Data, Error> {
  const { url, ...otherRequest } = (request as Record<string, unknown>) ?? {};
  const defaultFetcher = () => axiosInstance(url as string, otherRequest ?? {});
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR(!!request && JSON.stringify(request), fetcher ?? defaultFetcher, {
    errorRetryCount: 0,
    errorRetryInterval: 0,
    loadingTimeout: axios.defaults.timeout,
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    ...config,
  });
  const arrayResponse =
    response && response.length > 0
      ? response?.map((res: { data: any }) => res.data ?? res)
      : undefined;

  return {
    data: (response?.data as Data) || (response as Data) || arrayResponse,
    error,
    isLoading: !response && !error && isValidating,
    isValidating,
    mutate,
    response,
  };
}
