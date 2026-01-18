import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';

export const submitRevokeReason = async (
  reasonType: string,
): Promise<string> => {
 return await Http.post({
    request: ENDPOINT.MEMBER.MEMBER_REVOKE_REASON_SUBMIT(reasonType),
    authorize: true,
  });
};
