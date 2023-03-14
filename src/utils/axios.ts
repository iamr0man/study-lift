import axiosOriginal from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = `${import.meta.env.API_BASE_URL}{import.meta.env.API_VERSION}`
export const axiosOptions: AxiosRequestConfig = {
  withCredentials: true,
  baseURL,
};

const axiosWithoutRequestInterceptor = axiosOriginal.create(axiosOptions);
const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

axios.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    throw new Error(error);
  },
);

const responseInterceptor = (error: any) => {
  if (error.response?.status === 401) {}

  return error.response;
};

axios.interceptors.response.use(response => response, responseInterceptor);

axiosWithoutRequestInterceptor.interceptors.response.use(
  response => response,
  responseInterceptor,
);

export { axios, axiosWithoutRequestInterceptor };
