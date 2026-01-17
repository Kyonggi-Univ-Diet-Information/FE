import { NextRequest, NextResponse } from 'next/server';

/**
 * Apple OAuth 콜백 처리
 * Apple은 POST 메소드로 form data를 전송하므로,
 * 이를 받아서 GET 요청으로 변환하여 /auth 페이지로 리다이렉트
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const code = formData.get('code') as string;
    const state = formData.get('state') as string | null;
    const user = formData.get('user') as string | null;

    // URL 파라미터 생성
    const params = new URLSearchParams();
    if (code) params.append('code', code);
    if (state) params.append('state', state);
    if (user) params.append('user', user);

    const redirectUrl = `/auth?${params.toString()}`;
    return NextResponse.redirect(new URL(redirectUrl, request.url), {
      status: 303,
    });
  } catch (error) {
    console.error('Apple OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/auth?error=apple_callback_failed', request.url),
      { status: 303 },
    );
  }
}
