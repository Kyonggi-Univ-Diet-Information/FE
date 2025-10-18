'use server';

import { AuthService } from '@/shared/lib/auth';
import { apiServer } from '@/shared/axios/server.config';
import { ENDPOINT } from '@/shared/config/endpoint';

interface LoginResponse {
  token: string;
  email: string;
}

export async function handleKakaoLogin(code: string) {
  try {
    const response = await apiServer.get<LoginResponse, { code: string }>({
      request: ENDPOINT.KAKAO_LOGIN,
      params: { code },
    });

    if (response.data?.token) {
      await AuthService.setTokens(response.data.token, response.data.token);
      return { success: true };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Kakao login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
