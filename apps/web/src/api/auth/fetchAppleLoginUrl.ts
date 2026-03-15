import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

interface AppleLoginUrlResponse {
  url: string;
}

export const fetchAppleLoginUrl = async (): Promise<AppleLoginUrlResponse> => {
  const response = await Http.get<AppleLoginUrlResponse>({
    request: ENDPOINT.AUTH.APPLE_LOGIN_URL,
  });
  return response;
};
