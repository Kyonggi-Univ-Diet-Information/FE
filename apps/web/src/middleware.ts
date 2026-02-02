import { NextResponse, type NextRequest } from 'next/server';

import { submitRefresh } from '@/features/login/api/submitRefresh';

import { COOKIE_KEYS } from '@/shared/config';

function isReactNativeWebView(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const customHeader = request.headers.get('x-react-native-webview');
  return userAgent.includes('ReactNative') || customHeader === 'true';
}

function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
  return !!accessToken?.value;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes('/user')) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isReactNativeWebView(request)) {
    // 웹뷰 환경에서 기존 로그인했던 사용자의 경우 리프레시 토큰이 존재, 해당 리프레시 토큰을 바탕으로 재검증하여 토큰 갱신
    if (request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)) {
      const refreshToken = request.cookies.get(
        COOKIE_KEYS.REFRESH_TOKEN,
      )?.value;
      if (refreshToken) {
        const response = await submitRefresh(refreshToken);
        if (response.success && response.accessToken) {
          const redirectResponse = NextResponse.redirect(
            new URL('/', request.url),
          );
          redirectResponse.cookies.set(
            COOKIE_KEYS.ACCESS_TOKEN,
            response.accessToken,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 15 * 60,
            },
          );
          return redirectResponse;
        }
      }
      // 리프레시 토큰 재검증 실패 시 홈으로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 기존 로그인하지 않고 둘러보기를 택한 사용자의 경우 홈으로 리다이렉트
    if (request.cookies.get(COOKIE_KEYS.ENTRY_VISITED)?.value === 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 이외 사용자의 경우 둘러보기 페이지로 리다이렉트
    if (pathname !== '/entry') {
      return NextResponse.redirect(new URL('/entry', request.url));
    }
    return NextResponse.next();
  }

  // 유지보수 모드 활성화 시 유지보수 페이지로 리다이렉트
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

  const response = NextResponse.next();

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
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
