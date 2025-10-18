import axios from 'axios';
import {
  DelRequestParams,
  GetRequestParams,
  Http,
  PostRequestParams,
} from './http';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const clientApi = axios.create({
  baseURL: BACKEND_API_URL || 'https://api.kiryong.kr/api',
});

const get = <TResponse, TParams = unknown>(config: GetRequestParams<TParams>) =>
  Http.get<TResponse, TParams>(config, clientApi);

const post = <TData, TResponse = unknown>(config: PostRequestParams<TData>) =>
  Http.post<TData, TResponse>(config, clientApi);

const del = <TResponse, TData = unknown>(config: DelRequestParams<TData>) =>
  Http.del<TResponse, TData>(config, clientApi);

export const apiClient = {
  get,
  post,
  delete: del,
};

export const clientFetcher = <TResponse>(url: string) =>
  clientApi.get<TResponse>(url).then(res => res.data);
