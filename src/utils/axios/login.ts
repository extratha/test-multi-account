// import { NEXT_PUBLIC_BASE_API_URL } from '@/libs/env';
// import { getEnvVariables } from '@/libs/env';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {  getCookie } from 'cookies-next';
import { staticEnvConfig } from '@/constant/env';
const axiosForLoginPage = axios.create({
  baseURL: staticEnvConfig.apiUrl,
  headers:{
    Authorization: `Bearer ${getCookie("accessToken")}`
  }
})
axiosForLoginPage.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('accessToken');
    const newConfig = config;
    try {
      if (accessToken) {
        newConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (err) {
      return Promise.reject(new Error('Can not get access token'));
    }
    return newConfig;
  },
  (error) => { 
    console.log(error)
  },
);
axiosForLoginPage.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      return Promise.reject(error.response?.data  || 'Something went wrong');
    },
  );

export * from 'axios';

export default axiosForLoginPage;
