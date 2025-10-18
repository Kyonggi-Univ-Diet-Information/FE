import { cookies } from 'next/headers';

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  static async setTokens(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    cookieStore.set(this.ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60,
    });

    cookieStore.set(this.REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  static async getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(this.ACCESS_TOKEN_KEY)?.value || null;
  }

  static async getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(this.REFRESH_TOKEN_KEY)?.value || null;
  }

  static async clearTokens() {
    const cookieStore = await cookies();
    cookieStore.delete(this.ACCESS_TOKEN_KEY);
    cookieStore.delete(this.REFRESH_TOKEN_KEY);
  }

  static async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    return !!accessToken;
  }
}
