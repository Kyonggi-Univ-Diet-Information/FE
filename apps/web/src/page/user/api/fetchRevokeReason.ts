import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';

interface RevokeReasonResponse {
    result: {type: string, description: string}[];
  }

export const fetchRevokeReason = async (): Promise<RevokeReasonResponse> => {
  const data = await Http.getDirect<RevokeReasonResponse>({
    request: ENDPOINT.MEMBER.MEMBER_REVOKE_REASON,
    cache: 'force-cache',
  });
  return data;
};
