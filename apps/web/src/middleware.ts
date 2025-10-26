import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const { pathname } = request.nextUrl;

  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  if (pathname.match(/\.(css|js)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ko|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
