import { Http } from "@/shared/api/http";
import { ENDPOINT } from "@/shared/config";

import { UserProvider } from "./fetchUserProvider";

export const submitUserRevoke = async (provider: UserProvider): Promise<string> => {
  switch (provider) {
    case 'KAKAO':
        return await Http.post({
          request: ENDPOINT.AUTH.KAKAO_REVOKE,
          authorize: true,
        });
    case 'GOOGLE':
        return await Http.del({
          request: ENDPOINT.AUTH.GOOGLE_REVOKE,
          authorize: true,
        });
    case 'APPLE':
        return await Http.post({
          request: ENDPOINT.AUTH.APPLE_REVOKE,
          authorize: true,
        });
  }
};