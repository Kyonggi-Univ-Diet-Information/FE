import {
  FetchKakaoLoginRequest,
  FetchKakaoLoginResponse,
} from './api.model';
import type { LoginResponse } from './api.type';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export async function fetchKakaoLogin(
  code: string,
): Promise<FetchKakaoLoginResponse> {
  try {
    const response = await Http.get<LoginResponse, FetchKakaoLoginRequest>({
      request: ENDPOINT.AUTH.KAKAO_LOGIN,
      params: { code },
    });

    if (response.token) {
      return {
        success: true,
        accessToken: response.token,
      };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Kakao login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
