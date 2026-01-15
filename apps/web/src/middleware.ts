import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/i18n/routing';

const intlMiddleware = createMiddleware(routing);

function isReactNativeWebView(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const customHeader = request.headers.get('x-react-native-webview');
  return userAgent.includes('ReactNative') || customHeader === 'true';
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isReactNativeWebView(request)) {
    if (pathname !== '/entry') {
      return NextResponse.redirect(new URL('/entry', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/entry') {
    return NextResponse.next();
  }

  if (process.env.NEXT_MAINTENANCE_MODE === 'true') {
    if (pathname.startsWith('/maintenance')) {
      return NextResponse.next();
    }

    if (
      !pathname.match(
        /\.(woff|woff2|ttf|otf|eot|jpg|jpeg|png|gif|svg|webp|avif|ico|css|js)$/,
      )
    ) {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  const response = intlMiddleware(request);

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
  matcher: ['/', '/(ko|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
