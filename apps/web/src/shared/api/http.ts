import { AuthService } from '@/lib/services';
import { ENDPOINT, PUBLIC_API_URL } from '@/shared/config/endpoint';
import { redirect } from 'next/navigation';

export interface RequestBase {
  request: keyof typeof ENDPOINT;
  headers?: Record<string, string>;
  authorize?: boolean;
}

export interface GetRequestParams<TParams> extends RequestBase {
  params?: TParams;
  cache?: RequestCache;
}

export interface PostRequestParams<TData> extends RequestBase {
  data?: TData;
}

export interface DelRequestParams<TData> extends RequestBase {
  data?: TData;
}

interface HttpOptions {
  errorMessage?: string;
}

export class Http {
  private static async buildHeaders(
    headers?: Record<string, string>,
    authorize?: boolean,
  ): Promise<HeadersInit> {
    const finalHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (authorize) {
      const accessToken = await AuthService.getAccessToken();
      if (!accessToken) {
        if (typeof window !== 'undefined') {
          alert('로그인이 필요해요!');
          window.location.href = '/auth/login';
        } else {
          redirect('/auth/login');
        }
        throw new Error('로그인이 필요합니다.');
      }
      finalHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return finalHeaders;
  }

  private static async request<T>(
    url: string | URL,
    init: RequestInit,
    options: HttpOptions,
  ): Promise<T> {
    const res = await fetch(url, { ...init, credentials: 'include' });

    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      await AuthService.clearTokens();
      redirect('/auth/login');
    }

    if (!res.ok) {
      throw new Error(
        data.message ||
          options.errorMessage ||
          `요청에 실패했습니다 (status: ${res.status})`,
      );
    }

    return data as T;
  }

  static async get<TResponse, TParams = unknown>(
    config: GetRequestParams<TParams>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, headers, params, cache = 'default', authorize } = config;
    const url = new URL(request, PUBLIC_API_URL);
    if (params)
      Object.entries(params).forEach(([k, v]) =>
        v != null ? url.searchParams.append(k, String(v)) : null,
      );

    const finalHeaders = await this.buildHeaders(headers, authorize);
    return this.request<TResponse>(
      url,
      { method: 'GET', headers: finalHeaders, cache },
      options,
    );
  }

  static async post<TData, TResponse = unknown>(
    config: PostRequestParams<TData>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers, authorize } = config;
    const finalHeaders = await this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      new URL(request, PUBLIC_API_URL),
      {
        method: 'POST',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
    );
  }

  static async del<TResponse, TData = unknown>(
    config: DelRequestParams<TData>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers, authorize } = config;
    const finalHeaders = await this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      new URL(request, PUBLIC_API_URL),
      {
        method: 'DELETE',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
    );
  }
}
