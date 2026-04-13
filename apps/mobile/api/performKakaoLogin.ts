import { login } from '@react-native-kakao/user';

/**
 * Kakao native SDK accessToken을 백엔드에 전달해 JWT를 발급받습니다.
 * POST /kakao-login-token — body: { kakaoAccessToken: string }
 */
async function submitKakaoNativeLogin(
  kakaoAccessToken: string,
): Promise<{ token: string }> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/kakao-login-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kakaoAccessToken }),
  });

  if (!response.ok) {
    throw new Error('카카오 로그인에 실패했습니다.');
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error('서버에서 토큰을 받지 못했습니다.');
  }

  return { token: data.token };
}

/**
 * Kakao native SDK로 로그인 후 백엔드에서 JWT를 발급받습니다.
 */
export async function performKakaoLogin(): Promise<{ token: string }> {
  const { accessToken } = await login();

  if (!accessToken) {
    throw new Error('카카오 액세스 토큰을 받지 못했습니다.');
  }

  return submitKakaoNativeLogin(accessToken);
}
