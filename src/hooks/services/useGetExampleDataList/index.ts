import { API } from '@/constant/api';
import useAPIRequest, { AxiosGetRequest } from '@/hooks/services/useAPIRequest';
import { ExampleData } from '@/types/aiInterpret';
import { ExampleDataResponse } from '@/types/api/aiInterpret';
import { AxiosError } from 'axios';

export function useGetExampleDataList(
  shouldRequest: boolean,
) {
  const request: AxiosGetRequest = {
    method: API.HTTP_METHODS.GET,
    url: `${API.PATH.exampleDataList}`,
  };
  const response = useAPIRequest<ExampleData[], AxiosError>(
    shouldRequest ? request : null,
  );
  return response
}
