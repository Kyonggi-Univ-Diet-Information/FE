import { redirect } from 'next/navigation';

export interface RequestBase {
  request: string;
  headers?: Record<string, string>;
  authorize?: boolean;
}

export interface GetRequestParams<TParams> extends RequestBase {
  params?: TParams;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
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
  private static getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return '';
    }

    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    return 'http://localhost:3000';
  }

  private static buildBffUrl(
    request: string,
    params?: Record<string, unknown>,
  ): string {
    const bffPath = request.startsWith('/') ? request.slice(1) : request;
    const baseUrl = this.getBaseUrl();
    let urlString = `${baseUrl}/api/bff/${bffPath}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v != null) searchParams.append(k, String(v));
      });
      const queryString = searchParams.toString();
      if (queryString) urlString += `?${queryString}`;
    }

    return urlString;
  }

  private static buildHeaders(
    headers?: Record<string, string>,
    authorize?: boolean,
  ): HeadersInit {
    const finalHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (authorize) {
      finalHeaders['x-require-auth'] = 'true';
    }

    return finalHeaders;
  }

  private static async request<T>(
    url: string | URL,
    init: RequestInit,
    options: HttpOptions,
    authorize?: boolean,
  ): Promise<T> {
    const res = await fetch(url, { ...init, credentials: 'include' });

    const data = await res.json().catch(() => ({}));

    if (res.status === 401 && authorize) {
      const logoutUrl =
        typeof window !== 'undefined'
          ? '/api/auth/logout'
          : `${this.getBaseUrl()}/api/auth/logout`;
      await fetch(logoutUrl, { method: 'POST' }).catch(() => {});

      if (typeof window !== 'undefined') {
        alert('로그인이 필요해요!');
        window.location.href = '/auth/login';
      } else {
        redirect('/auth/login');
      }
    }

    if (!res.ok) {
      throw new Error(
        data.error ||
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
    const {
      request,
      headers,
      params,
      cache = 'default',
      next,
      authorize = false,
    } = config;

    const urlString = this.buildBffUrl(
      request,
      params as Record<string, unknown>,
    );
    const finalHeaders = this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      urlString,
      { method: 'GET', headers: finalHeaders, cache, next },
      options,
      authorize,
    );
  }

  static async post<TData, TResponse = unknown>(
    config: PostRequestParams<TData>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers, authorize = false } = config;

    const urlString = this.buildBffUrl(request);
    const finalHeaders = this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      urlString,
      {
        method: 'POST',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
      authorize,
    );
  }

  static async del<TResponse, TData = unknown>(
    config: DelRequestParams<TData>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers, authorize = false } = config;

    const urlString = this.buildBffUrl(request);
    const finalHeaders = this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      urlString,
      {
        method: 'DELETE',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
      authorize,
    );
  }
}
