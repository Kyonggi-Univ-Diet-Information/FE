import {
  buildWebUrlFromPath,
  isExpoDevClientUrl,
  WEB_URL_PARAM_KEY,
} from '@/lib/webUrl';

export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): string {
  if (initial && path && path.startsWith('/auth')) {
    const webUrl = buildWebUrlFromPath(path);
    if (isExpoDevClientUrl(webUrl)) return '/';
    return `/?${WEB_URL_PARAM_KEY}=${encodeURIComponent(webUrl)}`;
  }
  return '/';
}
