'use server';

import { AuthService } from '@/model/common/auth';

export async function fetchIsAuthenticated() {
  try {
    const isAuthenticated = await AuthService.isAuthenticated();

    return {
      isAuthenticated,
    };
  } catch (error) {
    console.error('Check auth error:', error);
    return {
      isAuthenticated: false,
    };
  }
}
