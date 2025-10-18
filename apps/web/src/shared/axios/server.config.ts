import axios from 'axios';
import { AuthService } from '../lib/auth';
import {
  DelRequestParams,
  GetRequestParams,
  Http,
  PostRequestParams,
} from './http';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const serverApi = axios.create({
  baseURL: BACKEND_API_URL,
});

serverApi.interceptors.request.use(async config => {
  const accessToken = await AuthService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

serverApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AuthService.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(`${BACKEND_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        await AuthService.setTokens(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return serverApi(originalRequest);
      } catch (refreshError) {
        await AuthService.clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const get = <TResponse, TParams = unknown>(config: GetRequestParams<TParams>) =>
  Http.get<TResponse, TParams>(config, serverApi);

const post = <TData, TResponse = unknown>(config: PostRequestParams<TData>) =>
  Http.post<TData, TResponse>(config, serverApi);

const del = <TResponse, TData = unknown>(config: DelRequestParams<TData>) =>
  Http.del<TResponse, TData>(config, serverApi);

export const apiServer = {
  get,
  post,
  delete: del,
};
