'use server';

import { cookies } from 'next/headers';

import { Http } from '@/shared/api/http';
import { COOKIE_KEYS, ENDPOINT } from '@/shared/config';

interface LoginResponse {
  token: string;
  email: string;
}

export async function handleKakaoLogin(code: string) {
  try {
    const response = await Http.get<LoginResponse, { code: string }>({
      request: ENDPOINT.AUTH.KAKAO_LOGIN,
      params: { code },
    });

    if (response.token) {
      const cookieStore = await cookies();

      cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60,
      });

      cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
      });

      return { success: true };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Kakao login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
