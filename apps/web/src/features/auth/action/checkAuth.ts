'use server';

import { AuthService } from '@/lib/services';

export async function checkAuth() {
  try {
    const isAuthenticated = await AuthService.isAuthenticated();
    const accessToken = await AuthService.getAccessToken();

    return {
      isAuthenticated,
      hasToken: !!accessToken,
    };
  } catch (error) {
    console.error('Check auth error:', error);
    return {
      isAuthenticated: false,
      hasToken: false,
    };
  }
}
