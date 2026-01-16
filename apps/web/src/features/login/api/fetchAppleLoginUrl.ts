import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';

interface AppleLoginUrlResponse {
  url: string;
}

export const fetchAppleLoginUrl = async (): Promise<AppleLoginUrlResponse> => {
  const response = await Http.get<AppleLoginUrlResponse>({
    request: ENDPOINT.AUTH.APPLE_LOGIN_URL,
  });
  return response;
};
