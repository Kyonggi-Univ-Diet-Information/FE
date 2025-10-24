'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';
import { AuthService } from '@/shared/lib/auth';

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
      await AuthService.setTokens(response.token, response.token);
      return { success: true };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Kakao login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
