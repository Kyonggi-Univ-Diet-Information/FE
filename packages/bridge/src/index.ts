export type SocialLoginType = 'kakao' | 'apple' | 'google';

/**
 * 네이티브 소셜 로그인 결과
 * - 성공 시: 백엔드에서 발급한 JWT accessToken
 * - 실패 시: 오류 메시지
 */
export type NativeSocialLoginResult =
  | { success: true; accessToken: string }
  | { success: false; message: string };

/**
 * Web → Native 브릿지 타입 정의
 * Web에서 호출 가능한 Native 메서드 목록
 */
export type AppBridge = {
  socialLogin(type: SocialLoginType): Promise<NativeSocialLoginResult>;
};
