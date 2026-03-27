import {
  SubmitGoogleLoginRequest,
  SubmitGoogleLoginResponse,
} from './api.model';
import type { LoginResponse } from './api.type';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export async function submitGoogleLogin(
  code: string,
): Promise<SubmitGoogleLoginResponse> {
  try {
    const response = await Http.post<SubmitGoogleLoginRequest, LoginResponse>({
      request: ENDPOINT.AUTH.GOOGLE_LOGIN,
      data: { code },
    });

    if (response.token) {
      return {
        success: true,
        accessToken: response.token,
      };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Google login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
