import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

interface GetRequestParams<Tparams> {
  request: string;
  headers?: { [key: string]: string | number | boolean };
  params?: Tparams;
}

interface PostRequestParams<TData> {
  request: string;
  headers?: { [key: string]: string };
  data?: TData;
}

export async function get<TResponse, TParams = unknown>(
  config: GetRequestParams<TParams>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, params } = config;
  try {
    const response = await instance.get<TResponse>(request, {
      withCredentials: true,
      params: params,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function post<TData, TResponse = unknown>(
  config: PostRequestParams<TData>,
): Promise<AxiosResponse<TResponse>> {
  const { request, data, headers } = config;
  try {
    const response = await instance.post<
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
    if (axios.isAxiosError(error))
      throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export const del = async <S = unknown>(request: string, config?: S) => {
  try {
    const response = await instance.delete(`${request}`, config);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
