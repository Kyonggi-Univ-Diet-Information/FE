import axios from 'axios';
import { AuthService } from '../services';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const serverApi = axios.create({
  baseURL: BACKEND_API_URL,
});

serverApi.interceptors.request.use(async config => {
  const accessToken = AuthService.getAccessToken();

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
        const refreshToken = AuthService.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(`${BACKEND_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        AuthService.setTokens(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return serverApi(originalRequest);
      } catch (refreshError) {
        AuthService.clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default serverApi;
