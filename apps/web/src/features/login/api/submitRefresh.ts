import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';

import { LoginResponse } from '../model/login';

export async function submitRefresh(refreshToken: string) {
  try {
    const response = await Http.postDirect<
      { refreshToken: string },
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
