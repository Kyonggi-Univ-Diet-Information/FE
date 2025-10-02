import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

interface PostRequestParams<TData> {
  request: string;
  headers?: { [key: string]: string };
  data?: TData;
}

interface GetRequestParams<TParams> {
  request: string;
  headers?: { [key: string]: string };
  params?: TParams;
}

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const clientApi = axios.create({
  baseURL: BACKEND_API_URL,
});

async function get<TResponse, TParams = unknown>(
  config: GetRequestParams<TParams>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, params } = config;
  try {
    const response = await clientApi.get<TResponse>(request, {
      withCredentials: true,
      params: params,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error('에러가 발생했습니다');
  }
}

async function post<TData, TResponse = unknown>(
  config: PostRequestParams<TData>,
): Promise<AxiosResponse<TResponse>> {
  const { request, data, headers } = config;
  try {
    const response = await clientApi.post<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      withCredentials: true,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error('에러가 발생했습니다');
  }
}

async function del<S extends AxiosRequestConfig = AxiosRequestConfig>(
  request: string,
  config?: S,
) {
  try {
    const response = await clientApi.delete(`${request}`, config);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const apiClient = {
  get,
  post,
  delete: del,
};
