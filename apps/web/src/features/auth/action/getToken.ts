'use server';

import { AuthService } from '@/shared/lib/auth';

export async function getToken() {
  try {
    const token = await AuthService.getAccessToken();
    return token;
  } catch (error) {
    console.error('Could not get token:', error);
    return null;
  }
}
