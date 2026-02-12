import type { ParsedURL } from 'expo-linking';

export const BASE_URL = 'https://kiryong-app.vercel.app';

const QUERY_PARAM = '__webUrl';

/**
 * path만 있을 때(예: +native-intent) 웹 URL 생성.
 * path는 "entry", "entry/foo", "entry?foo=bar" 형태.
 */
export function buildWebUrlFromPath(path: string): string {
  const normalized = path.replace(/^\//, '');
  return normalized ? `${BASE_URL}/${normalized}` : BASE_URL;
}

/**
 * Linking.parse() 결과로 웹 URL 생성.
 * kiryong://entry 같은 경우 path가 비고 hostname에 올 수 있음.
 */
export function buildWebUrl(parsedUrl: ParsedURL): string {
  const pathSegment = [parsedUrl.hostname, parsedUrl.path]
    .filter(Boolean)
    .join('/')
    .replace(/^\/+|\/+$/g, '');
  const pathPart = pathSegment ? `/${pathSegment}` : '';
  const queryPart =
    parsedUrl.queryParams && Object.keys(parsedUrl.queryParams).length > 0
      ? `?${new URLSearchParams(parsedUrl.queryParams as Record<string, string>).toString()}`
      : '';
  return `${BASE_URL}${pathPart}${queryPart}`;
}

/** 라우트 쿼리에서 웹 URL 전달 시 사용하는 키 (native-intent → index) */
export const WEB_URL_PARAM_KEY = QUERY_PARAM;
