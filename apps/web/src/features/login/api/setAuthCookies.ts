interface SetAuthCookiesParams {
  accessToken: string;
  refreshToken: string;
}

export async function setAuthCookies({
  accessToken,
  refreshToken,
}: SetAuthCookiesParams): Promise<void> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('쿠키 저장에 실패했습니다.');
  }
}
