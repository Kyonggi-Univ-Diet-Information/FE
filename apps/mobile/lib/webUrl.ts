import type { ParsedURL } from 'expo-linking';

export const BASE_URL = 'https://kiryong-app.vercel.app';

const QUERY_PARAM = '__webUrl';

export function isValidWebViewUrl(webUrl: string): boolean {
  if (!webUrl || typeof webUrl !== 'string') return false;
  try {
    const u = new URL(webUrl);
    return (
      u.protocol === 'https:' &&
      (u.hostname === 'kiryong-app.vercel.app' ||
        u.hostname.endsWith('.vercel.app'))
    );
  } catch {
    return false;
  }
}

// native intent 페이지에서 path가 있을 경우 넘어옴.
export function buildWebUrlFromPath(path: string): string {
  const normalized = path.replace(/^\//, '');
  return normalized ? `${BASE_URL}/${normalized}` : BASE_URL;
}

export function buildWebUrl(parsedUrl: ParsedURL): string {
  const baseUrl = BASE_URL;

  let url = `${baseUrl}`;
  if (parsedUrl.path && parsedUrl.path !== undefined) {
    url += `/${parsedUrl.path || ''}`;
  }
  if (parsedUrl.queryParams) {
    url += `?${new URLSearchParams(parsedUrl.queryParams as Record<string, string>).toString()}`;
  }

  return url;
}

export const WEB_URL_PARAM_KEY = QUERY_PARAM;

export function isExpoDevClientUrl(webUrl: string): boolean {
  return webUrl.includes('expo-development-client');
}
