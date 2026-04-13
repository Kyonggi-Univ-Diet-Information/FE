import * as AppleAuthentication from 'expo-apple-authentication';

/**
 * expo-apple-authentication으로 Apple 로그인 후 백엔드에서 JWT를 발급받습니다.
 * Apple의 authorizationCode는 웹 OAuth 플로우와 동일하게 사용됩니다.
 */
export async function performAppleLogin(): Promise<{ token: string }> {
  const result = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!result.authorizationCode) {
    throw new Error('Apple로부터 인증 코드를 받지 못했습니다.');
  }

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/apple-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: result.authorizationCode,
      ...(result.user && {
        user: {
          name: result.fullName
            ? {
                firstName: result.fullName.givenName ?? undefined,
                lastName: result.fullName.familyName ?? undefined,
              }
            : undefined,
          email: result.email ?? undefined,
        },
      }),
    }),
  });

  if (!response.ok) {
    throw new Error('Apple 로그인에 실패했습니다.');
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error('서버에서 토큰을 받지 못했습니다.');
  }

  return { token: data.token };
}
