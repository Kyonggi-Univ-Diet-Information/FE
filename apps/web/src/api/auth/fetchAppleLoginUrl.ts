import { FetchAppleLoginUrlResponse } from './api.model';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export const fetchAppleLoginUrl =
  async (): Promise<FetchAppleLoginUrlResponse> => {
    const response = await Http.get<FetchAppleLoginUrlResponse>({
      request: ENDPOINT.AUTH.APPLE_LOGIN_URL,
    });
    return response;
  };
