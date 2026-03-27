export interface LoginResponse {
  token: string;
  email: string;
}

export interface FetchAppleLoginUrlResponse {
  url: string;
}

export interface AppleUser {
  name?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
}

export interface SubmitAppleLoginRequest {
  code: string;
  state?: string | null;
  user?: AppleUser | null;
}

export interface SubmitAppleLoginResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export interface SubmitGoogleLoginRequest {
  code: string;
}

export interface SubmitGoogleLoginResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export interface SubmitKakaoLoginRequest {
  code: string;
}

export interface SubmitKakaoLoginResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export interface FetchKakaoLoginRequest {
  code: string;
}

export interface FetchKakaoLoginResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export interface SubmitRefreshRequest {
  refreshToken: string;
}

export interface SubmitRefreshResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}
