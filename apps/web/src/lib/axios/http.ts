import { AxiosInstance, AxiosResponse, isAxiosError } from 'axios';

export interface PostRequestParams<TData> {
  request: string;
  headers?: { [key: string]: string };
  data?: TData;
}

export interface GetRequestParams<TParams> {
  request: string;
  headers?: { [key: string]: string };
  params?: TParams;
}

export interface DelRequestParams<TData> {
  request: string;
  headers?: { [key: string]: string };
  data?: TData;
}

export class Http {
  static async get<TResponse, TParams = unknown>(
    config: GetRequestParams<TParams>,
    instance: AxiosInstance,
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
      if (isAxiosError(error)) throw new Error(error.response?.data.message);
      else throw new Error('에러가 발생했습니다');
    }
  }

  static async post<TData, TResponse = unknown>(
    config: PostRequestParams<TData>,
    instance: AxiosInstance,
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
      if (isAxiosError(error)) throw new Error(error.response?.data.message);
      else throw new Error('에러가 발생했습니다');
    }
  }

  static async del<TResponse, TData = unknown>(
    config: DelRequestParams<TData>,
    instance: AxiosInstance,
  ): Promise<AxiosResponse<TResponse>> {
    const { request, data, headers } = config;
    try {
      const response = await instance.delete<TResponse>(request, {
        withCredentials: true,
        data: data,
        headers: headers || undefined,
      });
      return response;
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error)) throw new Error(error.response?.data.message);
      else throw new Error('에러가 발생했습니다');
    }
  }
}
