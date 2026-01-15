import { NextResponse, type NextRequest } from 'next/server';

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
