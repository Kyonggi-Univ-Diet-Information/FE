import {
  LoginResponse,
  SubmitRefreshRequest,
  SubmitRefreshResponse,
} from './api.model';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export async function submitRefresh(
  refreshToken: string,
): Promise<SubmitRefreshResponse> {
  try {
    const response = await Http.postDirect<
      SubmitRefreshRequest,
      LoginResponse
    >({
      request: ENDPOINT.AUTH.REFRESH,
      data: { refreshToken },
    });

    if (response.token) {
      return {
        success: true,
        accessToken: response.token,
      };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Refresh token error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
