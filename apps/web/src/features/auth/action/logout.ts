'use server';

import { AuthService } from '@/shared/lib/auth';

export async function logout() {
  try {
    await AuthService.clearTokens();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: '로그아웃에 실패했습니다.' };
  }
}
