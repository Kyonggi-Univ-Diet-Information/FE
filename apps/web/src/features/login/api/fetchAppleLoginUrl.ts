import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';

interface AppleLoginUrlResponse {
  url: string;
}

interface AppleLoginUrlParams {
  loginState?: string;
}

export const fetchAppleLoginUrl = async (
  params?: AppleLoginUrlParams,
): Promise<AppleLoginUrlResponse> => {
  const response = await Http.get<AppleLoginUrlResponse, AppleLoginUrlParams>({
    request: ENDPOINT.AUTH.APPLE_LOGIN_URL,
    params,
  });
  return response;
};
