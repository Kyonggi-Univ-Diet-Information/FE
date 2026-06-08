import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export type UserProvider = 'KAKAO' | 'GOOGLE' | 'APPLE';

export const fetchUserProvider = async (): Promise<UserProvider> => {
  const data = await Http.get<UserProvider>({
    request: ENDPOINT.MEMBER.MEMBER_PROVIDER,
    authorize: true,
    cache: 'force-cache',
  });
  return data;
};
