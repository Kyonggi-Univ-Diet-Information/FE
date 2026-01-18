import { Http } from "@/shared/api/http";
import { ENDPOINT } from "@/shared/config";

import { UserProvider } from "./fetchUserProvider";

interface RevokeResult {
  success: boolean;
  error?: string;
}

export const submitUserRevoke = async (provider: UserProvider): Promise<RevokeResult> => {
  try {
    switch (provider) {
      case 'KAKAO':
        await Http.post({
          request: ENDPOINT.AUTH.KAKAO_REVOKE,
          authorize: true,
        });
        return { success: true };
      case 'GOOGLE':
        await Http.del({
          request: ENDPOINT.AUTH.GOOGLE_REVOKE,
          authorize: true,
        });
        return { success: true };
      case 'APPLE':
        await Http.post({
          request: ENDPOINT.AUTH.APPLE_REVOKE,
          authorize: true,
        });
        return { success: true };
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '회원 탈퇴 처리에 실패했습니다.' 
    };
  }
};